import { prisma } from '@/src/lib/prisma';
import { DemoContext } from '@/src/modules/shared/demo-context';

export type ActivityFeedItem = {
  id: string;
  area: 'INSTITUTIONAL' | 'SOCIAL';
  type: string;
  title: string;
  summary: string;
  actorId: string | null;
  actorLabel: string | null;
  entityType: string;
  entityId: string;
  timestamp: string;
};

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function clampLimit(limit?: number) {
  if (!limit || Number.isNaN(limit)) return DEFAULT_LIMIT;
  return Math.max(1, Math.min(MAX_LIMIT, Math.floor(limit)));
}

function parseAuditDetails(details: string): Record<string, unknown> {
  try { return JSON.parse(details) as Record<string, unknown>; } catch { return {}; }
}

export async function getActivityFeed(ctx: DemoContext, limit?: number): Promise<ActivityFeedItem[]> {
  const take = clampLimit(limit);
  const userIds = await prisma.user.findMany({ select: { id: true, displayName: true } });
  const userLabel = new Map(userIds.map((u) => [u.id, u.displayName]));

  let mobilityScope: string[] = [];
  if (ctx.role === 'STUDENT') {
    const records = await prisma.mobilityRecord.findMany({ where: { studentId: ctx.userId }, select: { id: true } });
    mobilityScope = records.map((r) => r.id);
  } else if (ctx.role === 'COORDINATOR') {
    const records = await prisma.mobilityRecord.findMany({ where: { coordinatorId: ctx.userId }, select: { id: true } });
    mobilityScope = records.map((r) => r.id);
  }

  const auditWhere = ctx.role === 'ADMIN' ? {} : { mobilityRecordId: { in: mobilityScope } };
  const auditRecords = await prisma.auditRecord.findMany({ where: auditWhere, orderBy: { createdAt: 'desc' }, take });

  const laEvents = await prisma.learningAgreementEvent.findMany({
    where: ctx.role === 'ADMIN'
      ? {}
      : ctx.role === 'STUDENT'
        ? { agreement: { studentId: ctx.userId } }
        : { agreement: { coordinatorId: ctx.userId } },
    orderBy: { createdAt: 'desc' },
    take,
  });

  const socialReports = ctx.role === 'ADMIN'
    ? await prisma.socialReport.findMany({ orderBy: { updatedAt: 'desc' }, take })
    : [];

  const feed: ActivityFeedItem[] = [
    ...auditRecords.map((item) => {
      const details = parseAuditDetails(item.details);
      const entityType = typeof details.targetType === 'string' ? details.targetType : 'MobilityRecord';
      const entityId = typeof details.targetId === 'string' ? details.targetId : item.mobilityRecordId;
      return {
        id: `audit:${item.id}`,
        area: 'INSTITUTIONAL' as const,
        type: item.eventType,
        title: item.eventType.replaceAll('_', ' '),
        summary: `Institutional workflow update for ${entityType}.`,
        actorId: item.actorId,
        actorLabel: userLabel.get(item.actorId) ?? null,
        entityType,
        entityId,
        timestamp: item.createdAt.toISOString(),
      };
    }),
    ...laEvents.map((item) => ({
      id: `la:${item.id}`,
      area: 'INSTITUTIONAL' as const,
      type: `LEARNING_AGREEMENT_${item.actionType.toUpperCase()}`,
      title: 'Learning Agreement updated',
      summary: 'Learning Agreement workflow action recorded.',
      actorId: item.actorId,
      actorLabel: userLabel.get(item.actorId) ?? null,
      entityType: 'LearningAgreement',
      entityId: item.agreementId,
      timestamp: item.createdAt.toISOString(),
    })),
    ...socialReports.flatMap((item) => {
      const rows: ActivityFeedItem[] = [{
        id: `sreport-created:${item.id}`,
        area: 'SOCIAL',
        type: 'SOCIAL_REPORT_CREATED',
        title: 'Social report created',
        summary: 'A social report was submitted for moderation review.',
        actorId: null,
        actorLabel: null,
        entityType: 'SocialReport',
        entityId: item.id,
        timestamp: item.createdAt.toISOString(),
      }];
      if (item.reviewedAt) {
        rows.push({
          id: `sreport-reviewed:${item.id}`,
          area: 'SOCIAL',
          type: `SOCIAL_REPORT_${item.status}`,
          title: 'Social moderation action',
          summary: 'A moderation decision was recorded.',
          actorId: item.reviewedById,
          actorLabel: item.reviewedById ? (userLabel.get(item.reviewedById) ?? null) : null,
          entityType: 'SocialReport',
          entityId: item.id,
          timestamp: item.reviewedAt.toISOString(),
        });
      }
      return rows;
    }),
  ];

  return feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, take);
}
