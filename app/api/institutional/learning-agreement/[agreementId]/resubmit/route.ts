import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { resubmitAgreement } from '@/src/modules/institutional/learning-agreement';
export async function POST(_:Request,{params}:{params:Promise<{agreementId:string}>}){ const {agreementId}=await params; const ctx=await getDemoContextFromRequest(); const data=await resubmitAgreement(ctx,agreementId); return Response.json({data}); }
