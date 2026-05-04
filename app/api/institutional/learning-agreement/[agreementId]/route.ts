import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getLearningAgreementDetail } from '@/src/modules/institutional/learning-agreement';
export async function GET(_:Request,{params}:{params:Promise<{agreementId:string}>}){ const {agreementId}=await params; const ctx=await getDemoContextFromRequest(); const data=await getLearningAgreementDetail(ctx,agreementId); return Response.json({data}); }
