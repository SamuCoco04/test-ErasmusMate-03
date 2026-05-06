import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { createSocialReport, listSocialReports, transitionSocialReport } from '@/src/modules/social/moderation';
import { listDiscoveryProfiles } from '@/src/modules/social/discovery';
import { requestConnection } from '@/src/modules/social/connections';
import { listRecommendations, getRecommendationMapItems, reportRecommendation } from '@/src/modules/social/recommendations';

describe('Social: content, reporting, and moderation contract', () => {
  beforeEach(async () => { await seed(); });

  it('student can report a visible profile', async () => {
    const report = await createSocialReport(prisma, { role: 'STUDENT', userId: 'student-2' }, { targetProfileId: 'sp-student-3', reason: 'Inappropriate profile' });
    expect(report.status).toBe('PENDING');
    expect(report.targetProfileId).toBe('sp-student-3');
  });

  it('student can report accepted-connection message only as participant', async () => {
    const created = await createSocialReport(prisma, { role: 'STUDENT', userId: 'student-1' }, { targetMessageId: 'msg-seed-2', reason: 'Offensive message' });
    expect(created.targetMessageId).toBe('msg-seed-2');
    await expect(createSocialReport(prisma, { role: 'STUDENT', userId: 'student-2' }, { targetMessageId: 'msg-seed-2', reason: 'No access' })).rejects.toThrow('Forbidden');
  });

  it('duplicate pending reports from same reporter and target are rejected', async () => {
    await createSocialReport(prisma, { role: 'STUDENT', userId: 'student-2' }, { targetProfileId: 'sp-student-3', reason: 'Inappropriate profile' });
    await expect(createSocialReport(prisma, { role: 'STUDENT', userId: 'student-2' }, { targetProfileId: 'sp-student-3', reason: 'Duplicate' })).rejects.toThrow('pending report');
  });

  it('admin can list profile, message and recommendation reports with target type labels', async () => {
    await reportRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, 'rec-1', 'Unsafe recommendation', 'Contains abusive wording');
    const reports = await listSocialReports(prisma, { role: 'ADMIN', userId: 'admin-1' });
    expect(reports.some((report) => report.targetType === 'PROFILE')).toBe(true);
    expect(reports.some((report) => report.targetType === 'MESSAGE')).toBe(true);
    expect(reports.some((report) => report.targetType === 'RECOMMENDATION')).toBe(true);
    expect(reports[0]).toHaveProperty('reporterDisplayName');
  });

  it('coordinator and student cannot access admin moderation routes', async () => {
    await expect(listSocialReports(prisma, { role: 'COORDINATOR', userId: 'coordinator-1' })).rejects.toThrow('Forbidden');
    await expect(listSocialReports(prisma, { role: 'STUDENT', userId: 'student-1' })).rejects.toThrow('Forbidden');
  });

  it('admin can dismiss pending recommendation report', async () => {
    const report = await reportRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, 'rec-1', 'Misleading');
    const updated = await transitionSocialReport(prisma, { role: 'ADMIN', userId: 'admin-1' }, report.id, { action: 'DISMISS', decisionRationale: 'No policy breach found' });
    expect(updated.status).toBe('DISMISSED');
  });

  it('admin can action recommendation report and hide recommendation from list/map', async () => {
    const report = await reportRecommendation(prisma, { role: 'STUDENT', userId: 'student-1' }, 'rec-1', 'Unsafe location details');
    const updated = await transitionSocialReport(prisma, { role: 'ADMIN', userId: 'admin-1' }, report.id, { action: 'HIDE_RECOMMENDATION', decisionRationale: 'Confirmed unsafe content' });
    expect(updated.status).toBe('ACTIONED');

    const listItems = await listRecommendations(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    const mapItems = await getRecommendationMapItems(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    expect(listItems.find((item) => item.id === 'rec-1')).toBeFalsy();
    expect(mapItems.find((item) => item.recommendationId === 'rec-1')).toBeFalsy();
  });

  it('admin can action report and hide target profile', async () => {
    const newReport = await createSocialReport(prisma, { role: 'STUDENT', userId: 'student-3' }, { targetProfileId: 'sp-student-2', reason: 'Harassment' });
    const updated = await transitionSocialReport(prisma, { role: 'ADMIN', userId: 'admin-1' }, newReport.id, { action: 'HIDE_PROFILE', decisionRationale: 'Validated harassment evidence' });
    expect(updated.status).toBe('ACTIONED');
    const hidden = await prisma.socialProfile.findUnique({ where: { id: 'sp-student-2' } });
    expect(hidden?.moderationState).toBe('HIDDEN_BY_MODERATION');
  });

  it('moderation-hidden profiles are excluded from discovery and cannot receive new requests', async () => {
    await prisma.socialProfile.update({ where: { id: 'sp-student-2' }, data: { moderationState: 'HIDDEN_BY_MODERATION' } });
    const items = await listDiscoveryProfiles(prisma, { role: 'STUDENT', userId: 'student-1' }, new URLSearchParams());
    expect(items.find((item) => item.id === 'sp-student-2')).toBeFalsy();
    await expect(requestConnection(prisma, { role: 'STUDENT', userId: 'student-3' }, 'sp-student-2')).rejects.toThrow('unavailable');
  });

  it('seed runs twice without unique constraint errors', async () => {
    await expect(seed()).resolves.toBeUndefined();
  });
});
