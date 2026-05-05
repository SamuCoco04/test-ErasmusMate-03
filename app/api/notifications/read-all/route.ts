import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { markAllNotificationsRead } from '@/src/modules/notifications/notifications';

export async function POST() {
  const ctx = await getDemoContextFromRequest();
  const count = await markAllNotificationsRead(ctx);
  return Response.json({ data: { count } });
}
