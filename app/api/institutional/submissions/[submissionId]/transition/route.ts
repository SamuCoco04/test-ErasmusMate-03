import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { SubmissionError, transitionSubmission } from '@/src/modules/institutional/submissions';

async function handle(request: Request, { params }: { params: Promise<{ submissionId: string }> }) {
  try {
    const ctx = await getDemoContextFromRequest();
    const body = await request.json();
    const allowed = ['submit','start_review','approve','reject','reopen','request_correction','resubmit'];
    if (!body?.action || !allowed.includes(body.action)) return Response.json({ error: 'Invalid request payload' }, { status: 400 });
    const { submissionId } = await params;
    const data = await transitionSubmission(ctx, submissionId, body.action, typeof body.rationale === 'string' ? body.rationale : undefined);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof SubmissionError) {
      const status = error.code === 'FORBIDDEN' ? 403 : error.code === 'NOT_FOUND' ? 404 : error.code === 'INVALID_TRANSITION' ? 409 : 400;
      return Response.json({ error: error.message }, { status });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ submissionId: string }> }) {
  return handle(request, context);
}

export async function POST(request: Request, context: { params: Promise<{ submissionId: string }> }) {
  return handle(request, context);
}
