import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listNotificationsForContext } from '@/src/modules/notifications/notifications';

export async function GET() {
  const ctx = await getDemoContextFromRequest();
  const data = await listNotificationsForContext(ctx);
  return Response.json({ data: data.map((n) => ({ id: n.id, area: n.area, type: n.type, title: n.title, body: n.body, entityType: n.entityType, entityId: n.entityId, readAt: n.readAt, createdAt: n.createdAt })) });
}
