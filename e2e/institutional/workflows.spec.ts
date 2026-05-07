import { expect, test } from '@playwright/test';


function submissionCard(page: import('@playwright/test').Page, submissionId: string) {
  return page.locator(`[data-testid="submission-card"][data-submission-id="${submissionId}"]`);
}

function reviewQueueItem(page: import('@playwright/test').Page, submissionId: string) {
  return page.locator(`[data-testid="review-queue-item"][data-submission-id="${submissionId}"]`);
}

function demoContextCookie(role: 'STUDENT' | 'COORDINATOR') {
  const userId = role === 'COORDINATOR' ? 'coordinator-1' : 'student-1';
  return `erasmusmate_demo_context=${encodeURIComponent(JSON.stringify({ role, userId }))}`;
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

async function gotoStable(page: import('@playwright/test').Page, path: string) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (attempt === 0 && message.includes('net::ERR_ABORTED')) {
        await page.waitForLoadState('domcontentloaded');
        continue;
      }
      throw error;
    }
  }
}

test.describe('Institutional E2E acceptance workflows', () => {
  test.describe.configure({ mode: 'serial' });

  test('student submission resubmit loop and coordinator decision loop', async ({ page, request }) => {
    await setRole(page, 'STUDENT');
    await gotoStable(page, '/student/submissions');

    await expect(page.getByRole('heading', { name: 'Submissions' })).toBeVisible();
    const transcriptCard = submissionCard(page, 'sub-4');
    await expect(transcriptCard).toBeVisible();
    await expect(transcriptCard.getByTestId('submission-status-badge')).toHaveText('Needs correction');

    const resubmitResponse = await page.request.patch('/api/institutional/submissions/sub-4/transition', {
      data: { action: 'resubmit' },
    });
    expect(resubmitResponse.ok()).toBeTruthy();
    await page.reload({ waitUntil: 'domcontentloaded' });
    const resubmittedCard = submissionCard(page, 'sub-4');
    await expect(resubmittedCard.getByTestId('submission-status-badge')).toHaveText('Waiting for review');

    await setRole(page, 'COORDINATOR');
    await gotoStable(page, '/coordinator/review-queue');
    await expect(page.getByRole('heading', { name: 'Review queue' })).toBeVisible();

    const transcriptQueueItem = reviewQueueItem(page, 'sub-4');
    await expect(transcriptQueueItem).toBeVisible();
    const startReviewResponse = await page.request.patch('/api/institutional/submissions/sub-4/transition', {
      data: { action: 'start_review' },
    });
    expect(startReviewResponse.ok()).toBeTruthy();
    await page.reload({ waitUntil: 'domcontentloaded' });

    const inReviewQueueItem = reviewQueueItem(page, 'sub-4');
    await expect(inReviewQueueItem.getByTestId('submission-status-badge')).toHaveText('In review');
    const approveResponse = await page.request.patch('/api/institutional/submissions/sub-4/transition', {
      data: { action: 'approve' },
    });
    expect(approveResponse.ok()).toBeTruthy();

    await expect
      .poll(async () => {
        const studentView = await request.get('/api/institutional/submissions', {
          headers: { cookie: demoContextCookie('STUDENT') },
        });

        expect(studentView.ok()).toBeTruthy();

        const payload = await studentView.json();
        const submissions = payload?.data ?? payload?.submissions ?? [];
        const transcriptSubmission = submissions.find((submission: { id: string; state?: string; status?: string }) => submission.id === 'sub-4');

        return transcriptSubmission?.state ?? transcriptSubmission?.status;
      }, { timeout: 15_000 })
      .toBe('APPROVED');
  });

  test('learning agreement review decision is visible to student', async ({ page }) => {
    await setRole(page, 'COORDINATOR');
    await gotoStable(page, '/coordinator/learning-agreement-review');

    await expect(page.getByRole('heading', { name: 'Learning Agreement Review' })).toBeVisible();
    const inReviewRow = page.locator('tr').filter({ hasText: 'Databases and SQL' }).first();
    await expect(inReviewRow.getByText('In review')).toBeVisible();
    await inReviewRow.getByRole('button', { name: 'Approve' }).click();

    await setRole(page, 'STUDENT');
    await gotoStable(page, '/student/learning-agreement');
    await expect(page.getByRole('heading', { name: 'My Learning Agreement' })).toBeVisible();
    await expect(page.getByText('Databases and SQL')).toBeVisible();
    await expect(page.getByText('Approved').first()).toBeVisible();
  });

  test('exception request create, approve, and apply flow updates student-visible state', async ({ page }) => {
    await setRole(page, 'STUDENT');
    await gotoStable(page, '/student/exceptions');
    await expect(page.getByRole('heading', { name: 'Exception requests' })).toBeVisible();

    const uniqueTitle = `Phase 8B.3 exception ${Date.now()}`;
    const createResponse = await page.request.post('/api/institutional/exceptions', {
      data: {
        title: uniqueTitle,
        deadlineId: 'dead-2',
        reason: 'Embassy appointment moved and I need an extension.',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    const createdPayload = await createResponse.json();
    const createdId = createdPayload?.data?.id as string;
    expect(createdId).toBeTruthy();
    await page.reload({ waitUntil: 'domcontentloaded' });

    const createdRequestCard = page.locator('div.border.rounded.p-3.mb-2.text-sm').filter({ hasText: uniqueTitle }).first();
    await expect(createdRequestCard).toBeVisible();
    await expect(createdRequestCard).toContainText('Waiting for decision');

    await setRole(page, 'COORDINATOR');
    const approveResponse = await page.request.patch(`/api/institutional/exceptions/${createdId}/transition`, {
      data: { action: 'approve', rationale: 'Evidence received and accepted.' },
    });
    expect(approveResponse.ok()).toBeTruthy();

    const applyResponse = await page.request.patch(`/api/institutional/exceptions/${createdId}/transition`, {
      data: { action: 'apply', rationale: 'Applied after approval.', overrideDueDate: '2026-06-30' },
    });
    expect(applyResponse.ok()).toBeTruthy();

    await setRole(page, 'STUDENT');
    await gotoStable(page, '/student/exceptions');
    const studentRequestCard = page.locator('div.border.rounded.p-3.mb-2.text-sm').filter({ hasText: uniqueTitle }).first();
    await expect(studentRequestCard).toContainText('Status: Applied');
    await expect(studentRequestCard).toContainText('Applied after approval.');
  });

  test('institutional notification visibility and mark-read journey for recipient', async ({ page }) => {
    await setRole(page, 'STUDENT');
    await gotoStable(page, '/student/exceptions');

    const uniqueTitle = `Phase 8B.3 notification ${Date.now()}`;
    const createResponse = await page.request.post('/api/institutional/exceptions', {
      data: {
        title: uniqueTitle,
        deadlineId: 'dead-1',
        reason: 'Need extension due to delayed consulate response.',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    const createdPayload = await createResponse.json();
    const createdId = createdPayload?.data?.id as string;
    expect(createdId).toBeTruthy();

    await setRole(page, 'COORDINATOR');
    const approveResponse = await page.request.patch(`/api/institutional/exceptions/${createdId}/transition`, {
      data: { action: 'approve', rationale: 'Approved and ready.' },
    });
    expect(approveResponse.ok()).toBeTruthy();

    await setRole(page, 'STUDENT');
    await gotoStable(page, '/student/notifications');
    await expect(page.getByRole('heading', { name: 'Updates and activity' })).toBeVisible();

    const notificationCard = page.locator('article.rounded.border.p-3').filter({ hasText: 'EXCEPTION_APPROVE' }).first();
    await expect(notificationCard).toBeVisible();
    await expect(notificationCard).toContainText('Unread');
    await notificationCard.getByRole('button', { name: 'Mark as read' }).click();
    await expect(notificationCard).toContainText('Read');

    await setRole(page, 'COORDINATOR');
    await gotoStable(page, '/coordinator/notifications');
    await expect(page.getByRole('heading', { name: 'Assigned student updates' })).toBeVisible();
    await expect(page.getByText('EXCEPTION_APPROVE')).toHaveCount(0);
  });

  test('learning agreement request-changes revise and resubmit loop', async ({ page, request }) => {
    await setRole(page, 'STUDENT');

    const agreementResponse = await request.get('/api/institutional/learning-agreement', {
      headers: { cookie: demoContextCookie('STUDENT') },
    });
    expect(agreementResponse.ok()).toBeTruthy();
    const agreementPayload = await agreementResponse.json();
    const agreement = (agreementPayload?.data ?? [])[0];
    expect(agreement?.id).toBeTruthy();
    const agreementId = agreement.id as string;

    const studentDetailResponse = await request.get(`/api/institutional/learning-agreement/${agreementId}`, {
      headers: { cookie: demoContextCookie('STUDENT') },
    });
    expect(studentDetailResponse.ok()).toBeTruthy();
    const studentDetailPayload = await studentDetailResponse.json();
    const deniedRow = (studentDetailPayload?.data?.rows ?? []).find((row: { isLatest: boolean; status: string }) => row.isLatest && row.status === 'DENIED');
    expect(deniedRow?.id).toBeTruthy();

    const reviseResponse = await request.patch(`/api/institutional/learning-agreement/${agreementId}/rows/${deniedRow.id}`, {
      headers: {
        cookie: demoContextCookie('STUDENT'),
        'content-type': 'application/json',
      },
      data: {
        homeCourseCode: deniedRow.homeCourseCode,
        homeCourseName: deniedRow.homeCourseName,
        destinationCourseCode: 'DS-200',
        destinationCourseName: 'Database Systems Advanced',
        ects: deniedRow.ects,
        semester: deniedRow.semester,
      },
    });
    expect(reviseResponse.ok()).toBeTruthy();

    const coordinatorDecisionCookie = `erasmusmate_demo_context=${encodeURIComponent(JSON.stringify({ role: 'COORDINATOR', userId: 'coordinator-1' }))}`;
    const coordinatorDetailResponse = await request.get(`/api/institutional/learning-agreement/${agreementId}`, {
      headers: { cookie: coordinatorDecisionCookie },
    });
    expect(coordinatorDetailResponse.ok()).toBeTruthy();
    const coordinatorDetailPayload = await coordinatorDetailResponse.json();
    const ds200Row = (coordinatorDetailPayload?.data?.rows ?? []).find((row: { isLatest: boolean; destinationCourseCode: string; status: string }) => row.isLatest && row.destinationCourseCode === 'DS-200' && row.status === 'IN_REVIEW');
    expect(ds200Row?.id).toBeTruthy();

    const denyResponse = await request.post(`/api/institutional/learning-agreement/${agreementId}/rows/${ds200Row.id}/decision`, {
      headers: {
        cookie: coordinatorDecisionCookie,
        'content-type': 'application/json',
      },
      data: { decision: 'DENIED', rationale: 'Please provide clearer destination course match.' },
    });
    expect(denyResponse.ok()).toBeTruthy();

    const blockedResubmitResponse = await request.post(`/api/institutional/learning-agreement/${agreementId}/resubmit`, {
      headers: { cookie: demoContextCookie('STUDENT') },
    });
    expect(blockedResubmitResponse.ok()).toBeFalsy();

    const studentDetailAfterDenyResponse = await request.get(`/api/institutional/learning-agreement/${agreementId}`, {
      headers: { cookie: demoContextCookie('STUDENT') },
    });
    expect(studentDetailAfterDenyResponse.ok()).toBeTruthy();
    const studentDetailAfterDenyPayload = await studentDetailAfterDenyResponse.json();
    const latestDeniedRow = (studentDetailAfterDenyPayload?.data?.rows ?? []).find((row: { isLatest: boolean; status: string }) => row.isLatest && row.status === 'DENIED');
    expect(latestDeniedRow?.id).toBeTruthy();

    const finalRevisionResponse = await request.patch(`/api/institutional/learning-agreement/${agreementId}/rows/${latestDeniedRow.id}`, {
      headers: {
        cookie: demoContextCookie('STUDENT'),
        'content-type': 'application/json',
      },
      data: {
        homeCourseCode: latestDeniedRow.homeCourseCode,
        homeCourseName: latestDeniedRow.homeCourseName,
        destinationCourseCode: 'DS-201A',
        destinationCourseName: 'Databases and SQL II',
        ects: latestDeniedRow.ects,
        semester: latestDeniedRow.semester,
      },
    });
    expect(finalRevisionResponse.ok()).toBeTruthy();

    await setRole(page, 'COORDINATOR');
    await gotoStable(page, '/coordinator/learning-agreement-review');
    const ds201aRow = page.locator('tr').filter({ hasText: 'DS-201A' }).first();
    await expect(ds201aRow).toBeVisible();
    await expect(ds201aRow.getByText('In review', { exact: true })).toBeVisible();
  });
});
