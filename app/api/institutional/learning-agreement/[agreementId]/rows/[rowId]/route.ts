import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { updateAgreementRow } from '@/src/modules/institutional/learning-agreement';
export async function PATCH(req:Request,{params}:{params:Promise<{agreementId:string;rowId:string}>}){ const {agreementId,rowId}=await params; const body=await req.json(); const ctx=await getDemoContextFromRequest(); const data=await updateAgreementRow(ctx,agreementId,rowId,body); return Response.json({data}); }
