import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { markNotificationRead } from '@/src/modules/notifications/notifications';

export async function POST(_: Request, context: { params: Promise<{ notificationId: string }> }) {
  const ctx = await getDemoContextFromRequest();
  const { notificationId } = await context.params;
  try {
    const data = await markNotificationRead(ctx, notificationId);
    return Response.json({ data: { id: data.id, readAt: data.readAt } });
  } catch {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
}
