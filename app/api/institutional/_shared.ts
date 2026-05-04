import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';

export async function withInstitutionalRead<T>(allowed: Array<'STUDENT'|'COORDINATOR'|'ADMIN'>, fn: (ctx: Awaited<ReturnType<typeof getDemoContextFromRequest>>) => Promise<T>) {
  try {
    const ctx = await getDemoContextFromRequest();
    if (!allowed.includes(ctx.role)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
    const data = await fn(ctx);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
