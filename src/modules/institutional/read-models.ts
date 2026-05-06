import { prisma } from '@/src/lib/prisma';
import { DemoContext } from '@/src/modules/shared/demo-context';

function ensureRole(ctx: DemoContext, allowed: Array<DemoContext['role']>) {
  if (!allowed.includes(ctx.role)) throw new Error('FORBIDDEN');
}

export async function getStudentDashboardSummary(ctx: DemoContext) {
  ensureRole(ctx, ['STUDENT']);
  const record = await prisma.mobilityRecord.findFirst({ where: { studentId: ctx.userId }, include: { hostInstitution: true } });
  if (!record) {
    return { record: null, submissions: [], deadlines: [], exceptions: [] };
  }
  const submissions = await prisma.documentSubmission.findMany({ where: { mobilityRecordId: record.id } });
  const deadlines = await prisma.deadline.findMany({ where: { mobilityRecordId: record.id } });
  const exceptions = await prisma.exceptionRequest.findMany({ where: { mobilityRecordId: record.id, requestedById: ctx.userId } });
  return { record, submissions, deadlines, exceptions };
}

export async function getCoordinatorDashboardSummary(ctx: DemoContext) {
  ensureRole(ctx, ['COORDINATOR']);
  const records = await prisma.mobilityRecord.findMany({
    where: { coordinatorId: ctx.userId },
    include: {
      student: {
        select: {
          id: true,
          displayName: true,
          email: true,
        },
      },
      submissions: {
        select: {
          state: true,
          updatedAt: true,
        },
      },
      deadlines: {
        select: {
          dueDate: true,
          state: true,
        },
      },
      exceptionRequests: {
        where: { state: { in: ['PENDING', 'IN_REVIEW'] } },
        select: {
          id: true,
        },
      },
    },
  });
  const ids = records.map((r) => r.id);
  const pendingReviewCount = records.reduce((acc, record) => acc + record.submissions.filter((s) => s.state === 'SUBMITTED').length, 0);
  const inReviewCount = records.reduce((acc, record) => acc + record.submissions.filter((s) => s.state === 'IN_REVIEW').length, 0);
  const needsCorrectionCount = records.reduce((acc, record) => acc + record.submissions.filter((s) => s.state === 'REJECTED').length, 0);
  const overdueDeadlineCount = records.reduce((acc, record) => acc + record.deadlines.filter((d) => d.state === 'OVERDUE').length, 0);
  const pendingExceptionCount = records.reduce((acc, record) => acc + record.exceptionRequests.length, 0);

  const workload = records.map((record) => {
    const submittedCount = record.submissions.filter((s) => s.state === 'SUBMITTED').length;
    const inReviewSubmissionCount = record.submissions.filter((s) => s.state === 'IN_REVIEW').length;
    const rejectedCount = record.submissions.filter((s) => s.state === 'REJECTED').length;
    const nearestDeadline = [...record.deadlines].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())[0] ?? null;
    const hasOverdue = record.deadlines.some((d) => d.state === 'OVERDUE');
    const hasPendingException = record.exceptionRequests.length > 0;
    const riskLevel = hasOverdue || rejectedCount > 0 || hasPendingException
      ? 'HIGH'
      : submittedCount > 0 || inReviewSubmissionCount > 0
        ? 'MEDIUM'
        : 'LOW';

    return {
      mobilityRecordId: record.id,
      studentId: record.studentId,
      studentLabel: record.student.displayName || record.student.email,
      mobilityStatus: record.mobilityStatus,
      submissionCounts: {
        submitted: submittedCount,
        inReview: inReviewSubmissionCount,
        rejected: rejectedCount,
      },
      nearestDeadline,
      hasPendingException,
      riskLevel,
    };
  });

  const recentSubmissions = await prisma.documentSubmission.findMany({
    where: { mobilityRecordId: { in: ids } },
    orderBy: { updatedAt: 'desc' },
    take: 5,
    include: {
      procedure: { select: { title: true } },
      mobilityRecord: { select: { studentId: true, student: { select: { displayName: true, email: true } } } },
    },
  });

  return {
    assignedCount: records.length,
    pendingReviewCount,
    inReviewCount,
    needsCorrectionCount,
    overdueDeadlineCount,
    pendingExceptionCount,
    reviewQueue: await prisma.documentSubmission.findMany({ where: { mobilityRecordId: { in: ids }, state: 'SUBMITTED' }, include: { procedure: true }, take: 5 }),
    deadlines: await prisma.deadline.findMany({ where: { mobilityRecordId: { in: ids } } }),
    exceptions: await prisma.exceptionRequest.findMany({ where: { mobilityRecordId: { in: ids }, state: { in: ['PENDING', 'IN_REVIEW'] } }, take: 5 }),
    workload,
    recentSubmissions: recentSubmissions.map((item) => ({
      id: item.id,
      state: item.state,
      updatedAt: item.updatedAt,
      procedureTitle: item.procedure.title,
      studentLabel: item.mobilityRecord.student.displayName || item.mobilityRecord.student.email,
    })),
  };
}

export async function getAdminInstitutionalOverview(ctx: DemoContext) {
  ensureRole(ctx, ['ADMIN']);
  const [users, mobilityRecords, submissions, exceptions] = await Promise.all([
    prisma.user.count(), prisma.mobilityRecord.count(), prisma.documentSubmission.count(), prisma.exceptionRequest.count(),
  ]);
  return { users, mobilityRecords, submissions, exceptions };
}

export async function getCurrentMobilityRecord(ctx: DemoContext) {
  ensureRole(ctx, ['STUDENT']);
  return prisma.mobilityRecord.findFirst({ where: { studentId: ctx.userId }, include: { homeInstitution: true, hostInstitution: true } });
}

export async function getStudentProcedureSummary(ctx: DemoContext) {
  ensureRole(ctx, ['STUDENT']);
  const record = await prisma.mobilityRecord.findFirst({ where: { studentId: ctx.userId } });
  if (!record) return [];
  return prisma.documentSubmission.findMany({ where: { mobilityRecordId: record.id }, include: { procedure: true } });
}

export async function getCoordinatorReviewQueuePreview(ctx: DemoContext) {
  ensureRole(ctx, ['COORDINATOR']);
  const records = await prisma.mobilityRecord.findMany({ where: { coordinatorId: ctx.userId }, select: { id: true } });
  return prisma.documentSubmission.findMany({ where: { mobilityRecordId: { in: records.map((r) => r.id) }, state: 'SUBMITTED' }, include: { procedure: true } });
}

export async function getDeadlineSummary(ctx: DemoContext) {
  if (ctx.role === 'STUDENT') {
    const record = await prisma.mobilityRecord.findFirst({ where: { studentId: ctx.userId } });
    if (!record) return [];
    return prisma.deadline.findMany({ where: { mobilityRecordId: record.id } });
  }
  if (ctx.role === 'COORDINATOR') {
    const ids = (await prisma.mobilityRecord.findMany({ where: { coordinatorId: ctx.userId }, select: { id: true } })).map((r) => r.id);
    return prisma.deadline.findMany({ where: { mobilityRecordId: { in: ids } } });
  }
  ensureRole(ctx, ['ADMIN']);
  return prisma.deadline.findMany();
}

export async function getExceptionSummary(ctx: DemoContext) {
  if (ctx.role === 'STUDENT') {
    return prisma.exceptionRequest.findMany({ where: { requestedById: ctx.userId } });
  }
  if (ctx.role === 'COORDINATOR') {
    const ids = (await prisma.mobilityRecord.findMany({ where: { coordinatorId: ctx.userId }, select: { id: true } })).map((r) => r.id);
    return prisma.exceptionRequest.findMany({ where: { mobilityRecordId: { in: ids } } });
  }
  ensureRole(ctx, ['ADMIN']);
  return prisma.exceptionRequest.findMany();
}
