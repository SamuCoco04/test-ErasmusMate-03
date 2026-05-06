import { beforeEach, describe, expect, it, vi } from 'vitest';

import { seed } from '@/prisma/seed';
import { prisma } from '@/src/lib/prisma';
import { createNotification } from '@/src/modules/notifications/notifications';
import { GET as listNotifications } from '@/app/api/notifications/route';
import { POST as markRead } from '@/app/api/notifications/[notificationId]/read/route';
import { POST as markAllRead } from '@/app/api/notifications/read-all/route';

const getDemoContextFromRequest = vi.hoisted(() => vi.fn());

vi.mock('@/src/modules/shared/demo-context', async () => {
  const actual = await vi.importActual<typeof import('@/src/modules/shared/demo-context')>('@/src/modules/shared/demo-context');
  return {
    ...actual,
    getDemoContextFromRequest,
  };
});

describe('Notifications API ownership and read guards', () => {
  beforeEach(async () => {
    await seed();
    vi.clearAllMocks();

    await createNotification({ recipientUserId: 'student-1', actorUserId: 'coordinator-1', area: 'INSTITUTIONAL', type: 'EXCEPTION_APPROVE', title: 'Exception approved', body: 'Your exception request was approved.', entityType: 'EXCEPTION', entityId: 'exc-3' });
    await createNotification({ recipientUserId: 'student-1', actorUserId: 'coordinator-1', area: 'INSTITUTIONAL', type: 'SUBMISSION_APPROVED', title: 'Submission approved', body: 'Your submission was approved.', entityType: 'SUBMISSION', entityId: 'sub-2' });
    await createNotification({ recipientUserId: 'coordinator-1', actorUserId: 'student-1', area: 'INSTITUTIONAL', type: 'EXCEPTION_REQUESTED', title: 'Exception requested', body: 'A student requested an exception review.', entityType: 'EXCEPTION', entityId: 'exc-1' });
  });

  it('lists only notifications for the active user with read state fields', async () => {
    getDemoContextFromRequest.mockResolvedValue({ role: 'STUDENT', userId: 'student-1' });

    const response = await listNotifications();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.data).toHaveLength(2);
    expect(payload.data.every((item: { readAt: string | null; entityId: string | null }) => Object.prototype.hasOwnProperty.call(item, 'readAt') && Object.prototype.hasOwnProperty.call(item, 'entityId'))).toBe(true);
    expect(payload.data.every((item: { type: string }) => item.type !== 'EXCEPTION_REQUESTED')).toBe(true);
  });

  it('owner can mark one notification as read and response stays minimal', async () => {
    const target = await prisma.notification.findFirstOrThrow({ where: { recipientUserId: 'student-1' }, orderBy: { createdAt: 'asc' } });
    getDemoContextFromRequest.mockResolvedValue({ role: 'STUDENT', userId: 'student-1' });

    const response = await markRead(new Request('http://localhost/api/notifications/x/read'), { params: Promise.resolve({ notificationId: target.id }) });
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.data.id).toBe(target.id);
    expect(payload.data.readAt).toBeTruthy();
    expect(payload.data.recipientUserId).toBeUndefined();
  });

  it('non-owner cannot mark another user notification as read', async () => {
    const target = await prisma.notification.findFirstOrThrow({ where: { recipientUserId: 'coordinator-1' } });
    getDemoContextFromRequest.mockResolvedValue({ role: 'STUDENT', userId: 'student-1' });

    const response = await markRead(new Request('http://localhost/api/notifications/x/read'), { params: Promise.resolve({ notificationId: target.id }) });
    const payload = await response.json();

    expect(response.status).toBe(403);
    expect(payload).toEqual({ error: 'Forbidden' });
  });

  it('mark-read safe behavior for missing notification id', async () => {
    getDemoContextFromRequest.mockResolvedValue({ role: 'STUDENT', userId: 'student-1' });

    const response = await markRead(new Request('http://localhost/api/notifications/x/read'), { params: Promise.resolve({ notificationId: 'notif-missing' }) });
    const payload = await response.json();

    expect(response.status).toBe(403);
    expect(payload.error).toBe('Forbidden');
    expect(String(payload.error)).not.toContain('/workspace/');
  });

  it('mark-all reads only active user notifications and is idempotent on rerun', async () => {
    getDemoContextFromRequest.mockResolvedValue({ role: 'STUDENT', userId: 'student-1' });

    const first = await markAllRead();
    const firstPayload = await first.json();
    expect(first.status).toBe(200);
    expect(firstPayload.data.count).toBe(2);

    const second = await markAllRead();
    const secondPayload = await second.json();
    expect(second.status).toBe(200);
    expect(secondPayload.data.count).toBe(0);

    const coordinatorUnread = await prisma.notification.count({ where: { recipientUserId: 'coordinator-1', readAt: null } });
    expect(coordinatorUnread).toBe(1);
  });

  it('mark-all safely returns zero when no unread notifications exist', async () => {
    await prisma.notification.updateMany({ where: { recipientUserId: 'student-1' }, data: { readAt: new Date('2026-05-06T12:00:00.000Z') } });
    getDemoContextFromRequest.mockResolvedValue({ role: 'STUDENT', userId: 'student-1' });

    const response = await markAllRead();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.data.count).toBe(0);
  });
});
