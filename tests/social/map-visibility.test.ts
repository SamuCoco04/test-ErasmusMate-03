import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { listMapProfiles } from '@/src/modules/social/map';

describe('Social: map visibility filtering contract', () => {
  beforeEach(async () => { await seed(); });

  it('student can retrieve map-visible profiles and connected status is safe', async () => {
    const items = await listMapProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    expect(items.length).toBeGreaterThan(0);
    expect(items.find((x) => x.profileId === 'sp-student-3')?.connectionStatus).toBe('CONNECTED');
  });

  it('excludes own, hidden, moderation-hidden and map hidden profiles', async () => {
    const items = await listMapProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    expect(items.find((x) => x.profileId === 'sp-student-1')).toBeFalsy();
    expect(items.find((x) => x.profileId === 'sp-student-4')).toBeFalsy();
    expect(items.find((x) => x.profileId === 'sp-student-5')).toBeFalsy();
  });

  it('payload exposes only safe public map fields', async () => {
    const items = await listMapProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    const item = items[0] as Record<string, unknown>;
    expect(item).not.toHaveProperty('userId');
    expect(item).not.toHaveProperty('email');
    expect(item).not.toHaveProperty('moderationState');
    expect(item).not.toHaveProperty('pairKey');
  });

  it('forbids coordinator and admin access', async () => {
    await expect(listMapProfiles(prisma, { role: 'COORDINATOR', userId: 'coordinator-1' }, new URLSearchParams())).rejects.toThrow('Forbidden');
    await expect(listMapProfiles(prisma, { role: 'ADMIN', userId: 'admin-1' }, new URLSearchParams())).rejects.toThrow('Forbidden');
  });

  it('blocked profiles are not actionable and filters work', async () => {
    const all = await listMapProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    expect(all.find((x) => x.profileId === 'sp-student-6')?.connectionStatus).toBe('BLOCKED');
    const byCity = await listMapProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('hostCity=Ghent'));
    expect(byCity).toHaveLength(1);
    const byArea = await listMapProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('studyArea=Computer Science'));
    expect(byArea.every((x) => x.studyArea === 'Computer Science')).toBe(true);
  });

  it('seed remains idempotent', async () => {
    await expect(seed()).resolves.toBeUndefined();
  });
});
