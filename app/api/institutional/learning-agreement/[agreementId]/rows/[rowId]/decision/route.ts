import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { decideAgreementRow } from '@/src/modules/institutional/learning-agreement';
const ALLOWED_DECISIONS = ['APPROVED', 'DENIED'] as const;

export async function POST(req:Request,{params}:{params:Promise<{agreementId:string;rowId:string}>}){
  const {agreementId,rowId}=await params;
  const body=await req.json();
  if(!ALLOWED_DECISIONS.includes(body?.decision)){
    return Response.json({error:'Invalid decision value'},{status:400});
  }
  const ctx=await getDemoContextFromRequest();
  await decideAgreementRow(ctx,agreementId,rowId,body.decision,body.rationale);
  return Response.json({ok:true});
}
