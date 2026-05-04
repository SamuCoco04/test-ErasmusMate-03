import { beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { createDraftSubmission, listReviewQueueForCoordinator, transitionSubmission } from '@/src/modules/institutional/submissions';

beforeAll(async () => {
  await seed();
  await prisma.user.upsert({ where: { id: 'student-2' }, update: { email: 'student2@erasmusmate.demo', displayName: 'Student Two', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-2', email: 'student2@erasmusmate.demo', displayName: 'Student Two', role: 'STUDENT', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'coordinator-2' }, update: { email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' }, create: { id: 'coordinator-2', email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' } });
});

describe('Institutional submissions workflow', () => {
  it('student can create draft for own mobility/procedure', async () => {
    const created = await createDraftSubmission({ role: 'STUDENT', userId: 'student-1' }, 'proc-2');
    expect(created.state).toBe('DRAFT');
  });

  it('student can submit own DRAFT', async () => {
    const updated = await transitionSubmission({ role: 'STUDENT', userId: 'student-1' }, 'sub-1', 'submit');
    expect(updated.state).toBe('SUBMITTED');
  });

  it('student cannot submit another student submission', async () => {
    await expect(transitionSubmission({ role: 'STUDENT', userId: 'student-2' }, 'sub-2', 'submit')).rejects.toThrow('Forbidden');
  });

  it('coordinator sees only assigned review queue submissions', async () => {
    const queue1 = await listReviewQueueForCoordinator({ role: 'COORDINATOR', userId: 'coordinator-1' });
    expect(queue1.length).toBeGreaterThan(0);
    const queue2 = await listReviewQueueForCoordinator({ role: 'COORDINATOR', userId: 'coordinator-2' });
    expect(queue2).toHaveLength(0);
  });

  it('coordinator can start review assigned SUBMITTED/RESUBMITTED', async () => {
    const updated = await transitionSubmission({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-2', 'start_review');
    expect(updated.state).toBe('IN_REVIEW');
  });

  it('coordinator can approve IN_REVIEW', async () => {
    const updated = await transitionSubmission({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-3', 'approve');
    expect(updated.state).toBe('APPROVED');
  });

  it('reject requires rationale', async () => {
    await expect(transitionSubmission({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-2', 'reject')).rejects.toThrow('Rationale is required');
  });

  it('reopen requires rationale', async () => {
    await expect(transitionSubmission({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-5', 'reopen')).rejects.toThrow('Rationale is required');
  });

  it('student can resubmit REJECTED/REOPENED', async () => {
    const updated = await transitionSubmission({ role: 'STUDENT', userId: 'student-1' }, 'sub-4', 'resubmit', 'Added corrected metadata');
    expect(updated.state).toBe('RESUBMITTED');
  });

  it('invalid transitions are blocked', async () => {
    await expect(transitionSubmission({ role: 'STUDENT', userId: 'student-1' }, 'sub-3', 'resubmit')).rejects.toThrow('Invalid state transition');
  });

  it('audit and event records are created on transitions', async () => {
    await transitionSubmission({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-5', 'reopen', 'Need corrected metadata');
    const events = await prisma.documentSubmissionEvent.findMany({ where: { submissionId: 'sub-5' } });
    const audits = await prisma.auditRecord.findMany({ where: { mobilityRecordId: 'mobility-1', eventType: 'SUBMISSION_REOPEN' } });
    expect(events.length).toBeGreaterThan(0);
    expect(audits.length).toBeGreaterThan(0);
  });
});
