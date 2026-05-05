import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { listDiscoveryProfiles } from '@/src/modules/social/discovery';
import { transitionConnection } from '@/src/modules/social/connections';

describe('Social: discovery visibility', () => {
  beforeEach(async () => { await seed(); });
  it('excludes current student, hidden and moderation-hidden profiles', async () => { const items = await listDiscoveryProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams()); expect(items.find((x)=>x.id==='sp-student-1')).toBeFalsy(); expect(items.find((x)=>x.id==='sp-student-4')).toBeFalsy(); expect(items.find((x)=>x.id==='sp-student-5')).toBeFalsy(); });
  it('filters by host city or study area', async () => { const byCity = await listDiscoveryProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('hostCity=Ghent')); expect(byCity.length).toBe(1); const byArea = await listDiscoveryProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('studyArea=Computer Science')); expect(byArea.every((x)=>x.studyArea==='Computer Science')).toBe(true); });
  it('does not expose moderation internals', async () => { const items = await listDiscoveryProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams()); expect(items[0]).not.toHaveProperty('moderationState'); });
  it('shows safe unavailable reason for connections-only after unblock', async () => {
    await transitionConnection(prisma, { role: 'STUDENT', userId: 'student-1' }, 'conn-seed-4', 'unblock');
    const items = await listDiscoveryProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    const elena = items.find((x) => x.id === 'sp-student-6');
    expect(elena?.connectionStatus).toBe('UNAVAILABLE');
    expect(elena?.unavailableReason).toBe('CONTACT_PREFERENCE_CONNECTIONS_ONLY');
  });
});
