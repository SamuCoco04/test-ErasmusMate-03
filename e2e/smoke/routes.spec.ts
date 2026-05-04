import { expect, test } from '@playwright/test';

test.describe('Smoke route checks', () => {
  test('app home loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'ErasmusMate' })).toBeVisible();
  });

  for (const route of [
    '/student/dashboard',
    '/coordinator/dashboard',
    '/admin/dashboard',
    '/social/student/dashboard',
  ]) {
    test(`${route} loads`, async ({ page }) => {
      await page.goto(route);
      await expect(page.getByText('Demo mode')).toBeVisible();
    });
  }

  test('demo context API can read and update selected role', async ({ request }) => {
    const setResult = await request.patch('/api/demo-context', { data: { role: 'COORDINATOR' } });
    expect(setResult.ok()).toBeTruthy();
    const setPayload = await setResult.json();
    expect(setPayload.context.role).toBe('COORDINATOR');

    const getResult = await request.get('/api/demo-context');
    expect(getResult.ok()).toBeTruthy();
    const getPayload = await getResult.json();
    expect(getPayload.context.role).toBe('COORDINATOR');
  });
});
