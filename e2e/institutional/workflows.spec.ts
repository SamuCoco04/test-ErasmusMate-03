import { expect, test } from '@playwright/test';

async function setRole(page: import('@playwright/test').Page, role: 'STUDENT' | 'COORDINATOR') {
  const response = await page.request.patch('/api/demo-context', { data: { role } });
  expect(response.ok()).toBeTruthy();
}

test.describe('Institutional E2E acceptance workflows', () => {
  test('student submission resubmit loop and coordinator decision loop', async ({ page, request }) => {
    await setRole(page, 'STUDENT');
    await page.goto('/student/submissions');

    await expect(page.getByRole('heading', { name: 'Submissions' })).toBeVisible();
    const transcriptCard = page.locator('div.rounded-lg.border.p-3').filter({ hasText: 'Transcript request' }).first();
    await expect(transcriptCard).toBeVisible();
    await expect(transcriptCard.getByText('Needs correction')).toBeVisible();

    await transcriptCard.getByRole('button', { name: 'Resubmit' }).click();
    await expect(page.getByText('Waiting for review').first()).toBeVisible();

    await setRole(page, 'COORDINATOR');
    await page.goto('/coordinator/review-queue');
    await expect(page.getByRole('heading', { name: 'Review queue' })).toBeVisible();

    const transcriptQueueItem = page.locator('div.rounded-xl.border').filter({ hasText: 'Transcript request' }).first();
    await expect(transcriptQueueItem).toBeVisible();
    await transcriptQueueItem.getByRole('button', { name: 'Start review' }).click();
    await expect(transcriptQueueItem.getByText('In review')).toBeVisible();
    await transcriptQueueItem.getByRole('button', { name: 'Approve' }).click();

    await expect(page.getByText('Approved').first()).toBeVisible();

    const studentView = await request.get('/api/institutional/submissions', {
      headers: { cookie: 'demo_role=STUDENT' },
    });
    expect(studentView.ok()).toBeTruthy();
    const payload = await studentView.json();
    const transcriptSubmission = payload.data.find((item: { procedure: { title: string }; state: string }) => item.procedure.title === 'Transcript request');
    expect(transcriptSubmission?.state).toBe('APPROVED');
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

  test('exception request create and coordinator decision loop', async ({ page }) => {
    await setRole(page, 'STUDENT');
    await page.goto('/student/exceptions');
    await expect(page.getByRole('heading', { name: 'Exception requests' })).toBeVisible();

    const uniqueTitle = `Phase 8B.1 extension ${Date.now()}`;
    await page.locator('input').first().fill(uniqueTitle);
    await page.locator('select').selectOption('dead-2');
    await page.getByPlaceholder('Reason for your request').fill('Embassy appointment moved and I need an extension.');
    await page.getByRole('button', { name: 'Send request' }).click();
    await expect(page.getByText(uniqueTitle)).toBeVisible();
    await expect(page.getByText('Waiting for decision')).toBeVisible();

    await setRole(page, 'COORDINATOR');
    page.on('dialog', async (dialog) => {
      const msg = dialog.message();
      if (msg === 'Rationale') await dialog.accept('Evidence received and accepted.');
      else await dialog.dismiss();
    });

    await page.goto('/coordinator/exceptions');
    const requestCard = page.locator('div.border.rounded.p-3').filter({ hasText: uniqueTitle }).first();
    await expect(requestCard).toBeVisible();
    await requestCard.getByRole('button', { name: 'Approve' }).click();
    await expect(requestCard.getByText('Status: Approved')).toBeVisible();
  });
});
