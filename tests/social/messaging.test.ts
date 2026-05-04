import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { getMessagesForConnection, listMessageThreads, sendMessage } from '@/src/modules/social/messages';

describe('Social: accepted-only messaging contract', () => {
  beforeEach(async () => { await seed(); });

  it('student lists message threads only for accepted connections', async () => {
    const threads = await listMessageThreads(prisma, { role: 'STUDENT', userId: 'student-1' });
    expect(threads.length).toBe(1);
    expect(threads[0]?.connectionId).toBe('conn-seed-2');
  });

  it('student reads message history for accepted connection', async () => {
    const messages = await getMessagesForConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-2');
    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0]?.createdAt <= messages[1]?.createdAt).toBe(true);
  });

  it('student sends a message to accepted connection', async () => {
    const created = await sendMessage(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-2', { body: '  New message  ' });
    expect(created.body).toBe('New message');
  });

  it('student cannot send empty message', async () => {
    await expect(sendMessage(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-2', { body: '   ' })).rejects.toThrow('Message body is required');
  });

  it('student cannot send to non-accepted connection states', async () => {
    await expect(sendMessage(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-1', { body: 'hi' })).rejects.toThrow('Forbidden');
    await expect(sendMessage(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-4', { body: 'hi' })).rejects.toThrow('Forbidden');
  });

  it('student cannot access another student connection', async () => {
    await expect(getMessagesForConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-3')).rejects.toThrow('Forbidden');
  });

  it('coordinator/admin are forbidden', async () => {
    await expect(listMessageThreads(prisma, { role: 'COORDINATOR', userId: 'coordinator-1' })).rejects.toThrow('Forbidden');
    await expect(sendMessage(prisma, { role: 'ADMIN', userId: 'admin-1' }, 'conn-seed-2', { body: 'hi' })).rejects.toThrow('Forbidden');
  });

  it('hidden or moderation-hidden profiles cannot receive new messages', async () => {
    await prisma.socialConnection.update({ where: { id: 'conn-seed-2' }, data: { receiverProfileId: 'sp-student-4', pairKey: 'sp-student-1__sp-student-4' } });
    await expect(sendMessage(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-2', { body: 'hi' })).rejects.toThrow('Forbidden');

    await prisma.socialConnection.update({ where: { id: 'conn-seed-2' }, data: { receiverProfileId: 'sp-student-5', pairKey: 'sp-student-1__sp-student-5' } });
    await expect(sendMessage(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-2', { body: 'hi' })).rejects.toThrow('Forbidden');
  });

  it('seed can run twice without unique errors', async () => {
    await expect(seed()).resolves.toBeUndefined();
  });
});
