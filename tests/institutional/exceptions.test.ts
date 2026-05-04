import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { createExceptionRequest, transitionException } from '@/src/modules/institutional/exceptions';

beforeEach(async () => {
  await seed();
  await prisma.user.upsert({ where: { id: 'coordinator-2' }, update: { email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' }, create: { id: 'coordinator-2', email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' } });
});

describe('Institutional exceptions workflow', () => {
  it('student can create exception for own deadline and audit is written', async () => {
    const created = await createExceptionRequest({ role: 'STUDENT', userId: 'student-1' }, { title: 'Ask for more time', reason: 'Medical reason', deadlineId: 'dead-1' });
    expect(created.state).toBe('PENDING');
    const audit = await prisma.auditRecord.findFirst({ where: { eventType: 'EXCEPTION_CREATED' } });
    expect(audit).toBeTruthy();
  });

  it('coordinator cannot transition exception outside assigned mobility', async () => {
    const created = await createExceptionRequest({ role: 'STUDENT', userId: 'student-1' }, { title: 'Ask for more time', reason: 'Travel issue', deadlineId: 'dead-1' });
    await expect(transitionException({ role: 'COORDINATOR', userId: 'coordinator-2' }, created.id, 'approve', { rationale: 'ok' })).rejects.toMatchObject({ code: 'FORBIDDEN' });
  });

  it('apply updates deadline override and writes audits', async () => {
    const created = await createExceptionRequest({ role: 'STUDENT', userId: 'student-1' }, { title: 'Ask for more time', reason: 'Embassy delay', deadlineId: 'dead-1' });
    await transitionException({ role: 'COORDINATOR', userId: 'coordinator-1' }, created.id, 'approve', { rationale: 'Approved extension' });
    await transitionException({ role: 'COORDINATOR', userId: 'coordinator-1' }, created.id, 'apply', { rationale: 'Apply extension', overrideDueDate: '2026-06-30' });
    const deadline = await prisma.deadline.findUniqueOrThrow({ where: { id: 'dead-1' } });
    expect(deadline.overrideDueDate).toBeTruthy();
    const overrideAudit = await prisma.auditRecord.findFirst({ where: { eventType: 'DEADLINE_OVERRIDE_APPLIED' } });
    expect(overrideAudit).toBeTruthy();
  });
});
