import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { getOwnSocialProfile, updateOwnSocialProfile } from '@/src/modules/social/profile';

describe('social profile', () => {
  beforeEach(async () => { await seed(); });
  it('student can read own social profile', async () => { const result = await getOwnSocialProfile(prisma as any, { role: 'STUDENT', userId: 'student-1' }); expect(result.profile.displayName).toBeTruthy(); });
  it('student can update allowed fields and cannot set forbidden internals', async () => { const updated = await updateOwnSocialProfile(prisma as any, { role: 'STUDENT', userId: 'student-1' }, { displayName: 'Updated Name', bio: 'Updated bio', moderationState: 'HIDDEN_BY_MODERATION' }); expect(updated.displayName).toBe('Updated Name'); const row = await prisma.socialProfile.findUnique({ where: { userId: 'student-1' } }); expect(row?.moderationState).toBe('ACTIVE'); });
});
