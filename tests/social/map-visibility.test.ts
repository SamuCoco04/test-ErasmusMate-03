import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { createRecommendation, getRecommendationMapItems, listRecommendations, reportRecommendation } from '@/src/modules/social/recommendations';

describe('Social: city recommendations and map contracts', () => {
  beforeEach(async () => { await seed(); });

  it('student can list visible recommendations with safe payload only', async () => {
    const items = await listRecommendations(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('city=Leuven'));
    expect(items.length).toBeGreaterThan(0);
    const item = items[0] as Record<string, unknown>;
    expect(item).not.toHaveProperty('moderationState');
    expect(item).not.toHaveProperty('createdByProfileId');
  });

  it('student can create recommendation and admin/coordinator cannot', async () => {
    const created = await createRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, { title: 'Bike route to campus', description: 'Cycle path is safer via ring road.', category: 'TRANSPORT', city: 'Leuven', country: 'Belgium', addressLabel: 'Ring Leuven', approximateLatitude: 50.88, approximateLongitude: 4.7 });
    expect(created.category).toBe('TRANSPORT');
    await expect(createRecommendation(prisma, { role: 'ADMIN', userId: 'admin-1' }, { title: 'x', description: 'x', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: 'x' })).rejects.toThrow('Forbidden');
  });

  it('map endpoint returns recommendation places with coordinates and no profile fields', async () => {
    const items = await getRecommendationMapItems(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('category=STUDY'));
    expect(items.every((x) => x.category === 'STUDY')).toBe(true);
    expect(items.every((x) => typeof x.approximateLatitude === 'number' && typeof x.approximateLongitude === 'number')).toBe(true);
    const item = items[0] as Record<string, unknown>;
    expect(item).toHaveProperty('recommendationId');
    expect(item).not.toHaveProperty('displayName');
    expect(item).not.toHaveProperty('userId');
    expect(item).not.toHaveProperty('profileId');
    expect(item).not.toHaveProperty('liveLocation');
    expect(item).not.toHaveProperty('personalLocation');
    expect(item).not.toHaveProperty('moderationState');
  });

  it('hidden or moderation-hidden recommendations are excluded', async () => {
    await prisma.cityRecommendation.create({
      data: {
        id: 'rec-hidden',
        createdByProfileId: 'sp-student-2',
        title: 'Hidden tip',
        description: 'Should never appear',
        category: 'GENERAL_TIP',
        city: 'Leuven',
        country: 'Belgium',
        addressLabel: 'Hidden place',
        approximateLatitude: 50.87,
        approximateLongitude: 4.71,
        visibility: 'HIDDEN',
        moderationState: 'ACTIVE',
      },
    });

    await prisma.cityRecommendation.create({
      data: {
        id: 'rec-moderated',
        createdByProfileId: 'sp-student-2',
        title: 'Moderated tip',
        description: 'Should never appear',
        category: 'GENERAL_TIP',
        city: 'Leuven',
        country: 'Belgium',
        addressLabel: 'Moderated place',
        approximateLatitude: 50.87,
        approximateLongitude: 4.72,
        visibility: 'VISIBLE',
        moderationState: 'HIDDEN_BY_MODERATION',
      },
    });

    const items = await getRecommendationMapItems(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    const ids = items.map((item) => item.recommendationId);
    expect(ids).not.toContain('rec-hidden');
    expect(ids).not.toContain('rec-moderated');
  });

  it('city and category filters affect map results', async () => {
    const leuvenFood = await getRecommendationMapItems(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('city=Leuven&category=FOOD'));
    expect(leuvenFood.length).toBeGreaterThan(0);
    expect(leuvenFood.every((item) => item.city === 'Leuven' && item.category === 'FOOD')).toBe(true);
  });

  it('report recommendation creates moderation record', async () => {
    const report = await reportRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, 'rec-2', 'Spam');
    expect(report.targetRecommendationId).toBe('rec-2');
    expect(report.targetProfileId).toBeTruthy();
  });

  it('seed remains idempotent', async () => {
    await expect(seed()).resolves.toBeUndefined();
  });
});
