import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { addAgreementRow } from '@/src/modules/institutional/learning-agreement';
export async function POST(req:Request,{params}:{params:Promise<{agreementId:string}>}){ const {agreementId}=await params; const body=await req.json(); const ctx=await getDemoContextFromRequest(); const data=await addAgreementRow(ctx,agreementId,body); return Response.json({data}); }
