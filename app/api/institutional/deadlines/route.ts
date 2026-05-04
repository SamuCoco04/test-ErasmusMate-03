import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getDeadlineSummary } from '@/src/modules/institutional/deadlines';

export async function GET() {
  const ctx = await getDemoContextFromRequest();
  return Response.json({ data: await getDeadlineSummary(ctx) });
}
