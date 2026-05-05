import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { DEMO_CONTEXT_COOKIE_NAME } from '@/src/modules/shared/demo-context';
import { computeEffectiveDeadlineState, generateDeadlineReminders, listDeadlinesForCoordinator, listDeadlinesForStudent } from '@/src/modules/institutional/deadlines';
import { GET as exportDeadlines } from '@/app/api/institutional/deadlines/export/route';

describe('Phase 6C deadlines, export, reminders', () => {
  beforeEach(async () => { await seed(); await prisma.notification.deleteMany(); });

  it('student read model scoped to own deadlines', async () => {
    const items = await listDeadlinesForStudent({ role: 'STUDENT', userId: 'student-1' });
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((d) => d.mobilityRecordId === 'mobility-1')).toBe(true);
  });

  it('coordinator read model scoped to assigned mobility records', async () => {
    const items = await listDeadlinesForCoordinator({ role: 'COORDINATOR', userId: 'coordinator-1' });
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((d) => d.mobilityRecordId === 'mobility-1')).toBe(true);
  });

  it('effectiveDueDate uses override date', () => {
    expect(computeEffectiveDeadlineState({ state: 'UPCOMING', dueDate: new Date('2026-05-01'), overrideDueDate: new Date('2026-06-01'), fulfilledAt: null }, new Date('2026-05-10'))).toBe('OVERRIDDEN');
  });

  it('calendar export returns text/calendar without internal fields', async () => {
    const req = new Request('http://localhost/api/institutional/deadlines/export', { headers: { cookie: `${DEMO_CONTEXT_COOKIE_NAME}=${encodeURIComponent('{"role":"STUDENT","userId":"student-1"}')}` } });
    const res = await exportDeadlines(req as any);
    const text = await res.text();
    expect(res.headers.get('Content-Type')).toContain('text/calendar');
    expect(text).toContain('BEGIN:VCALENDAR');
    expect(text).not.toContain('storageKey');
    expect(text).not.toContain('/tmp/');
  });

  it('reminder generation creates upcoming/overdue notifications and is idempotent', async () => {
    const first = await generateDeadlineReminders(new Date('2026-04-16T00:00:00.000Z'));
    const second = await generateDeadlineReminders(new Date('2026-04-16T00:00:00.000Z'));
    expect(first.createdCount).toBeGreaterThan(0);
    expect(second.createdCount).toBe(0);
  });
});
