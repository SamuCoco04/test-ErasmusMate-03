import { prisma } from '@/src/lib/prisma';
import { DemoContext } from '@/src/modules/shared/demo-context';

export type DeadlineState = 'UPCOMING'|'OVERDUE'|'FULFILLED'|'OVERRIDDEN';

export function computeEffectiveDeadlineState(deadline:{state:string;dueDate:Date;overrideDueDate:Date|null;fulfilledAt:Date|null}, now = new Date()): DeadlineState {
  if (deadline.fulfilledAt || deadline.state === 'FULFILLED') return 'FULFILLED';
  const effectiveDueDate = deadline.overrideDueDate ?? deadline.dueDate;
  if (effectiveDueDate.getTime() < now.getTime()) return 'OVERDUE';
  return deadline.overrideDueDate ? 'OVERRIDDEN' : 'UPCOMING';
}

function ensureRole(ctx: DemoContext, allowed: Array<DemoContext['role']>) { if (!allowed.includes(ctx.role)) throw new Error('FORBIDDEN'); }

export async function listDeadlinesForStudent(ctx: DemoContext) {
  ensureRole(ctx, ['STUDENT']);
  const record = await prisma.mobilityRecord.findFirst({ where: { studentId: ctx.userId } });
  if (!record) return [];
  const deadlines = await prisma.deadline.findMany({ where: { mobilityRecordId: record.id }, include: { relatedProcedure: true }, orderBy: { dueDate: 'asc' } });
  return deadlines.map((d) => ({ ...d, effectiveState: computeEffectiveDeadlineState(d), effectiveDueDate: d.overrideDueDate ?? d.dueDate }));
}

export async function listDeadlinesForCoordinator(ctx: DemoContext) {
  ensureRole(ctx, ['COORDINATOR']);
  const ids = (await prisma.mobilityRecord.findMany({ where: { coordinatorId: ctx.userId }, select: { id: true } })).map((r) => r.id);
  const deadlines = await prisma.deadline.findMany({ where: { mobilityRecordId: { in: ids } }, include: { mobilityRecord: true, relatedProcedure: true }, orderBy: { dueDate: 'asc' } });
  return deadlines.map((d) => ({ ...d, effectiveState: computeEffectiveDeadlineState(d), effectiveDueDate: d.overrideDueDate ?? d.dueDate }));
}

export async function getDeadlineSummary(ctx: DemoContext) {
  const deadlines = ctx.role === 'STUDENT' ? await listDeadlinesForStudent(ctx) : ctx.role === 'COORDINATOR' ? await listDeadlinesForCoordinator(ctx) : await prisma.deadline.findMany({ include: { relatedProcedure: true } });
  const normalized = deadlines.map((d:any) => ({ ...d, effectiveState: d.effectiveState ?? computeEffectiveDeadlineState(d) }));
  return {
    counts: {
      upcoming: normalized.filter((d) => d.effectiveState === 'UPCOMING').length,
      overdue: normalized.filter((d) => d.effectiveState === 'OVERDUE').length,
      fulfilled: normalized.filter((d) => d.effectiveState === 'FULFILLED').length,
      overridden: normalized.filter((d) => d.effectiveState === 'OVERRIDDEN').length,
    },
    items: normalized,
  };
}

export async function applyDeadlineOverride(actorId: string, deadlineId: string, overrideDueDate: Date, reason: string) {
  const deadline = await prisma.deadline.findUnique({ where: { id: deadlineId } });
  if (!deadline) throw new Error('NOT_FOUND');
  const beforeState = computeEffectiveDeadlineState(deadline);
  const updated = await prisma.deadline.update({ where: { id: deadlineId }, data: { overrideDueDate, state: 'OVERRIDDEN' } });
  await prisma.auditRecord.create({ data: { id: `audit-${crypto.randomUUID()}`, mobilityRecordId: deadline.mobilityRecordId, actorId, eventType: 'DEADLINE_OVERRIDE_APPLIED', details: JSON.stringify({ targetType: 'Deadline', targetId: deadlineId, priorState: beforeState, newState: computeEffectiveDeadlineState(updated), reason, overrideDueDate }) } });
  return updated;
}

export async function markDeadlineFulfilled(actorId: string, submissionId: string) {
  const submission = await prisma.documentSubmission.findUnique({ where: { id: submissionId } });
  if (!submission) return null;
  const deadline = await prisma.deadline.findFirst({ where: { mobilityRecordId: submission.mobilityRecordId, relatedProcedureId: submission.procedureId } });
  if (!deadline) return null;
  const updated = await prisma.deadline.update({ where: { id: deadline.id }, data: { fulfilledAt: new Date(), state: 'FULFILLED' } });
  await prisma.auditRecord.create({ data: { id: `audit-${crypto.randomUUID()}`, mobilityRecordId: deadline.mobilityRecordId, actorId, eventType: 'DEADLINE_FULFILLED', details: JSON.stringify({ targetType: 'Deadline', targetId: deadline.id, priorState: deadline.state, newState: 'FULFILLED', sourceSubmissionId: submissionId }) } });
  return updated;
}
