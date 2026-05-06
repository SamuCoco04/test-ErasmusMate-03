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
    expect(result.pendingReviewCount).toBe(1);
    expect(result.inReviewCount).toBe(1);
    expect(result.needsCorrectionCount).toBe(1);
    expect(result.overdueDeadlineCount).toBe(1);
    expect(result.pendingExceptionCount).toBe(2);
    expect(result.workload.length).toBeGreaterThan(0);
    expect(result.recentSubmissions.length).toBeGreaterThan(0);
    expect(result.workload[0]?.riskLevel).toBe('HIGH');
  });

  it('coordinator risk classification includes medium and low cases', async () => {
    await prisma.user.upsert({ where: { id: 'student-medium' }, update: {}, create: { id: 'student-medium', email: 'student-medium@erasmusmate.local', displayName: 'Student Medium', role: 'STUDENT', institutionId: 'inst-home-1' } });
    await prisma.user.upsert({ where: { id: 'student-low' }, update: {}, create: { id: 'student-low', email: 'student-low@erasmusmate.local', displayName: 'Student Low', role: 'STUDENT', institutionId: 'inst-home-1' } });
    await prisma.mobilityRecord.upsert({ where: { id: 'mobility-medium' }, update: {}, create: { id: 'mobility-medium', studentId: 'student-medium', coordinatorId: 'coordinator-1', homeInstitutionId: 'inst-home-1', hostInstitutionId: 'inst-host-1', mobilityStatus: 'PENDING' } });
    await prisma.mobilityRecord.upsert({ where: { id: 'mobility-low' }, update: {}, create: { id: 'mobility-low', studentId: 'student-low', coordinatorId: 'coordinator-1', homeInstitutionId: 'inst-home-1', hostInstitutionId: 'inst-host-1', mobilityStatus: 'PENDING' } });
    await prisma.documentSubmission.upsert({ where: { id: 'sub-medium' }, update: {}, create: { id: 'sub-medium', mobilityRecordId: 'mobility-medium', procedureId: 'proc-1', state: 'SUBMITTED' } });

    const result = await getCoordinatorDashboardSummary({ role: 'COORDINATOR', userId: 'coordinator-1' });
    expect(result.workload.find((item) => item.studentId === 'student-medium')?.riskLevel).toBe('MEDIUM');
    expect(result.workload.find((item) => item.studentId === 'student-low')?.riskLevel).toBe('LOW');
  });

  it('coordinator with no assignments gets empty workload', async () => {
    await prisma.user.upsert({ where: { id: 'coordinator-empty' }, update: {}, create: { id: 'coordinator-empty', email: 'coordinator-empty@erasmusmate.local', displayName: 'Coordinator Empty', role: 'COORDINATOR', institutionId: 'inst-home-1' } });
    const result = await getCoordinatorDashboardSummary({ role: 'COORDINATOR', userId: 'coordinator-empty' });
    expect(result.assignedCount).toBe(0);
    expect(result.workload).toEqual([]);
    expect(result.reviewQueue).toEqual([]);
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
