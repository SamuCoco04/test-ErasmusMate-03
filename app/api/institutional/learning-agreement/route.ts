import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { createOrGetDraftAgreement, getLearningAgreementForCoordinator, getLearningAgreementForStudent } from '@/src/modules/institutional/learning-agreement';

export async function GET(){ const ctx=await getDemoContextFromRequest(); const data=ctx.role==='STUDENT'?await getLearningAgreementForStudent(ctx):await getLearningAgreementForCoordinator(ctx); return Response.json({data}); }
export async function POST(){ const ctx=await getDemoContextFromRequest(); const data=await createOrGetDraftAgreement(ctx); return Response.json({data}); }
