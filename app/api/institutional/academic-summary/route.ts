import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getAcademicSummaryForMobilityRecord } from '@/src/modules/institutional/learning-agreement';
export async function GET(req:Request){ const ctx=await getDemoContextFromRequest(); const url=new URL(req.url); const data=await getAcademicSummaryForMobilityRecord(ctx,url.searchParams.get('mobilityRecordId')??undefined); return Response.json({data}); }
