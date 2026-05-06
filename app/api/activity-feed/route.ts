import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getActivityFeed } from '@/src/modules/activity-feed';

export async function GET(request: Request) {
  try {
    const ctx = await getDemoContextFromRequest(request);
    const url = new URL(request.url);
    const limitRaw = Number(url.searchParams.get('limit') ?? '20');
    const data = await getActivityFeed(ctx, limitRaw);
    return Response.json({ data });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
