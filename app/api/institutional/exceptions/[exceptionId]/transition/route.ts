import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { ExceptionError, transitionException } from '@/src/modules/institutional/exceptions';
const validActions = new Set(['start_review','approve','reject','apply','close']);

export async function PATCH(req: Request, { params }: { params: Promise<{ exceptionId: string }> }) {
  try {
    const { exceptionId } = await params;
    const body = await req.json() as { action?: string; rationale?: string; overrideDueDate?: string };
    if (!body.action || !validActions.has(body.action)) return Response.json({ error: 'Invalid request payload' }, { status: 400 });
    const ctx = await getDemoContextFromRequest();
    return Response.json({ data: await transitionException(ctx, exceptionId, body.action, body) });
  } catch (error) {
    if (error instanceof ExceptionError) return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : 400 });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
