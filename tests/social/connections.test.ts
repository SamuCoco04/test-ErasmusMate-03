import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { getMyConnections, requestConnection, transitionConnection } from '@/src/modules/social/connections';
import { listDiscoveryProfiles } from '@/src/modules/social/discovery';

describe('Social: connection lifecycle contract', () => {
  beforeEach(async () => { await seed(); });
  it('student can send request to visible profile and duplicate is blocked', async () => {
    const conn = await requestConnection(prisma as any, { role: 'STUDENT', userId: 'student-2' }, 'sp-student-3');
    expect(conn.state).toBe('PENDING');
    await expect(requestConnection(prisma as any, { role: 'STUDENT', userId: 'student-2' }, 'sp-student-3')).rejects.toThrow();
  });
  it('blocks self and hidden or moderation-hidden requests', async () => {
    await expect(requestConnection(prisma as any, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-1')).rejects.toThrow();
    await expect(requestConnection(prisma as any, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-4')).rejects.toThrow();
    await expect(requestConnection(prisma as any, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-5')).rejects.toThrow();
  });
  it('accept reject cancel and participant guard work', async () => {
    const accepted = await transitionConnection(prisma as any, { role: 'STUDENT', userId: 'student-2' }, 'conn-seed-1', 'accept');
    expect(accepted.state).toBe('ACCEPTED');
    const conn = await requestConnection(prisma as any, { role: 'STUDENT', userId: 'student-3' }, 'sp-student-2');
    const rejected = await transitionConnection(prisma as any, { role: 'STUDENT', userId: 'student-2' }, conn.id, 'reject');
    expect(rejected.state).toBe('REJECTED');
    const conn2 = await requestConnection(prisma as any, { role: 'STUDENT', userId: 'student-3' }, 'sp-student-6');
    const cancelled = await transitionConnection(prisma as any, { role: 'STUDENT', userId: 'student-3' }, conn2.id, 'cancel');
    expect(cancelled.state).toBe('CANCELLED');
    await expect(transitionConnection(prisma as any, { role: 'STUDENT', userId: 'student-4' }, 'conn-seed-2', 'block')).rejects.toThrow('Forbidden');
  });
  it('accepted appears in lists and blocked pair cannot request', async () => {
    const mine = await getMyConnections(prisma as any, { role: 'STUDENT', userId: 'student-1' });
    expect(mine.accepted.some((x:any)=>x.id==='conn-seed-2')).toBe(true);
    await expect(requestConnection(prisma as any, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-6')).rejects.toThrow();
  });

  it('re-requesting after rejected reuses the existing pair row', async () => {
    const conn = await requestConnection(prisma as any, { role: 'STUDENT', userId: 'student-6' }, 'sp-student-2');
    expect(conn.id).toBe('conn-seed-3');
    expect(conn.state).toBe('PENDING');
    expect(conn.requesterProfileId).toBe('sp-student-6');
    expect(conn.receiverProfileId).toBe('sp-student-2');

    const stored = await prisma.socialConnection.findUnique({ where: { id: 'conn-seed-3' } });
    expect(stored?.state).toBe('PENDING');
    expect(stored?.respondedAt).toBeNull();
  });

  it('coordinator and admin are forbidden, discovery includes safe connection status', async () => {
    await expect(getMyConnections(prisma as any, { role: 'COORDINATOR', userId: 'coordinator-1' })).rejects.toThrow('Forbidden');
    await expect(requestConnection(prisma as any, { role: 'ADMIN', userId: 'admin-1' }, 'sp-student-2')).rejects.toThrow('Forbidden');
    const items = await listDiscoveryProfiles(prisma as any, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    expect(items[0]).toHaveProperty('connectionStatus');
    expect(items[0]).not.toHaveProperty('moderationState');
  });
});
