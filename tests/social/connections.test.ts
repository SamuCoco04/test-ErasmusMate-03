import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { getConnectionStateForProfile, getMyConnections, requestConnection, transitionConnection } from '@/src/modules/social/connections';
import { listDiscoveryProfiles } from '@/src/modules/social/discovery';
import { sendMessage } from '@/src/modules/social/messages';

describe('Social: connection lifecycle contract', () => {
  beforeEach(async () => { await seed(); });

  it('cancel pending request then allows sending again', async () => {
    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-1', 'cancel');
    const renewed = await requestConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-2');
    expect(renewed.id).toBe('conn-seed-1');
    expect(renewed.state).toBe('PENDING');
  });

  it('reject request then allows sending again by reusing pair row', async () => {
    const renewed = await requestConnection(prisma, { role: 'STUDENT', userId: 'student-6' }, 'sp-student-2');
    expect(renewed.id).toBe('conn-seed-3');
    expect(renewed.state).toBe('PENDING');
  });

  it('duplicate pending and accepted requests stay blocked', async () => {
    await expect(requestConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-2')).rejects.toThrow();
    await expect(requestConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-3')).rejects.toThrow();
  });

  it('block accepted connection forbids messaging, unblock restores requestability status', async () => {
    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-2', 'block');
    await expect(sendMessage(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-2', { body: 'hi' })).rejects.toThrow('Forbidden');

    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-2', 'unblock');
    const status = await getConnectionStateForProfile(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-3');
    expect(status).toBe('AVAILABLE_TO_REQUEST');
  });

  it('discovery status changes after cancel and block/unblock', async () => {
    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-1', 'cancel');
    expect(await getConnectionStateForProfile(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-2')).toBe('AVAILABLE_TO_REQUEST');

    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-4', 'unblock');
    expect(await getConnectionStateForProfile(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-6')).toBe('AVAILABLE_TO_REQUEST');
  });

  it('participants only and non-students cannot transition', async () => {
    await expect(transitionConnection(prisma, { role: 'STUDENT', userId: 'student-4' }, 'conn-seed-2', 'block')).rejects.toThrow('Forbidden');
    await expect(requestConnection(prisma, { role: 'ADMIN', userId: 'admin-1' }, 'sp-student-2')).rejects.toThrow('Forbidden');
  });

  it('discovery includes safe connection status without moderation internals', async () => {
    const items = await listDiscoveryProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    expect(items[0]).toHaveProperty('connectionStatus');
    expect(items[0]).not.toHaveProperty('moderationState');
  });

  it('connections list includes blocked row with unblock action', async () => {
    const mine = await getMyConnections(prisma, { role: 'STUDENT', userId: 'student-1' });
    const blocked = mine.unavailable.find((item) => item.state === 'BLOCKED');
    expect(blocked?.allowedActions.unblock).toBe(true);
  });
});
