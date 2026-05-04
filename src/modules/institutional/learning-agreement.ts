import { prisma } from '@/src/lib/prisma';
import { DemoContext } from '@/src/modules/shared/demo-context';

export type AgreementState = 'DRAFT'|'SUBMITTED'|'IN_REVIEW'|'PARTIALLY_APPROVED'|'CHANGES_REQUESTED'|'ACCEPTED';
export type RowStatus = 'IN_REVIEW'|'APPROVED'|'DENIED';

export class LearningAgreementError extends Error { constructor(public code:string,message:string){super(message);} }

const STUDENT = ['STUDENT'] as const;
const COORDINATOR = ['COORDINATOR'] as const;

function requireRole(ctx:DemoContext, roles:readonly DemoContext['role'][]){ if(!roles.includes(ctx.role)) throw new LearningAgreementError('FORBIDDEN','Forbidden'); }

async function assertStudentAgreement(agreementId:string, studentId:string){
  const agreement = await prisma.learningAgreement.findUnique({where:{id:agreementId},include:{mobilityRecord:true}});
  if(!agreement) throw new LearningAgreementError('NOT_FOUND','Learning agreement not found');
  if(agreement.studentId!==studentId) throw new LearningAgreementError('FORBIDDEN','Forbidden');
  return agreement;
}
async function assertCoordinatorAgreement(agreementId:string, coordinatorId:string){
  const agreement = await prisma.learningAgreement.findUnique({where:{id:agreementId}});
  if(!agreement) throw new LearningAgreementError('NOT_FOUND','Learning agreement not found');
  if(agreement.coordinatorId!==coordinatorId) throw new LearningAgreementError('FORBIDDEN','Forbidden');
  return agreement;
}

async function writeEvent(agreementId:string, actorId:string, actionType:string, fromState?:string|null, toState?:string|null, rowId?:string|null, note?:string|null){
  await prisma.learningAgreementEvent.create({data:{id:`laevt-${crypto.randomUUID()}`,agreementId,actorId,actionType,fromState:fromState??null,toState:toState??null,rowId:rowId??null,noteOrRationale:note??null}});
}

function validateRowFields(input:{homeCourseCode:string;homeCourseName:string;destinationCourseCode:string;destinationCourseName:string;ects:number;semester:string}){
  if(!input.homeCourseCode.trim()||!input.homeCourseName.trim()||!input.destinationCourseCode.trim()||!input.destinationCourseName.trim()||!input.semester.trim()) throw new LearningAgreementError('VALIDATION','Required fields are missing');
  if(input.ects<=0) throw new LearningAgreementError('VALIDATION','ECTS must be greater than 0');
}

async function ensureNoDuplicate(agreementId:string,rowKey:string,payload:{homeCourseCode:string;destinationCourseCode:string},excludeRowId?:string){
  const dup = await prisma.learningAgreementRow.findFirst({where:{agreementId,isLatest:true,NOT:excludeRowId?{id:excludeRowId}:undefined,homeCourseCode:payload.homeCourseCode,destinationCourseCode:payload.destinationCourseCode}});
  if(dup) throw new LearningAgreementError('CONFLICT','Duplicate equivalence is not allowed');
  const rowKeyDup = await prisma.learningAgreementRow.findFirst({where:{agreementId,isLatest:true,NOT:excludeRowId?{id:excludeRowId}:undefined,rowKey}});
  if(rowKeyDup) throw new LearningAgreementError('CONFLICT','Row key already exists');
}

export async function createOrGetDraftAgreement(ctx:DemoContext){
  requireRole(ctx, STUDENT);
  const mr = await prisma.mobilityRecord.findFirst({where:{studentId:ctx.userId}});
  if(!mr) throw new LearningAgreementError('NOT_FOUND','Mobility record not found');
  const found = await prisma.learningAgreement.findUnique({where:{mobilityRecordId:mr.id}});
  if(found) return found;
  const created = await prisma.learningAgreement.create({data:{id:`la-${crypto.randomUUID()}`,mobilityRecordId:mr.id,studentId:ctx.userId,coordinatorId:mr.coordinatorId,state:'DRAFT',version:1}});
  await writeEvent(created.id,ctx.userId,'create_agreement',null,'DRAFT');
  return created;
}

export async function addAgreementRow(ctx:DemoContext, agreementId:string, payload:{homeCourseCode:string;homeCourseName:string;destinationCourseCode:string;destinationCourseName:string;ects:number;semester:string;grade?:string|null}){
  requireRole(ctx, STUDENT);
  if(payload.grade) throw new LearningAgreementError('FORBIDDEN','Student cannot set grade');
  await assertStudentAgreement(agreementId,ctx.userId);
  validateRowFields(payload);
  const rowKey = `row-${crypto.randomUUID()}`;
  await ensureNoDuplicate(agreementId,rowKey,payload);
  const row = await prisma.learningAgreementRow.create({data:{id:`lar-${crypto.randomUUID()}`,agreementId,rowKey,revision:1,isLatest:true,supersedesRowId:null,homeCourseCode:payload.homeCourseCode,homeCourseName:payload.homeCourseName,destinationCourseCode:payload.destinationCourseCode,destinationCourseName:payload.destinationCourseName,ects:payload.ects,semester:payload.semester,status:'IN_REVIEW',createdById:ctx.userId}});
  await writeEvent(agreementId,ctx.userId,'add_row',null,'IN_REVIEW',row.id);
  return row;
}

export async function updateAgreementRow(ctx:DemoContext, agreementId:string,rowId:string,payload:{homeCourseCode:string;homeCourseName:string;destinationCourseCode:string;destinationCourseName:string;ects:number;semester:string;grade?:string|null}){
  requireRole(ctx, STUDENT);
  if(payload.grade!==undefined) throw new LearningAgreementError('FORBIDDEN','Student cannot set grade');
  await assertStudentAgreement(agreementId,ctx.userId);
  const row = await prisma.learningAgreementRow.findUnique({where:{id:rowId}});
  if(!row||row.agreementId!==agreementId) throw new LearningAgreementError('NOT_FOUND','Row not found');
  if(!row.isLatest) throw new LearningAgreementError('VALIDATION','Only latest rows can be edited');
  validateRowFields(payload);
  await ensureNoDuplicate(agreementId,row.rowKey,payload,row.id);
  await prisma.learningAgreementRow.update({where:{id:row.id},data:{isLatest:false}});
  const newRow = await prisma.learningAgreementRow.create({data:{id:`lar-${crypto.randomUUID()}`,agreementId,rowKey:row.rowKey,revision:row.revision+1,isLatest:true,supersedesRowId:row.id,homeCourseCode:payload.homeCourseCode,homeCourseName:payload.homeCourseName,destinationCourseCode:payload.destinationCourseCode,destinationCourseName:payload.destinationCourseName,ects:payload.ects,semester:payload.semester,status:'IN_REVIEW',createdById:ctx.userId}});
  await writeEvent(agreementId,ctx.userId,'revise_row',row.status,'IN_REVIEW',newRow.id);
  await recomputeAgreementState(ctx, agreementId);
  return newRow;
}

async function assertSubmittable(agreementId:string){
  const latestRows = await prisma.learningAgreementRow.findMany({where:{agreementId,isLatest:true}});
  if(latestRows.length===0) throw new LearningAgreementError('VALIDATION','Agreement needs at least one row');
  for(const r of latestRows){
    if(!r.homeCourseCode || !r.homeCourseName || !r.destinationCourseCode || !r.destinationCourseName || !r.semester || r.ects<=0) throw new LearningAgreementError('VALIDATION','Agreement has incomplete rows');
  }
}

export async function submitAgreement(ctx:DemoContext, agreementId:string){
  requireRole(ctx, STUDENT);
  const agreement = await assertStudentAgreement(agreementId,ctx.userId);
  if(agreement.state!=='DRAFT') throw new LearningAgreementError('INVALID_TRANSITION','Agreement is not in draft');
  await assertSubmittable(agreementId);
  const updated= await prisma.learningAgreement.update({where:{id:agreementId},data:{state:'SUBMITTED',submittedAt:new Date(),version:{increment:1}}});
  await writeEvent(agreementId,ctx.userId,'submit_agreement','DRAFT','SUBMITTED');
  return updated;
}

export async function resubmitAgreement(ctx:DemoContext, agreementId:string){
  requireRole(ctx, STUDENT);
  const agreement = await assertStudentAgreement(agreementId,ctx.userId);
  if(!['PARTIALLY_APPROVED','CHANGES_REQUESTED'].includes(agreement.state)) throw new LearningAgreementError('INVALID_TRANSITION','Agreement is not ready for resubmission');
  const deniedLatest = await prisma.learningAgreementRow.findMany({where:{agreementId,isLatest:true,status:'DENIED'}});
  if(deniedLatest.length>0) throw new LearningAgreementError('VALIDATION','Denied rows must be revised before resubmission');
  await assertSubmittable(agreementId);
  const updated = await prisma.learningAgreement.update({where:{id:agreementId},data:{state:'SUBMITTED',submittedAt:new Date(),version:{increment:1}}});
  await writeEvent(agreementId,ctx.userId,'resubmit_agreement',agreement.state,'SUBMITTED');
  return updated;
}

export async function decideAgreementRow(ctx:DemoContext, agreementId:string,rowId:string,decision:'APPROVED'|'DENIED',rationale?:string){
  requireRole(ctx, COORDINATOR);
  const agreement = await assertCoordinatorAgreement(agreementId,ctx.userId);
  if(!['IN_REVIEW','SUBMITTED','PARTIALLY_APPROVED','CHANGES_REQUESTED'].includes(agreement.state)) throw new LearningAgreementError('INVALID_TRANSITION','Agreement is not in review state');
  const row = await prisma.learningAgreementRow.findUnique({where:{id:rowId}});
  if(!row||row.agreementId!==agreementId) throw new LearningAgreementError('NOT_FOUND','Row not found');
  if(!row.isLatest || row.status!=='IN_REVIEW') throw new LearningAgreementError('INVALID_TRANSITION','Row cannot be decided');
  if(decision==='DENIED' && !rationale?.trim()) throw new LearningAgreementError('VALIDATION','Rationale is required for denied rows');
  await prisma.learningAgreementRow.update({where:{id:rowId},data:{status:decision,decisionRationale:decision==='DENIED'?rationale!:null,reviewedById:ctx.userId,reviewedAt:new Date()}});
  await writeEvent(agreementId,ctx.userId,decision==='APPROVED'?'approve_row':'deny_row','IN_REVIEW',decision,rowId,rationale??null);
  await recomputeAgreementState(ctx,agreementId);
}

export async function recomputeAgreementState(ctx:DemoContext, agreementId:string){
  if(ctx.role==='COORDINATOR') await assertCoordinatorAgreement(agreementId,ctx.userId);
  const rows = await prisma.learningAgreementRow.findMany({where:{agreementId,isLatest:true}});
  let next:AgreementState='IN_REVIEW';
  const approved = rows.filter(r=>r.status==='APPROVED').length;
  const denied = rows.filter(r=>r.status==='DENIED').length;
  if(rows.length>0 && approved===rows.length) next='ACCEPTED';
  else if(approved>0 && denied>0) next='PARTIALLY_APPROVED';
  else if(denied>0) next='CHANGES_REQUESTED';
  const current = await prisma.learningAgreement.findUniqueOrThrow({where:{id:agreementId}});
  await prisma.learningAgreement.update({where:{id:agreementId},data:{state:next,lastReviewedAt:new Date()}});
  await writeEvent(agreementId,ctx.userId,'recompute_state',current.state,next);
  return next;
}

export async function getLearningAgreementForStudent(ctx:DemoContext){ requireRole(ctx,STUDENT); return prisma.learningAgreement.findMany({where:{studentId:ctx.userId},orderBy:{updatedAt:'desc'}}); }
export async function getLearningAgreementForCoordinator(ctx:DemoContext){ requireRole(ctx,COORDINATOR); return prisma.learningAgreement.findMany({where:{coordinatorId:ctx.userId},orderBy:{updatedAt:'desc'}}); }
export async function getLearningAgreementReviewQueue(ctx:DemoContext){ requireRole(ctx,COORDINATOR); return prisma.learningAgreement.findMany({where:{coordinatorId:ctx.userId,state:{in:['SUBMITTED','IN_REVIEW','PARTIALLY_APPROVED','CHANGES_REQUESTED']}},include:{mobilityRecord:true},orderBy:{updatedAt:'desc'}}); }
export async function getLearningAgreementDetail(ctx:DemoContext,agreementId:string){
  requireRole(ctx, [...STUDENT, ...COORDINATOR]);
  if(ctx.role==='STUDENT') await assertStudentAgreement(agreementId,ctx.userId);
  else await assertCoordinatorAgreement(agreementId,ctx.userId);
  return prisma.learningAgreement.findUnique({where:{id:agreementId},include:{rows:{orderBy:[{rowKey:'asc'},{revision:'desc'}]},events:{orderBy:{createdAt:'desc'}}}});
}

export async function getAcademicSummaryForMobilityRecord(ctx:DemoContext,mobilityRecordId?:string){
  const mr = mobilityRecordId ? await prisma.mobilityRecord.findUnique({where:{id:mobilityRecordId}}) : await prisma.mobilityRecord.findFirst({where:ctx.role==='STUDENT'?{studentId:ctx.userId}:ctx.role==='COORDINATOR'?{coordinatorId:ctx.userId}:undefined});
  if(!mr) throw new LearningAgreementError('NOT_FOUND','Mobility record not found');
  if(ctx.role==='STUDENT'&&mr.studentId!==ctx.userId) throw new LearningAgreementError('FORBIDDEN','Forbidden');
  if(ctx.role==='COORDINATOR'&&mr.coordinatorId!==ctx.userId) throw new LearningAgreementError('FORBIDDEN','Forbidden');
  const rows = await prisma.learningAgreementRow.findMany({where:{agreement:{mobilityRecordId:mr.id},isLatest:true,status:'APPROVED'}});
  return {mobilityRecordId:mr.id,studentId:mr.studentId,homeInstitutionId:mr.homeInstitutionId,hostInstitutionId:mr.hostInstitutionId,totalEcts:rows.reduce((s,r)=>s+r.ects,0),rows};
}
