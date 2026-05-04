import { z } from 'zod';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { ExceptionError, transitionException } from '@/src/modules/institutional/exceptions';

const schema = z.object({ action: z.enum(['start_review','approve','reject','apply','close']), rationale: z.string().optional(), overrideDueDate: z.string().optional() });

export async function PATCH(req: Request, { params }: { params: Promise<{ exceptionId: string }> }) {
  try {
    const { exceptionId } = await params;
    const body = schema.parse(await req.json());
    const ctx = await getDemoContextFromRequest();
    return Response.json({ data: await transitionException(ctx, exceptionId, body.action, body) });
  } catch (error) {
    if (error instanceof ExceptionError) return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : 400 });
    if (error instanceof z.ZodError) return Response.json({ error: error.flatten() }, { status: 400 });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
