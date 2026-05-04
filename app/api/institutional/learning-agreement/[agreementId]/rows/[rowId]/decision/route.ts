import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { decideAgreementRow } from '@/src/modules/institutional/learning-agreement';
export async function POST(req:Request,{params}:{params:Promise<{agreementId:string;rowId:string}>}){ const {agreementId,rowId}=await params; const body=await req.json(); const ctx=await getDemoContextFromRequest(); await decideAgreementRow(ctx,agreementId,rowId,body.decision,body.rationale); return Response.json({ok:true}); }
