import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listExceptions } from '@/src/modules/institutional/exceptions';

export async function GET(_: Request, { params }: { params: Promise<{ exceptionId: string }> }) {
  const { exceptionId } = await params;
  const ctx = await getDemoContextFromRequest();
  const items = await listExceptions(ctx);
  const found = items.find((i) => i.id === exceptionId);
  if (!found) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ data: found });
}
