import { prisma } from '@/src/lib/prisma';
import type { DemoContext } from '@/src/modules/shared/demo-context';

export type NotificationArea = 'INSTITUTIONAL' | 'SOCIAL' | 'ADMIN';

type CreateNotificationInput = {
  recipientUserId: string;
  actorUserId?: string | null;
  area: NotificationArea;
  type: string;
  title: string;
  body: string;
  entityType?: string | null;
  entityId?: string | null;
};

export async function createNotification(input: CreateNotificationInput) {
  return prisma.notification.create({ data: { id: `notif-${crypto.randomUUID()}`, ...input, actorUserId: input.actorUserId ?? null, entityType: input.entityType ?? null, entityId: input.entityId ?? null } });
}

export async function listNotificationsForContext(ctx: DemoContext) {
  return prisma.notification.findMany({ where: { recipientUserId: ctx.userId }, orderBy: { createdAt: 'desc' } });
}

export async function markNotificationRead(ctx: DemoContext, notificationId: string) {
  const found = await prisma.notification.findUnique({ where: { id: notificationId } });
  if (!found || found.recipientUserId !== ctx.userId) throw new Error('FORBIDDEN');
  return prisma.notification.update({ where: { id: notificationId }, data: { readAt: new Date() } });
}

export async function markAllNotificationsRead(ctx: DemoContext) {
  const updated = await prisma.notification.updateMany({ where: { recipientUserId: ctx.userId, readAt: null }, data: { readAt: new Date() } });
  return updated.count;
}
