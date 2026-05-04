import { beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '../../src/lib/prisma';
import { seed } from '../../prisma/seed';
import { getCoordinatorDashboardSummary, getCoordinatorReviewQueuePreview, getDeadlineSummary, getExceptionSummary, getStudentDashboardSummary } from '../../src/modules/institutional/read-models';

beforeAll(async () => {
  await seed();
});

describe('institutional read models', () => {
  it('student dashboard returns only student scoped data', async () => {
    const result = await getStudentDashboardSummary({ role: 'STUDENT', userId: 'student-1' });
    expect(result.record?.studentId).toBe('student-1');
    expect(result.submissions.every((s) => s.mobilityRecordId === 'mobility-1')).toBe(true);
  });

  it('coordinator dashboard returns only assigned data', async () => {
    const result = await getCoordinatorDashboardSummary({ role: 'COORDINATOR', userId: 'coordinator-1' });
    expect(result.assignedCount).toBeGreaterThan(0);
    expect(result.reviewQueue.some((s) => s.state === 'SUBMITTED')).toBe(true);
  });

  it('review queue preview includes submitted items', async () => {
    const queue = await getCoordinatorReviewQueuePreview({ role: 'COORDINATOR', userId: 'coordinator-1' });
    expect(queue.some((item) => item.state === 'SUBMITTED')).toBe(true);
  });

  it('deadline summary classifies seeded states', async () => {
    const deadlines = await getDeadlineSummary({ role: 'STUDENT', userId: 'student-1' });
    expect(deadlines.some((d) => d.state === 'UPCOMING')).toBe(true);
    expect(deadlines.some((d) => d.state === 'OVERDUE')).toBe(true);
    expect(deadlines.some((d) => d.state === 'FULFILLED')).toBe(true);
  });

  it('exception summary returns role-appropriate rows', async () => {
    const studentRows = await getExceptionSummary({ role: 'STUDENT', userId: 'student-1' });
    expect(studentRows.every((e) => e.requestedById === 'student-1')).toBe(true);
    const coordinatorRows = await getExceptionSummary({ role: 'COORDINATOR', userId: 'coordinator-1' });
    expect(coordinatorRows.length).toBeGreaterThan(0);
  });

  it('unauthorized role access is blocked', async () => {
    await expect(getStudentDashboardSummary({ role: 'ADMIN', userId: 'admin-1' } as never)).rejects.toThrow('FORBIDDEN');
  });

  it('student with no mobility record gets empty scoped summaries', async () => {
    await prisma.user.upsert({
      where: { id: 'student-no-record' },
      update: {},
      create: {
        id: 'student-no-record',
        email: 'student-no-record@erasmusmate.local',
        displayName: 'Student No Record',
        role: 'STUDENT',
        institutionId: 'inst-home-1',
      },
    });

    const dashboard = await getStudentDashboardSummary({ role: 'STUDENT', userId: 'student-no-record' });
    expect(dashboard.record).toBeNull();
    expect(dashboard.submissions).toEqual([]);
    expect(dashboard.deadlines).toEqual([]);
    expect(dashboard.exceptions).toEqual([]);

    const deadlines = await getDeadlineSummary({ role: 'STUDENT', userId: 'student-no-record' });
    expect(deadlines).toEqual([]);
  });
});
