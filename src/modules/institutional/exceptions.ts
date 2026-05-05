import { prisma } from '@/src/lib/prisma';
import { DemoContext } from '@/src/modules/shared/demo-context';
import { applyDeadlineOverride } from './deadlines';
import { createNotification } from '@/src/modules/notifications/notifications';

export type ExceptionAction = 'start_review'|'approve'|'reject'|'apply'|'close';

export class ExceptionError extends Error { constructor(public code:string, msg:string){super(msg);} }

export async function listExceptions(ctx: DemoContext) {
  if (ctx.role === 'STUDENT') return prisma.exceptionRequest.findMany({ where: { requestedById: ctx.userId }, include: { deadline: true }, orderBy: { createdAt: 'desc' } });
  if (ctx.role === 'COORDINATOR') {
    const ids = (await prisma.mobilityRecord.findMany({ where: { coordinatorId: ctx.userId }, select: { id: true } })).map((x) => x.id);
    return prisma.exceptionRequest.findMany({ where: { mobilityRecordId: { in: ids } }, include: { deadline: true, requestedBy: true }, orderBy: { createdAt: 'desc' } });
  }
  return prisma.exceptionRequest.findMany({ include: { deadline: true, requestedBy: true }, orderBy: { createdAt: 'desc' } });
}

export async function createExceptionRequest(ctx: DemoContext, input: { title: string; reason: string; deadlineId: string }) {
  if (ctx.role !== 'STUDENT') throw new ExceptionError('FORBIDDEN', 'Forbidden');
  const deadline = await prisma.deadline.findUnique({ where: { id: input.deadlineId }, include: { mobilityRecord: true } });
  if (!deadline || deadline.mobilityRecord.studentId !== ctx.userId) throw new ExceptionError('FORBIDDEN', 'Forbidden');
  const created = await prisma.exceptionRequest.create({ data: { id: `exc-${crypto.randomUUID()}`, mobilityRecordId: deadline.mobilityRecordId, requestedById: ctx.userId, deadlineId: input.deadlineId, title: input.title, reason: input.reason, state: 'PENDING' } });
  await prisma.auditRecord.create({ data: { id: `audit-${crypto.randomUUID()}`, mobilityRecordId: created.mobilityRecordId, actorId: ctx.userId, eventType: 'EXCEPTION_CREATED', details: JSON.stringify({ targetType: 'ExceptionRequest', targetId: created.id, priorState: 'NONE', newState: 'PENDING' }) } });
  const mr = await prisma.mobilityRecord.findUnique({ where: { id: created.mobilityRecordId } });
  if (mr) await createNotification({ recipientUserId: mr.coordinatorId, actorUserId: ctx.userId, area: 'INSTITUTIONAL', type: 'EXCEPTION_REQUESTED', title: 'Exception request submitted', body: 'A student requested an exception review.', entityType: 'EXCEPTION', entityId: created.id });
  return created;
}

export async function transitionException(ctx: DemoContext, exceptionId: string, action: ExceptionAction, payload: { rationale?: string; overrideDueDate?: string }) {
  if (ctx.role !== 'COORDINATOR') throw new ExceptionError('FORBIDDEN', 'Forbidden');
  const exc = await prisma.exceptionRequest.findUnique({ where: { id: exceptionId }, include: { mobilityRecord: true } });
  if (!exc) throw new ExceptionError('NOT_FOUND', 'Not found');
  if (exc.mobilityRecord.coordinatorId !== ctx.userId) throw new ExceptionError('FORBIDDEN', 'Forbidden');
  const next: Record<ExceptionAction,string> = { start_review: 'IN_REVIEW', approve: 'APPROVED', reject: 'REJECTED', apply: 'APPLIED', close: 'CLOSED' };
  const allowed: Record<ExceptionAction,string[]> = { start_review: ['PENDING'], approve: ['PENDING','IN_REVIEW'], reject: ['PENDING','IN_REVIEW'], apply: ['APPROVED'], close: ['APPLIED','REJECTED'] };
  if (!allowed[action].includes(exc.state)) throw new ExceptionError('INVALID_TRANSITION', 'Invalid transition');
  if (action === 'reject' && !payload.rationale?.trim()) throw new ExceptionError('VALIDATION', 'Rationale is required');
  if (action === 'approve' && !payload.rationale?.trim()) throw new ExceptionError('VALIDATION', 'Rationale is required');
  const updated = await prisma.exceptionRequest.update({ where: { id: exc.id }, data: { state: next[action], reviewedById: ctx.userId, coordinatorRationale: payload.rationale ?? exc.coordinatorRationale } });
  if (action === 'apply') {
    if (!exc.deadlineId || !payload.overrideDueDate) throw new ExceptionError('VALIDATION', 'Apply requires deadline and extension date');
    await applyDeadlineOverride(ctx.userId, exc.deadlineId, new Date(payload.overrideDueDate), payload.rationale ?? 'Extension approved');
  }
  await prisma.auditRecord.create({ data: { id: `audit-${crypto.randomUUID()}`, mobilityRecordId: exc.mobilityRecordId, actorId: ctx.userId, eventType: `EXCEPTION_${action.toUpperCase()}`, details: JSON.stringify({ targetType: 'ExceptionRequest', targetId: exc.id, priorState: exc.state, newState: next[action], rationale: payload.rationale ?? null }) } });
  const mr = await prisma.mobilityRecord.findUnique({ where: { id: exc.mobilityRecordId } });
  if (mr && ['approve','apply','reject'].includes(action)) await createNotification({ recipientUserId: mr.studentId, actorUserId: ctx.userId, area: 'INSTITUTIONAL', type: `EXCEPTION_${action.toUpperCase()}`, title: 'Exception request updated', body: `Your exception request is now ${next[action]}.`, entityType: 'EXCEPTION', entityId: exc.id });
  return updated;
}
