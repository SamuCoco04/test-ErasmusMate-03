import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getAcademicSummaryForMobilityRecord, LearningAgreementError } from '@/src/modules/institutional/learning-agreement';

function statusFor(code: string) {
  if (code === 'FORBIDDEN') return 403;
  if (code === 'NOT_FOUND') return 404;
  if (code === 'VALIDATION' || code === 'INVALID_TRANSITION') return 400;
  return 500;
}

export async function GET(req: Request) {
  try {
    const ctx = await getDemoContextFromRequest();
    const url = new URL(req.url);
    const data = await getAcademicSummaryForMobilityRecord(ctx, url.searchParams.get('mobilityRecordId') ?? undefined);

    return Response.json({ data });
  } catch (error) {
    if (error instanceof LearningAgreementError) {
      return Response.json({ error: error.message }, { status: statusFor(error.code) });
    }

    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
