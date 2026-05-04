import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { createDraftSubmission, listSubmissionsForStudent, listReviewQueueForCoordinator, SubmissionError } from '@/src/modules/institutional/submissions';

export async function GET() {
  try {
    const ctx = await getDemoContextFromRequest();
    const data = ctx.role === 'COORDINATOR' ? await listReviewQueueForCoordinator(ctx) : await listSubmissionsForStudent(ctx);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof SubmissionError) return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : 400 });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ctx = await getDemoContextFromRequest();
    const body = await request.json();
    if (!body?.procedureId || typeof body.procedureId !== 'string') return Response.json({ error: 'Invalid request payload' }, { status: 400 });
    const data = await createDraftSubmission(ctx, body.procedureId);
    return Response.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof SubmissionError) return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : 400 });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
