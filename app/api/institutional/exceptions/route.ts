import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { createExceptionRequest, ExceptionError, listExceptions } from '@/src/modules/institutional/exceptions';

export async function GET() {
  const ctx = await getDemoContextFromRequest();
  return Response.json({ data: await listExceptions(ctx) });
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as { title?: string; reason?: string; deadlineId?: string };
    if (!body.title || body.title.length < 3 || !body.reason || body.reason.length < 5 || !body.deadlineId || body.deadlineId.length < 1) {
      return Response.json({ error: 'Invalid request payload' }, { status: 400 });
    }
    const ctx = await getDemoContextFromRequest();
    return Response.json({ data: await createExceptionRequest(ctx, { title: body.title, reason: body.reason, deadlineId: body.deadlineId }) }, { status: 201 });
  } catch (error) {
    if (error instanceof ExceptionError) return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : 400 });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
