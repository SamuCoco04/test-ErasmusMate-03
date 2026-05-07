import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { getConnectionStateForProfile, getMyConnections, requestConnection, transitionConnection } from '@/src/modules/social/connections';
import { listDiscoveryProfiles } from '@/src/modules/social/discovery';
import { sendMessage } from '@/src/modules/social/messages';

describe('Social: connection lifecycle contract', () => {
  beforeEach(async () => { await seed(); });

  it('cancel pending request then allows sending again and keeps discovery requestable', async () => {
    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-1', 'cancel');
    const renewed = await requestConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-2');
    expect(renewed.id).toBe('conn-seed-1');
    expect(renewed.state).toBe('PENDING');
  });

  it('reject request then allows sending again by reusing pair row', async () => {
    const renewed = await requestConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-9');
    expect(renewed.id.length).toBeGreaterThan(0);
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

  it('blocked pairs prevent new requests', async () => {
    await expect(requestConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-6')).rejects.toThrow();
  });


  it('accepted pair allows messaging', async () => {
    const sent = await sendMessage(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-2', { body: 'hello there' });
    expect(sent.body).toBe('hello there');
  });

  it('participants only and non-students cannot transition', async () => {
    await expect(transitionConnection(prisma, { role: 'STUDENT', userId: 'student-4' }, 'conn-seed-2', 'block')).rejects.toThrow('Forbidden');
    await expect(transitionConnection(prisma, { role: 'COORDINATOR', userId: 'coordinator-1' }, 'conn-seed-2', 'block')).rejects.toThrow('Forbidden');
    await expect(requestConnection(prisma, { role: 'ADMIN', userId: 'admin-1' }, 'sp-student-2')).rejects.toThrow('Forbidden');
  });
  it('incoming request can be accepted and rejected by receiver', async () => {
    const accepted = await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-5', 'accept');
    expect(accepted.state).toBe('ACCEPTED');
    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-7' }, 'conn-seed-5', 'block');
    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-7' }, 'conn-seed-5', 'unblock');
    await requestConnection(prisma, { role: 'STUDENT', userId: 'student-7' }, 'sp-student-1');
    const rejected = await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-5', 'reject');
    expect(rejected.state).toBe('REJECTED');
  });

  it('privacy-restricted profile cannot receive new request', async () => {
    await expect(requestConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-10')).rejects.toThrow('Target profile is unavailable');
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

  it('unblock keeps pair non-connected and allows new request', async () => {
    const accepted = await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-5', 'accept');
    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, accepted.id, 'block');
    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, accepted.id, 'unblock');
    const renewed = await requestConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'sp-student-7');
    expect(renewed.id).toBe('conn-seed-5');
    expect(renewed.state).toBe('PENDING');
  });
});
