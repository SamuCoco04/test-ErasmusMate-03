import { prisma } from '@/src/lib/prisma';
import { createNotification } from '@/src/modules/notifications/notifications';
import { DemoContext } from '@/src/modules/shared/demo-context';

export type DeadlineState = 'UPCOMING' | 'OVERDUE' | 'FULFILLED' | 'OVERRIDDEN';
export type DeadlineBucket = 'OVERDUE' | 'DUE_SOON' | 'THIS_MONTH' | 'LATER';

export type ReminderRule = 'DEADLINE_OVERDUE' | 'DEADLINE_DUE_SOON' | null;

export type DeadlineReadModel = {
  id: string;
  mobilityRecordId: string;
  mobilityStudentName?: string;
  title: string;
  dueDate: Date;
  overrideDueDate: Date | null;
  effectiveDueDate: Date;
  state: string;
  effectiveState: DeadlineState;
  fulfilledAt: Date | null;
  relatedProcedureTitle: string | null;
  hasActiveExceptionRequest: boolean;
  activeExceptionStates: string[];
  reminderLabel: 'Overdue' | 'Due soon' | 'Completed' | 'Extended' | 'Upcoming';
};

export function computeEffectiveDeadlineState(deadline: { state: string; dueDate: Date; overrideDueDate: Date | null; fulfilledAt: Date | null }, now = new Date()): DeadlineState {
  if (deadline.fulfilledAt || deadline.state === 'FULFILLED') return 'FULFILLED';
  const effectiveDueDate = deadline.overrideDueDate ?? deadline.dueDate;
  if (effectiveDueDate.getTime() < now.getTime()) return 'OVERDUE';
  return deadline.overrideDueDate ? 'OVERRIDDEN' : 'UPCOMING';
}

export function classifyDeadlineReminderRule(deadline: { effectiveDueDate: Date; effectiveState: DeadlineState }, now = new Date(), dueSoonWindowDays = 7): ReminderRule {
  if (deadline.effectiveState === 'FULFILLED') return null;
  if (deadline.effectiveState === 'OVERDUE') return 'DEADLINE_OVERDUE';
  const diffDays = (deadline.effectiveDueDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
  return diffDays >= 0 && diffDays <= dueSoonWindowDays ? 'DEADLINE_DUE_SOON' : null;
}

function ensureRole(ctx: DemoContext, allowed: Array<DemoContext['role']>) { if (!allowed.includes(ctx.role)) throw new Error('FORBIDDEN'); }

type RawDeadline = Awaited<ReturnType<typeof prisma.deadline.findFirst>> & { relatedProcedure?: { title: string } | null; exceptionRequests?: Array<{ state: string }>; mobilityRecord?: { student?: { displayName: string } | null } | null };

function toReminderLabel(d: { effectiveState: DeadlineState; overrideDueDate: Date | null; effectiveDueDate: Date }, now = new Date(), dueSoonWindowDays = 7): DeadlineReadModel['reminderLabel'] {
  if (d.effectiveState === 'FULFILLED') return 'Completed';
  if (d.effectiveState === 'OVERDUE') return 'Overdue';
  if (d.overrideDueDate) return 'Extended';
  return classifyDeadlineReminderRule({ effectiveDueDate: d.effectiveDueDate, effectiveState: d.effectiveState }, now, dueSoonWindowDays) === 'DEADLINE_DUE_SOON' ? 'Due soon' : 'Upcoming';
}

function toReadModel(d: RawDeadline & { id: string; mobilityRecordId: string; title: string; dueDate: Date; overrideDueDate: Date | null; state: string; fulfilledAt: Date | null }, now = new Date()): DeadlineReadModel {
  const activeExceptionStates = (d.exceptionRequests ?? []).filter((e) => ['PENDING', 'IN_REVIEW', 'APPROVED'].includes(e.state)).map((e) => e.state);
  const effectiveDueDate = d.overrideDueDate ?? d.dueDate;
  const effectiveState = computeEffectiveDeadlineState(d, now);
  return {
    id: d.id, mobilityRecordId: d.mobilityRecordId, mobilityStudentName: d.mobilityRecord?.student?.displayName, title: d.title,
    dueDate: d.dueDate, overrideDueDate: d.overrideDueDate, effectiveDueDate,
    state: d.state, effectiveState, fulfilledAt: d.fulfilledAt,
    relatedProcedureTitle: d.relatedProcedure?.title ?? null, hasActiveExceptionRequest: activeExceptionStates.length > 0, activeExceptionStates,
    reminderLabel: toReminderLabel({ effectiveState, overrideDueDate: d.overrideDueDate, effectiveDueDate }, now),
  };
}

export function computeDeadlineBucket(deadline: { effectiveDueDate: Date; effectiveState: DeadlineState }, now = new Date()): DeadlineBucket {
  if (deadline.effectiveState === 'OVERDUE') return 'OVERDUE';
  const endOfWeek = new Date(now); endOfWeek.setUTCDate(endOfWeek.getUTCDate() + 7);
  const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59));
  if (deadline.effectiveDueDate <= endOfWeek) return 'DUE_SOON';
  if (deadline.effectiveDueDate <= endOfMonth) return 'THIS_MONTH';
  return 'LATER';
}

export async function listDeadlinesForStudent(ctx: DemoContext) { /* unchanged */
  ensureRole(ctx, ['STUDENT']);
  const record = await prisma.mobilityRecord.findFirst({ where: { studentId: ctx.userId } });
  if (!record) return [];
  const deadlines = await prisma.deadline.findMany({ where: { mobilityRecordId: record.id }, include: { relatedProcedure: true, exceptionRequests: true }, orderBy: [{ overrideDueDate: 'asc' }, { dueDate: 'asc' }] });
  return deadlines.map((d) => toReadModel(d));
}
export async function listDeadlinesForCoordinator(ctx: DemoContext) {
  ensureRole(ctx, ['COORDINATOR']);
  const ids = (await prisma.mobilityRecord.findMany({ where: { coordinatorId: ctx.userId }, select: { id: true } })).map((r) => r.id);
  const deadlines = await prisma.deadline.findMany({ where: { mobilityRecordId: { in: ids } }, include: { mobilityRecord: { include: { student: true } }, relatedProcedure: true, exceptionRequests: true }, orderBy: [{ overrideDueDate: 'asc' }, { dueDate: 'asc' }] });
  return deadlines.map((d) => toReadModel(d));
}
export async function listDeadlinesForContext(ctx: DemoContext) { if (ctx.role === 'STUDENT') return listDeadlinesForStudent(ctx); if (ctx.role === 'COORDINATOR') return listDeadlinesForCoordinator(ctx); throw new Error('FORBIDDEN'); }
export async function getDeadlineSummary(ctx: DemoContext) { const deadlines: DeadlineReadModel[] = ctx.role === 'STUDENT' ? await listDeadlinesForStudent(ctx) : ctx.role === 'COORDINATOR' ? await listDeadlinesForCoordinator(ctx) : (await prisma.deadline.findMany({ include: { relatedProcedure: true, exceptionRequests: true } })).map((d) => toReadModel(d as any)); return { counts: { upcoming: deadlines.filter((d) => d.effectiveState === 'UPCOMING').length, overdue: deadlines.filter((d) => d.effectiveState === 'OVERDUE').length, fulfilled: deadlines.filter((d) => d.effectiveState === 'FULFILLED').length, overridden: deadlines.filter((d) => d.effectiveState === 'OVERRIDDEN').length }, items: deadlines }; }

export async function generateDeadlineReminders(now = new Date(), dueSoonWindowDays = 7) {
  const deadlines = await prisma.deadline.findMany({ include: { mobilityRecord: true } });
  let createdCount = 0;
  for (const d of deadlines) {
    const effectiveDueDate = d.overrideDueDate ?? d.dueDate;
    const effectiveState = computeEffectiveDeadlineState(d, now);
    const rule = classifyDeadlineReminderRule({ effectiveDueDate, effectiveState }, now, dueSoonWindowDays);
    if (!rule) continue;
    const existing = await prisma.notification.findFirst({ where: { recipientUserId: d.mobilityRecord.studentId, type: rule, entityType: 'Deadline', entityId: d.id } });
    if (existing) continue;
    await createNotification({ recipientUserId: d.mobilityRecord.studentId, area: 'INSTITUTIONAL', type: rule, title: rule === 'DEADLINE_OVERDUE' ? 'Deadline overdue' : 'Deadline coming soon', body: `${d.title} is due on ${effectiveDueDate.toISOString().slice(0, 10)}.`, entityType: 'Deadline', entityId: d.id });
    createdCount += 1;
  }
  return { createdCount };
}

export async function applyDeadlineOverride(actorId: string, deadlineId: string, overrideDueDate: Date, reason: string) { const deadline = await prisma.deadline.findUnique({ where: { id: deadlineId } }); if (!deadline) throw new Error('NOT_FOUND'); const beforeState = computeEffectiveDeadlineState(deadline); const updated = await prisma.deadline.update({ where: { id: deadlineId }, data: { overrideDueDate, state: 'OVERRIDDEN' } }); await prisma.auditRecord.create({ data: { id: `audit-${crypto.randomUUID()}`, mobilityRecordId: deadline.mobilityRecordId, actorId, eventType: 'DEADLINE_OVERRIDE_APPLIED', details: JSON.stringify({ targetType: 'Deadline', targetId: deadlineId, priorState: beforeState, newState: computeEffectiveDeadlineState(updated), reason, overrideDueDate }) } }); return updated; }
export async function markDeadlineFulfilled(actorId: string, submissionId: string) { const submission = await prisma.documentSubmission.findUnique({ where: { id: submissionId } }); if (!submission) return null; const deadline = await prisma.deadline.findFirst({ where: { mobilityRecordId: submission.mobilityRecordId, relatedProcedureId: submission.procedureId } }); if (!deadline) return null; const updated = await prisma.deadline.update({ where: { id: deadline.id }, data: { fulfilledAt: new Date(), state: 'FULFILLED' } }); await prisma.auditRecord.create({ data: { id: `audit-${crypto.randomUUID()}`, mobilityRecordId: deadline.mobilityRecordId, actorId, eventType: 'DEADLINE_FULFILLED', details: JSON.stringify({ targetType: 'Deadline', targetId: deadline.id, priorState: deadline.state, newState: 'FULFILLED', sourceSubmissionId: submissionId }) } }); return updated; }
