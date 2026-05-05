import { prisma } from '@/src/lib/prisma';
import { DemoContext } from '@/src/modules/shared/demo-context';
import { computeEffectiveDeadlineState, markDeadlineFulfilled } from './deadlines';
import { createNotification } from '@/src/modules/notifications/notifications';

export type SubmissionState = 'DRAFT'|'SUBMITTED'|'RESUBMITTED'|'IN_REVIEW'|'APPROVED'|'REJECTED'|'REOPENED'|'NEEDS_CORRECTION';
export type SubmissionAction = 'create_draft'|'submit'|'start_review'|'approve'|'reject'|'reopen'|'request_correction'|'resubmit';

export class SubmissionError extends Error { constructor(public code:string, message:string){super(message);} }

function requireRole(ctx: DemoContext, roles: DemoContext['role'][]) { if (!roles.includes(ctx.role)) throw new SubmissionError('FORBIDDEN','Forbidden'); }

async function assertOwnedByStudent(submissionId:string, studentId:string){
  const sub = await prisma.documentSubmission.findUnique({where:{id:submissionId},include:{mobilityRecord:true}});
  if(!sub) throw new SubmissionError('NOT_FOUND','Submission not found');
  if(sub.mobilityRecord.studentId!==studentId) throw new SubmissionError('FORBIDDEN','Forbidden');
  return sub;
}
async function assertCoordinatorAssigned(submissionId:string, coordinatorId:string){
  const sub = await prisma.documentSubmission.findUnique({where:{id:submissionId},include:{mobilityRecord:true}});
  if(!sub) throw new SubmissionError('NOT_FOUND','Submission not found');
  if(sub.mobilityRecord.coordinatorId!==coordinatorId) throw new SubmissionError('FORBIDDEN','Forbidden');
  return sub;
}


async function assertSubmissionWindowOpen(mobilityRecordId:string, procedureId:string){
  const deadline = await prisma.deadline.findFirst({ where: { mobilityRecordId, relatedProcedureId: procedureId } });
  if (!deadline) return;
  const effective = computeEffectiveDeadlineState(deadline);
  if (effective === 'OVERDUE') throw new SubmissionError('DEADLINE_BLOCKED', 'Submission is blocked because this requirement is overdue.');
}

async function writeAuditAndEvent(submissionId:string,mobilityRecordId:string, actorId:string, action:SubmissionAction, prior:string, next:string, rationale?:string){
  await prisma.documentSubmissionEvent.create({data:{id:`sevt-${crypto.randomUUID()}`,submissionId,actorId,actionType:action,priorState:prior,newState:next,rationale:rationale??null}});
  await prisma.auditRecord.create({data:{id:`audit-${crypto.randomUUID()}`,mobilityRecordId,actorId,eventType:`SUBMISSION_${action.toUpperCase()}`,
    details:JSON.stringify({targetType:'DocumentSubmission',targetId:submissionId,priorState:prior,newState:next,rationale:rationale??null})}});
}

export async function listSubmissionsForStudent(ctx:DemoContext){
  requireRole(ctx,['STUDENT']);
  return prisma.documentSubmission.findMany({where:{mobilityRecord:{studentId:ctx.userId}},include:{procedure:true},orderBy:{createdAt:'desc'}});
}

export async function listReviewQueueForCoordinator(ctx:DemoContext){
  requireRole(ctx,['COORDINATOR']);
  return prisma.documentSubmission.findMany({where:{mobilityRecord:{coordinatorId:ctx.userId},state:{in:['SUBMITTED','RESUBMITTED','IN_REVIEW','APPROVED','REJECTED','REOPENED','NEEDS_CORRECTION']}},include:{procedure:true,mobilityRecord:true},orderBy:{updatedAt:'desc'}});
}

export async function getSubmissionDetail(ctx:DemoContext, submissionId:string){
  if(ctx.role==='STUDENT') await assertOwnedByStudent(submissionId,ctx.userId);
  else if(ctx.role==='COORDINATOR') await assertCoordinatorAssigned(submissionId,ctx.userId);
  else requireRole(ctx,['ADMIN']);
  return prisma.documentSubmission.findUnique({where:{id:submissionId},include:{procedure:true,mobilityRecord:true}});
}

export async function createDraftSubmission(ctx:DemoContext, procedureId:string){
  requireRole(ctx,['STUDENT']);
  const mr = await prisma.mobilityRecord.findFirst({where:{studentId:ctx.userId}});
  if(!mr) throw new SubmissionError('NOT_FOUND','Mobility record not found');
  const sub = await prisma.documentSubmission.create({data:{id:`sub-${crypto.randomUUID()}`,mobilityRecordId:mr.id,procedureId,state:'DRAFT'}});
  await writeAuditAndEvent(sub.id,mr.id,ctx.userId,'create_draft','NONE','DRAFT');
  return sub;
}

export async function transitionSubmission(ctx:DemoContext, submissionId:string, action:SubmissionAction, rationale?:string){
  if (ctx.role !== 'STUDENT' && ctx.role !== 'COORDINATOR') throw new SubmissionError('FORBIDDEN', 'Forbidden');
  const isStudent = ctx.role==='STUDENT';
  const sub = isStudent ? await assertOwnedByStudent(submissionId,ctx.userId) : await assertCoordinatorAssigned(submissionId,ctx.userId);
  const nextByAction: Record<SubmissionAction, SubmissionState> = {create_draft:'DRAFT', submit:'SUBMITTED', start_review:'IN_REVIEW', approve:'APPROVED', reject:'REJECTED', reopen:'REOPENED', request_correction:'NEEDS_CORRECTION', resubmit:'RESUBMITTED'};
  const state = sub.state as SubmissionState;
  const allowed: Record<SubmissionAction, SubmissionState[]> = {
    create_draft:[], submit:['DRAFT'], start_review:['SUBMITTED','RESUBMITTED'], approve:['IN_REVIEW'], reject:['IN_REVIEW'], reopen:['APPROVED','REJECTED'], request_correction:['IN_REVIEW'], resubmit:['REJECTED','REOPENED','NEEDS_CORRECTION']
  };
  if((isStudent && !['submit','resubmit'].includes(action)) || (!isStudent && !['start_review','approve','reject','reopen','request_correction'].includes(action))) throw new SubmissionError('FORBIDDEN','Forbidden');
  if(!allowed[action].includes(state)) throw new SubmissionError('INVALID_TRANSITION','Invalid state transition');
  if((action==='reject'||action==='reopen'||action==='request_correction') && !rationale?.trim()) throw new SubmissionError('VALIDATION','Rationale is required');
  if (action === 'submit' || action === 'resubmit') {
    const activeAttachment = await prisma.documentAttachment.findFirst({ where: { submissionId, status: 'ACTIVE' } });
    if (!activeAttachment) throw new SubmissionError('VALIDATION', 'At least one active attachment is required');
  }
  const nextState = nextByAction[action];
  if (action === 'submit') await assertSubmissionWindowOpen(sub.mobilityRecordId, sub.procedureId);
  const canWriteReviewerNotes = !isStudent && ['start_review','approve','reject','reopen'].includes(action);
  const updated = await prisma.documentSubmission.update({where:{id:submissionId},data:{state:nextState,submittedAt:action==='submit'||action==='resubmit'?new Date():sub.submittedAt,reviewedAt:['approve','reject','reopen'].includes(action)?new Date():sub.reviewedAt,reviewerNotes:canWriteReviewerNotes?(rationale??sub.reviewerNotes):sub.reviewerNotes,reopeningRationale:action==='reopen'?(rationale??null):sub.reopeningRationale}});
  await writeAuditAndEvent(sub.id,sub.mobilityRecordId,ctx.userId,action,state,nextState,rationale);
  if (action === 'approve') await markDeadlineFulfilled(ctx.userId, sub.id);
  const mr = await prisma.mobilityRecord.findUnique({ where: { id: sub.mobilityRecordId } });
  if (mr) {
    if (['submit', 'resubmit'].includes(action)) {
      await createNotification({ recipientUserId: mr.coordinatorId, actorUserId: ctx.userId, area: 'INSTITUTIONAL', type: 'SUBMISSION_REVIEW_NEEDED', title: 'Submission needs review', body: 'A student submission is ready for coordinator review.', entityType: 'SUBMISSION', entityId: sub.id });
    }
    if (['approve','reject','reopen','start_review'].includes(action)) {
      await createNotification({ recipientUserId: mr.studentId, actorUserId: ctx.userId, area: 'INSTITUTIONAL', type: `SUBMISSION_${action.toUpperCase()}`, title: 'Submission updated', body: `Your submission is now ${nextState}.`, entityType: 'SUBMISSION', entityId: sub.id });
    }
  }
  return updated;
}
