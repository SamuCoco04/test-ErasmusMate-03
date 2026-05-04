import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getLearningAgreementReviewQueue } from '@/src/modules/institutional/learning-agreement';
export async function GET(){ const ctx=await getDemoContextFromRequest(); const data=await getLearningAgreementReviewQueue(ctx); return Response.json({data}); }
