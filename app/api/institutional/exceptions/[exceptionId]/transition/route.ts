import { ExceptionAction, ExceptionError, transitionException } from '@/src/modules/institutional/exceptions';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';

const validActions: readonly ExceptionAction[] = ['start_review', 'approve', 'reject', 'apply', 'close'];

function isExceptionAction(value: unknown): value is ExceptionAction {
  return typeof value === 'string' && (validActions as readonly string[]).includes(value);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ exceptionId: string }> }) {
  try {
    const { exceptionId } = await params;
    const body = (await req.json()) as { action?: string; rationale?: string; overrideDueDate?: string };

    if (!isExceptionAction(body.action)) {
      return Response.json({ error: 'Invalid request payload' }, { status: 400 });
    }

    const ctx = await getDemoContextFromRequest();
    return Response.json({ data: await transitionException(ctx, exceptionId, body.action, body) });
  } catch (error) {
    if (error instanceof ExceptionError) {
      return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : 400 });
    }

    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
