import { expect, test } from '@playwright/test';


function submissionCard(page: import('@playwright/test').Page, submissionId: string) {
  return page.locator(`[data-testid="submission-card"][data-submission-id="${submissionId}"]`);
}

function reviewQueueItem(page: import('@playwright/test').Page, submissionId: string) {
  return page.locator(`[data-testid="review-queue-item"][data-submission-id="${submissionId}"]`);
}

async function setRole(page: import('@playwright/test').Page, role: 'STUDENT' | 'COORDINATOR') {
  const response = await page.request.patch('/api/demo-context', { data: { role } });
  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  await page.context().addCookies([
    {
      name: 'erasmusmate_demo_context',
      value: JSON.stringify(payload.context),
      domain: '127.0.0.1',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
  ]);
}

test.describe('Institutional E2E acceptance workflows', () => {
  test.describe.configure({ mode: 'serial' });

  test('student submission resubmit loop and coordinator decision loop', async ({ page, request }) => {
    await setRole(page, 'STUDENT');
    await page.goto('/student/submissions');

    await expect(page.getByRole('heading', { name: 'Submissions' })).toBeVisible();
    const transcriptCard = submissionCard(page, 'sub-4');
    await expect(transcriptCard).toBeVisible();
    await expect(transcriptCard.getByTestId('submission-status-badge')).toHaveText('Needs correction');

    await transcriptCard.getByRole('button', { name: 'Resubmit' }).click();
    const resubmittedCard = submissionCard(page, 'sub-4');
    await expect(resubmittedCard.getByTestId('submission-status-badge')).toHaveText('Waiting for review');

    await setRole(page, 'COORDINATOR');
    await page.goto('/coordinator/review-queue');
    await expect(page.getByRole('heading', { name: 'Review queue' })).toBeVisible();

    const transcriptQueueItem = reviewQueueItem(page, 'sub-4');
    await expect(transcriptQueueItem).toBeVisible();
    await transcriptQueueItem.getByRole('button', { name: 'Start review' }).click();

    const inReviewQueueItem = reviewQueueItem(page, 'sub-4');
    await expect(inReviewQueueItem.getByTestId('submission-status-badge')).toHaveText('In review');
    await inReviewQueueItem.getByRole('button', { name: 'Approve' }).click();

    await expect
      .poll(async () => {
        const studentView = await request.get('/api/institutional/submissions', {
          headers: { cookie: 'demo_role=STUDENT' },
        });

        expect(studentView.ok()).toBeTruthy();

        const payload = await studentView.json();
        const submissions = payload?.data ?? payload?.submissions ?? [];
        const transcriptSubmission = submissions.find((submission: { id: string; state?: string; status?: string }) => submission.id === 'sub-4');

        return transcriptSubmission?.state ?? transcriptSubmission?.status;
      })
      .toBe('APPROVED');

    await setRole(page, 'STUDENT');
    await page.goto('/student/submissions');
    await expect(submissionCard(page, 'sub-4').getByTestId('submission-status-badge')).toHaveText(/APPROVED|Approved/);
  });

  test('learning agreement review decision is visible to student', async ({ page }) => {
    await setRole(page, 'COORDINATOR');
    await page.goto('/coordinator/learning-agreement-review');

    await expect(page.getByRole('heading', { name: 'Learning Agreement Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Approve' }).first().click();
    await expect(page.getByText('Row approved.')).toBeVisible();

    await setRole(page, 'STUDENT');
    await page.goto('/student/learning-agreement');
    await expect(page.getByRole('heading', { name: 'My Learning Agreement' })).toBeVisible();
    await expect(page.getByText('Databases and SQL')).toBeVisible();
    await expect(page.getByText('Approved').first()).toBeVisible();
  });

  test('exception request create, approve, and apply flow updates student-visible state', async ({ page }) => {
    await setRole(page, 'STUDENT');
    await page.goto('/student/exceptions');
    await expect(page.getByRole('heading', { name: 'Exception requests' })).toBeVisible();

    const uniqueTitle = `Phase 8B.3 exception ${Date.now()}`;
    const exceptionForm = page.locator('form').first();
    await exceptionForm.locator('input').fill(uniqueTitle);
    await exceptionForm.locator('select').selectOption('dead-2');
    await exceptionForm.getByPlaceholder('Reason for your request').fill('Embassy appointment moved and I need an extension.');
    await exceptionForm.getByRole('button', { name: 'Send request' }).click();
    await expect(page.getByText(uniqueTitle)).toBeVisible();
    await expect(page.getByText('Waiting for decision')).toBeVisible();

    await setRole(page, 'COORDINATOR');
    let promptCount = 0;
    page.on('dialog', async (dialog) => {
      promptCount += 1;
      const msg = dialog.message();
      if (msg === 'Rationale') {
        await dialog.accept(promptCount >= 2 ? 'Applied after approval.' : 'Evidence received and accepted.');
      } else if (msg === 'Extension date (YYYY-MM-DD)') {
        await dialog.accept('2026-06-30');
      } else {
        await dialog.dismiss();
      }
    });

    await page.goto('/coordinator/exceptions');
    const requestCard = page.locator('div.border.rounded.p-3').filter({ hasText: uniqueTitle }).first();
    await expect(requestCard).toBeVisible();
    await requestCard.getByRole('button', { name: 'Approve' }).click();
    await expect(requestCard.getByText('Status: Approved')).toBeVisible();
    await requestCard.getByRole('button', { name: 'Apply' }).click();
    await expect(requestCard.getByText('Status: Applied')).toBeVisible();

    await setRole(page, 'STUDENT');
    await page.goto('/student/exceptions');
    const studentRequestCard = page.locator('div.border.rounded.p-3.mb-2.text-sm').filter({ hasText: uniqueTitle }).first();
    await expect(studentRequestCard).toContainText('Status: Applied');
    await expect(studentRequestCard).toContainText('Applied after approval.');
  });

  test('institutional notification visibility and mark-read journey for recipient', async ({ page }) => {
    await setRole(page, 'STUDENT');
    await page.goto('/student/exceptions');

    const uniqueTitle = `Phase 8B.3 notification ${Date.now()}`;
    const exceptionForm = page.locator('form').first();
    await exceptionForm.locator('input').fill(uniqueTitle);
    await exceptionForm.locator('select').selectOption('dead-1');
    await exceptionForm.getByPlaceholder('Reason for your request').fill('Need extension due to delayed consulate response.');
    await exceptionForm.getByRole('button', { name: 'Send request' }).click();
    await expect(page.getByText(uniqueTitle)).toBeVisible();

    await setRole(page, 'COORDINATOR');
    page.on('dialog', async (dialog) => {
      if (dialog.message() === 'Rationale') await dialog.accept('Approved and ready.');
      else await dialog.dismiss();
    });
    await page.goto('/coordinator/exceptions');
    const requestCard = page.locator('div.border.rounded.p-3').filter({ hasText: uniqueTitle }).first();
    await requestCard.getByRole('button', { name: 'Approve' }).click();

    await setRole(page, 'STUDENT');
    await page.goto('/student/notifications');
    await expect(page.getByRole('heading', { name: 'Updates and activity' })).toBeVisible();

    const notificationCard = page.locator('article.rounded.border.p-3').filter({ hasText: 'Exception approved' }).first();
    await expect(notificationCard).toBeVisible();
    await expect(notificationCard).toContainText('Unread');
    await notificationCard.getByRole('button', { name: 'Mark as read' }).click();
    await expect(notificationCard).toContainText('Read');

    await setRole(page, 'COORDINATOR');
    await page.goto('/coordinator/notifications');
    await expect(page.getByRole('heading', { name: 'Assigned student updates' })).toBeVisible();
    await expect(page.getByText('Exception approved')).toHaveCount(0);
  });

  test('learning agreement request-changes revise and resubmit loop', async ({ page }) => {
    await setRole(page, 'STUDENT');
    await page.goto('/student/learning-agreement');
    const rowToRevise = page.locator('tr').filter({ hasText: 'Needs changes' }).first();
    await rowToRevise.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Destination Course Code').fill('DS-200');
    await page.getByLabel('Destination Course Name').fill('Database Systems Advanced');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Row updated and sent for review.')).toBeVisible();

    await setRole(page, 'COORDINATOR');
    await page.goto('/coordinator/learning-agreement-review');
    await expect(page.getByRole('heading', { name: 'Learning Agreement Review' })).toBeVisible();

    const latestInReviewRow = page.locator('tr').filter({ hasText: 'DS-200' }).first();
    await latestInReviewRow.getByPlaceholder('Add reason for changes').fill('Please provide clearer destination course match.');
    await latestInReviewRow.getByRole('button', { name: 'Request changes' }).click();
    await expect(page.getByText('Changes requested for row.')).toBeVisible();

    await setRole(page, 'STUDENT');
    await page.goto('/student/learning-agreement');
    await expect(page.getByRole('heading', { name: 'My Learning Agreement' })).toBeVisible();
    await expect(page.getByText('Needs changes').first()).toBeVisible();
    await expect(page.getByText('Please provide clearer destination course match.')).toBeVisible();

    await page.getByRole('button', { name: 'Resubmit' }).click();
    await expect(page.getByText('Update rows that need changes before resubmitting.')).toBeVisible();

    const deniedRow = page.locator('tr').filter({ hasText: 'Needs changes' }).first();
    await deniedRow.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Destination Course Code').fill('DS-201A');
    await page.getByLabel('Destination Course Name').fill('Databases and SQL II');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Row updated and sent for review.')).toBeVisible();

    await page.getByRole('button', { name: 'Resubmit' }).click();
    await expect(page.getByText('Resubmitted for review.')).toBeVisible();

    await setRole(page, 'COORDINATOR');
    await page.goto('/coordinator/learning-agreement-review');
    const ds201aRow = page.locator('tr').filter({ hasText: 'DS-201A' }).first();
    await expect(ds201aRow).toBeVisible();
    await expect(ds201aRow.getByText('In review', { exact: true })).toBeVisible();
  });
});
