import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { seed } from '@/prisma/seed';
import { createSocialReport, listSocialReports, transitionSocialReport } from '@/src/modules/social/moderation';
import { listDiscoveryProfiles } from '@/src/modules/social/discovery';
import { requestConnection } from '@/src/modules/social/connections';

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
  it('coordinator cannot access admin moderation routes', async () => {
    await expect(listSocialReports(prisma, { role: 'COORDINATOR', userId: 'coordinator-1' })).rejects.toThrow('Forbidden');
  });

  it('admin can list reports and dismiss pending report', async () => {
    const reports = await listSocialReports(prisma, { role: 'ADMIN', userId: 'admin-1' });
    expect(reports.some((report) => report.status === 'PENDING')).toBe(true);
    const updated = await transitionSocialReport(prisma, { role: 'ADMIN', userId: 'admin-1' }, 'sreport-seed-1', { action: 'DISMISS', decisionRationale: 'Insufficient evidence' });
    expect(updated.status).toBe('DISMISSED');
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
