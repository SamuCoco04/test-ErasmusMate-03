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
  const records = await prisma.mobilityRecord.findMany({ where: { coordinatorId: ctx.userId } });
  const ids = records.map((r) => r.id);
  return {
    assignedCount: records.length,
    reviewQueue: await prisma.documentSubmission.findMany({ where: { mobilityRecordId: { in: ids }, state: 'SUBMITTED' }, include: { procedure: true }, take: 5 }),
    deadlines: await prisma.deadline.findMany({ where: { mobilityRecordId: { in: ids } } }),
    exceptions: await prisma.exceptionRequest.findMany({ where: { mobilityRecordId: { in: ids }, state: { in: ['PENDING', 'UNDER_REVIEW'] } }, take: 5 }),
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
