import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getSubmissionDetail, SubmissionError } from '@/src/modules/institutional/submissions';

export async function GET(_: Request, { params }: { params: { submissionId: string } }) {
  try {
    const ctx = await getDemoContextFromRequest();
    const data = await getSubmissionDetail(ctx, params.submissionId);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof SubmissionError) return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : error.code === 'NOT_FOUND' ? 404 : 400 });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
