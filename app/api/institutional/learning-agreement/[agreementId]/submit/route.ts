import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { submitAgreement } from '@/src/modules/institutional/learning-agreement';
export async function POST(_:Request,{params}:{params:Promise<{agreementId:string}>}){ const {agreementId}=await params; const ctx=await getDemoContextFromRequest(); const data=await submitAgreement(ctx,agreementId); return Response.json({data}); }
