import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { createDraftSubmission, listReviewQueueForCoordinator, transitionSubmission } from '@/src/modules/institutional/submissions';

beforeEach(async () => {
  await seed();
  await prisma.user.upsert({ where: { id: 'student-2' }, update: { email: 'student2@erasmusmate.demo', displayName: 'Student Two', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-2', email: 'student2@erasmusmate.demo', displayName: 'Student Two', role: 'STUDENT', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'coordinator-2' }, update: { email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' }, create: { id: 'coordinator-2', email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' } });
});

describe('Institutional submissions workflow', () => {
  it('student can create draft for own mobility/procedure', async () => {
    const created = await createDraftSubmission({ role: 'STUDENT', userId: 'student-1' }, 'proc-2');
    expect(created.state).toBe('DRAFT');
  });


  it('student cannot submit DRAFT without ACTIVE attachment', async () => {
    await expect(transitionSubmission({ role: 'STUDENT', userId: 'student-1' }, 'sub-1', 'submit')).rejects.toThrow('At least one active attachment is required');
  });

  it('student can submit DRAFT with ACTIVE attachment', async () => {
    await prisma.documentAttachment.create({
      data: {
        id: 'att-sub-1-active',
        submissionId: 'sub-1',
        uploadedById: 'student-1',
        fileName: 'passport-copy.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 1000,
        storageKey: 'demo/sub-1/passport-copy.pdf',
        status: 'ACTIVE',
      },
    });
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
    await transitionSubmission({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-2', 'start_review');
    await expect(transitionSubmission({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-2', 'reject')).rejects.toThrow('Rationale is required');
  });

  it('reopen requires rationale', async () => {
    await expect(transitionSubmission({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-5', 'reopen')).rejects.toThrow('Rationale is required');
  });

  it('student can resubmit REJECTED/REOPENED/NEEDS_CORRECTION with ACTIVE attachment', async () => {
    const rejected = await transitionSubmission({ role: 'STUDENT', userId: 'student-1' }, 'sub-4', 'resubmit', 'Added corrected metadata');
    expect(rejected.state).toBe('RESUBMITTED');

    await prisma.documentSubmission.create({
      data: {
        id: 'sub-needs-correction',
        mobilityRecordId: 'mobility-1',
        procedureId: 'proc-1',
        state: 'NEEDS_CORRECTION',
      },
    });

    await prisma.documentAttachment.create({
      data: {
        id: 'att-needs-correction',
        submissionId: 'sub-needs-correction',
        uploadedById: 'student-1',
        fileName: 'corrected.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 1300,
        storageKey: 'demo/sub-needs-correction/corrected.pdf',
        status: 'ACTIVE',
      },
    });

    const corrected = await transitionSubmission({ role: 'STUDENT', userId: 'student-1' }, 'sub-needs-correction', 'resubmit', 'Corrected as requested');
    expect(corrected.state).toBe('RESUBMITTED');
  });


  it('student rationale does not overwrite reviewer notes on resubmit', async () => {
    await prisma.documentSubmission.upsert({
      where: { id: 'sub-regression-reviewer-notes' },
      update: {
        state: 'REJECTED',
        submittedAt: new Date('2026-04-09T09:00:00.000Z'),
        reviewedAt: new Date('2026-04-11T09:00:00.000Z'),
        reviewerNotes: 'Coordinator note must persist',
      },
      create: {
        id: 'sub-regression-reviewer-notes',
        mobilityRecordId: 'mobility-1',
        procedureId: 'proc-4',
        state: 'REJECTED',
        submittedAt: new Date('2026-04-09T09:00:00.000Z'),
        reviewedAt: new Date('2026-04-11T09:00:00.000Z'),
        reviewerNotes: 'Coordinator note must persist',
      },
    });

    const before = await prisma.documentSubmission.findUniqueOrThrow({ where: { id: 'sub-regression-reviewer-notes' } });
    expect(before.reviewerNotes).toBe('Coordinator note must persist');

    await prisma.documentAttachment.create({
      data: {
        id: 'att-regression-reviewer-notes',
        submissionId: 'sub-regression-reviewer-notes',
        uploadedById: 'student-1',
        fileName: 'updated-transcript-request.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 1100,
        storageKey: 'demo/sub-regression-reviewer-notes/updated.pdf',
        status: 'ACTIVE',
      },
    });

    const updated = await transitionSubmission({ role: 'STUDENT', userId: 'student-1' }, 'sub-regression-reviewer-notes', 'resubmit', 'Student explanation');
    expect(updated.reviewerNotes).toBe('Coordinator note must persist');
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
