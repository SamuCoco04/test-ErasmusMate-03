import { PrismaClient, type SocialReport } from '@prisma/client';
import { SocialForbiddenError, SocialNotFoundError, SocialValidationError } from './social-errors';

interface ActorContext { role: string; userId: string }
interface CreateReportInput { targetProfileId?: string; targetMessageId?: string; reason: string; details?: string }
interface ReviewReportInput { action: 'DISMISS' | 'HIDE_PROFILE'; decisionRationale?: string }

function ensureStudent(role: string): void {
  if (role !== 'STUDENT') throw new SocialForbiddenError();
}

function ensureAdmin(role: string): void {
  if (role !== 'ADMIN') throw new SocialForbiddenError();
}

async function requireProfileByUser(prisma: PrismaClient, userId: string) {
  const profile = await prisma.socialProfile.findUnique({ where: { userId } });
  if (!profile) throw new SocialNotFoundError('Social profile not found');
  return profile;
}

export async function createSocialReport(prisma: PrismaClient, actor: ActorContext, input: CreateReportInput): Promise<SocialReport> {
  ensureStudent(actor.role);
  const reporter = await requireProfileByUser(prisma, actor.userId);
  const reason = input.reason?.trim();
  if (!reason) throw new SocialValidationError('Reason is required');
  if ((input.targetProfileId ? 1 : 0) + (input.targetMessageId ? 1 : 0) !== 1) throw new SocialValidationError('Report must target one profile or one message');

  if (input.targetProfileId) {
    if (input.targetProfileId === reporter.id) throw new SocialValidationError('You cannot report your own profile');
    const target = await prisma.socialProfile.findUnique({ where: { id: input.targetProfileId } });
    if (!target || target.visibility !== 'VISIBLE' || target.moderationState !== 'ACTIVE') throw new SocialValidationError('Target profile is unavailable');
    const existing = await prisma.socialReport.findFirst({ where: { reporterProfileId: reporter.id, targetProfileId: target.id, status: 'PENDING' } });
    if (existing) throw new SocialValidationError('You already have a pending report for this profile');
    return prisma.socialReport.create({ data: { id: `sreport-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, reporterProfileId: reporter.id, targetProfileId: target.id, reason, details: input.details?.trim() || null, status: 'PENDING' } });
  }

  const message = await prisma.socialMessage.findUnique({ where: { id: input.targetMessageId! }, include: { connection: true } });
  if (!message) throw new SocialNotFoundError('Message not found');
  const isParticipant = message.connection.requesterProfileId === reporter.id || message.connection.receiverProfileId === reporter.id;
  if (!isParticipant || message.connection.state !== 'ACCEPTED') throw new SocialForbiddenError();
  const existing = await prisma.socialReport.findFirst({ where: { reporterProfileId: reporter.id, targetMessageId: message.id, status: 'PENDING' } });
  if (existing) throw new SocialValidationError('You already have a pending report for this message');
  return prisma.socialReport.create({ data: { id: `sreport-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, reporterProfileId: reporter.id, targetMessageId: message.id, targetProfileId: message.senderProfileId, reason, details: input.details?.trim() || null, status: 'PENDING' } });
}

export async function listSocialReports(prisma: PrismaClient, actor: ActorContext): Promise<SocialReport[]> {
  ensureAdmin(actor.role);
  return prisma.socialReport.findMany({ orderBy: [{ status: 'asc' }, { createdAt: 'desc' }] });
}

export async function transitionSocialReport(prisma: PrismaClient, actor: ActorContext, reportId: string, input: ReviewReportInput): Promise<SocialReport> {
  ensureAdmin(actor.role);
  const report = await prisma.socialReport.findUnique({ where: { id: reportId } });
  if (!report) throw new SocialNotFoundError('Report not found');
  if (report.status !== 'PENDING') throw new SocialValidationError('Only pending reports can be reviewed');

  const decision = input.decisionRationale?.trim() || null;
  if (input.action === 'DISMISS') {
    return prisma.socialReport.update({ where: { id: reportId }, data: { status: 'DISMISSED', decisionRationale: decision, reviewedById: actor.userId, reviewedAt: new Date() } });
  }
  if (input.action === 'HIDE_PROFILE') {
    if (!report.targetProfileId) throw new SocialValidationError('Profile action requires a profile target');
    await prisma.socialProfile.update({ where: { id: report.targetProfileId }, data: { moderationState: 'HIDDEN_BY_MODERATION' } });
    return prisma.socialReport.update({ where: { id: reportId }, data: { status: 'ACTIONED', decisionRationale: decision, reviewedById: actor.userId, reviewedAt: new Date() } });
  }

  throw new SocialValidationError('Unknown review action');
}
