import { z } from 'zod';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { createExceptionRequest, ExceptionError, listExceptions } from '@/src/modules/institutional/exceptions';

const createSchema = z.object({ title: z.string().min(3), reason: z.string().min(5), deadlineId: z.string().min(1) });

export async function GET() {
  const ctx = await getDemoContextFromRequest();
  return Response.json({ data: await listExceptions(ctx) });
}

export async function POST(req: Request) {
  try {
    const body = createSchema.parse(await req.json());
    const ctx = await getDemoContextFromRequest();
    return Response.json({ data: await createExceptionRequest(ctx, body) }, { status: 201 });
  } catch (error) {
    if (error instanceof ExceptionError) return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : 400 });
    if (error instanceof z.ZodError) return Response.json({ error: error.flatten() }, { status: 400 });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
