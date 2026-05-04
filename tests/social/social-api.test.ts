import { beforeEach, describe, expect, it } from 'vitest';
import { seed } from '@/prisma/seed';
import { getOwnSocialProfile } from '@/src/modules/social/profile';
import { listDiscoveryProfiles } from '@/src/modules/social/discovery';
import { prisma } from '@/src/lib/prisma';

describe('social role guards and seed idempotency', () => {
  beforeEach(async () => { await seed(); });
  it('forbids coordinator/admin access', async () => {
    await expect(getOwnSocialProfile(prisma as any, { role: 'COORDINATOR', userId: 'coordinator-1' })).rejects.toThrow('Forbidden');
    await expect(listDiscoveryProfiles(prisma as any, { role: 'ADMIN', userId: 'admin-1' }, new URLSearchParams())).rejects.toThrow('Forbidden');
  });
  it('seed can run twice without errors', async () => { await expect(seed()).resolves.toBeUndefined(); });
});
