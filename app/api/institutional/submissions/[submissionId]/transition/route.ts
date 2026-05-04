import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { SubmissionError, transitionSubmission } from '@/src/modules/institutional/submissions';

export async function PATCH(request: Request, { params }: { params: Promise<{ submissionId: string }> }) {
  try {
    const ctx = await getDemoContextFromRequest();
    const body = await request.json();
    const allowed = ['submit','start_review','approve','reject','reopen','resubmit'];
    if (!body?.action || !allowed.includes(body.action)) return Response.json({ error: 'Invalid request payload' }, { status: 400 });
    const { submissionId } = await params;
    const data = await transitionSubmission(ctx, submissionId, body.action, typeof body.rationale === 'string' ? body.rationale : undefined);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof SubmissionError) {
      const status = error.code === 'FORBIDDEN' ? 403 : error.code === 'NOT_FOUND' ? 404 : 400;
      return Response.json({ error: error.message }, { status });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
