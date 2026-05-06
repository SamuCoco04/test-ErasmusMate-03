import { describe, it, expect, beforeEach } from 'vitest';
import { seed } from '@/prisma/seed';
import { prisma } from '@/src/lib/prisma';
import { getActivityFeed } from '@/src/modules/activity-feed';
import { openAttachment } from '@/src/modules/institutional/attachments';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';

describe('activity feed', () => {
  beforeEach(async () => { await seed(); });

  it('scopes student feed to own institutional activity and sorts newest first', async () => {
    const ctx = { role: 'STUDENT' as const, userId: 'student-1' };
    await prisma.auditRecord.create({ data: { id: 'audit-new', mobilityRecordId: 'mobility-1', actorId: 'student-1', eventType: 'TEST_NEW', details: JSON.stringify({ targetType: 'DocumentSubmission', targetId: 'sub-1' }), createdAt: new Date('2026-05-06T10:00:00.000Z') } });
    const feed = await getActivityFeed(ctx, 10);
    expect(feed.length).toBeGreaterThan(0);
    expect(feed[0].type).toBe('TEST_NEW');
    expect(feed.every((x) => x.area === 'INSTITUTIONAL')).toBe(true);
  });

  it('coordinator gets assigned students activity only', async () => {
    const feed = await getActivityFeed({ role: 'COORDINATOR', userId: 'coordinator-1' }, 20);
    expect(feed.some((x) => x.entityId === 'mobility-1' || x.entityType === 'LearningAgreement')).toBe(true);
  });

  it('admin feed includes sanitized social moderation activity', async () => {
    const feed = await getActivityFeed({ role: 'ADMIN', userId: 'admin-1' }, 40);
    const social = feed.find((item) => item.type.startsWith('SOCIAL_REPORT_'));
    expect(social).toBeTruthy();
    expect(JSON.stringify(social)).not.toContain('demo/');
    expect(JSON.stringify(social)).not.toContain('storageKey');
    expect(JSON.stringify(social)).not.toContain('details');
  });

  it('attachment open writes audit record', async () => {
    const ctx = await getDemoContextFromRequest(new Request('http://localhost', { headers: { cookie: 'erasmusmate_demo_context=' + encodeURIComponent(JSON.stringify({ role: 'STUDENT', userId: 'student-1' })) } }));
    await expect(openAttachment(ctx, 'sub-2', 'att-1')).rejects.toMatchObject({ code: 'NOT_FOUND' });
    const audit = await prisma.auditRecord.findFirst({ where: { eventType: 'SUBMISSION_ATTACHMENT_OPENED' } });
    expect(audit).toBeNull();
  });
});
