import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { createRecommendation, getRecommendationMapItems, listRecommendations, reportRecommendation } from '@/src/modules/social/recommendations';

describe('Social: city recommendations and map contracts', () => {
  beforeEach(async () => { await seed(); });

  it('student can create recommendation with valid coordinates', async () => {
    const created = await createRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, { title: 'Bike route to campus', description: 'Cycle path is safer via ring road.', category: 'TRANSPORT', city: 'Leuven', country: 'Belgium', addressLabel: 'Ring Leuven', approximateLatitude: 50.88, approximateLongitude: 4.7 });
    expect(created.category).toBe('TRANSPORT');
    expect(created.approximateLatitude).toBe(50.88);
    expect(created.approximateLongitude).toBe(4.7);
  });

  it('coordinator/admin cannot create social recommendations', async () => {
    await expect(createRecommendation(prisma, { role: 'ADMIN', userId: 'admin-1' }, { title: 'x', description: 'x', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: 'x', approximateLatitude: 50.87, approximateLongitude: 4.7 })).rejects.toThrow('Forbidden');
    await expect(createRecommendation(prisma, { role: 'COORDINATOR', userId: 'coord-1' }, { title: 'x', description: 'x', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: 'x', approximateLatitude: 50.87, approximateLongitude: 4.7 })).rejects.toThrow('Forbidden');
  });

  it('invalid coordinates and empty required fields are rejected', async () => {
    await expect(createRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, { title: '', description: 'd', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: 'a', approximateLatitude: 50.1, approximateLongitude: 4.1 })).rejects.toThrow('Title is required');
    await expect(createRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, { title: 't', description: '', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: 'a', approximateLatitude: 50.1, approximateLongitude: 4.1 })).rejects.toThrow('Description is required');
    await expect(createRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, { title: 't', description: 'd', category: '', city: 'Leuven', country: 'Belgium', addressLabel: 'a', approximateLatitude: 50.1, approximateLongitude: 4.1 })).rejects.toThrow('Category is required');
    await expect(createRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, { title: 't', description: 'd', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: 'a', approximateLatitude: 120, approximateLongitude: 4.1 })).rejects.toThrow('Latitude');
  });

  it('newly created recommendation appears in list and map APIs', async () => {
    const created = await createRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, { title: 'Late library', description: 'Good place to study late.', category: 'STUDY', city: 'Leuven', country: 'Belgium', addressLabel: 'City Library', approximateLatitude: 50.879, approximateLongitude: 4.704 });
    const listItems = await listRecommendations(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('city=Leuven&category=STUDY'));
    expect(listItems.some((item) => item.id === created.id)).toBe(true);
    const mapItems = await getRecommendationMapItems(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('city=Leuven&category=STUDY'));
    expect(mapItems.some((item) => item.recommendationId === created.id)).toBe(true);
  });

  it('map endpoint returns safe place fields and no private creator data', async () => {
    const items = await getRecommendationMapItems(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('category=STUDY'));
    expect(items.every((x) => x.category === 'STUDY')).toBe(true);
    const item = items[0] as Record<string, unknown>;
    expect(item).toHaveProperty('recommendationId');
    expect(item).toHaveProperty('descriptionExcerpt');
    expect(item).not.toHaveProperty('userId');
    expect(item).not.toHaveProperty('profileId');
    expect(item).not.toHaveProperty('liveLocation');
    expect(item).not.toHaveProperty('personalLocation');
    expect(item).not.toHaveProperty('moderationState');
  });

  it('hidden or moderation-hidden recommendations are excluded', async () => { /* existing */
    await prisma.cityRecommendation.create({ data: { id: 'rec-hidden', createdByProfileId: 'sp-student-2', title: 'Hidden tip', description: 'Should never appear', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: 'Hidden place', approximateLatitude: 50.87, approximateLongitude: 4.71, visibility: 'HIDDEN', moderationState: 'ACTIVE' } });
    await prisma.cityRecommendation.create({ data: { id: 'rec-moderated', createdByProfileId: 'sp-student-2', title: 'Moderated tip', description: 'Should never appear', category: 'GENERAL_TIP', city: 'Leuven', country: 'Belgium', addressLabel: 'Moderated place', approximateLatitude: 50.87, approximateLongitude: 4.72, visibility: 'VISIBLE', moderationState: 'HIDDEN_BY_MODERATION' } });
    const listItems = await listRecommendations(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    const mapItems = await getRecommendationMapItems(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    expect(listItems.map((item) => item.id)).not.toContain('rec-hidden');
    expect(listItems.map((item) => item.id)).not.toContain('rec-moderated');
    expect(mapItems.map((item) => item.recommendationId)).not.toContain('rec-hidden');
    expect(mapItems.map((item) => item.recommendationId)).not.toContain('rec-moderated');
  });

  it('city/category filters apply to both list and map', async () => {
    const list = await listRecommendations(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('city=Leuven&category=FOOD'));
    const map = await getRecommendationMapItems(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams('city=Leuven&category=FOOD'));
    expect(list.every((item) => item.city === 'Leuven' && item.category === 'FOOD')).toBe(true);
    expect(map.every((item) => item.city === 'Leuven' && item.category === 'FOOD')).toBe(true);
  });

  it('report recommendation creates moderation record', async () => {
    const report = await reportRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, 'rec-2', 'Spam');
    expect(report.targetRecommendationId).toBe('rec-2');
  });

  it('seed remains idempotent', async () => { await expect(seed()).resolves.toBeUndefined(); });
});
