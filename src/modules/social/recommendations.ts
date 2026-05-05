import { PrismaClient } from '@prisma/client';
import { SocialForbiddenError, SocialNotFoundError, SocialValidationError } from './social-errors';

interface ActorContext { role: string; userId: string }

export type RecommendationCategory =
  | 'ACTIVITY' | 'FOOD' | 'TRANSPORT' | 'HOUSING' | 'BUREAUCRACY' | 'UNIVERSITY' | 'STUDY' | 'SAFETY' | 'GENERAL_TIP';

const allowedCategories: RecommendationCategory[] = ['ACTIVITY', 'FOOD', 'TRANSPORT', 'HOUSING', 'BUREAUCRACY', 'UNIVERSITY', 'STUDY', 'SAFETY', 'GENERAL_TIP'];

function ensureStudent(role: string) { if (role !== 'STUDENT') throw new SocialForbiddenError(); }

async function requireProfile(prisma: PrismaClient, userId: string) {
  const profile = await prisma.socialProfile.findUnique({ where: { userId } });
  if (!profile) throw new SocialNotFoundError('Social profile not found');
  return profile;
}

export async function listRecommendations(prisma: PrismaClient, actor: ActorContext, filters: URLSearchParams) {
  ensureStudent(actor.role);
  await requireProfile(prisma, actor.userId);
  return prisma.cityRecommendation.findMany({
    where: {
      visibility: 'VISIBLE',
      moderationState: 'ACTIVE',
      ...(filters.get('city') ? { city: filters.get('city')! } : {}),
      ...(filters.get('category') ? { category: filters.get('category')! } : {}),
    },
    orderBy: [{ city: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, title: true, description: true, category: true, city: true, country: true, addressLabel: true, approximateLatitude: true, approximateLongitude: true, createdAt: true },
  });
}

export async function createRecommendation(prisma: PrismaClient, actor: ActorContext, payload: { title?: string; description?: string; category?: string; city?: string; country?: string; addressLabel?: string; approximateLatitude?: number; approximateLongitude?: number; }) {
  ensureStudent(actor.role);
  const profile = await requireProfile(prisma, actor.userId);
  const title = payload.title?.trim();
  const description = payload.description?.trim();
  const category = payload.category?.trim() as RecommendationCategory | undefined;
  const city = payload.city?.trim();
  const country = payload.country?.trim();
  const addressLabel = payload.addressLabel?.trim();
  if (!title || !description || !category || !city || !country || !addressLabel) throw new SocialValidationError('Missing required fields');
  if (!allowedCategories.includes(category)) throw new SocialValidationError('Invalid category');
  return prisma.cityRecommendation.create({ data: { id: `srec-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdByProfileId: profile.id, title, description, category, city, country, addressLabel, approximateLatitude: payload.approximateLatitude ?? null, approximateLongitude: payload.approximateLongitude ?? null, visibility: 'VISIBLE', moderationState: 'ACTIVE' } });
}

export async function getRecommendationMapItems(prisma: PrismaClient, actor: ActorContext, filters: URLSearchParams) {
  ensureStudent(actor.role);
  await requireProfile(prisma, actor.userId);
  return prisma.cityRecommendation.findMany({
    where: {
      visibility: 'VISIBLE', moderationState: 'ACTIVE',
      ...(filters.get('city') ? { city: filters.get('city')! } : {}),
      ...(filters.get('category') ? { category: filters.get('category')! } : {}),
    },
    orderBy: [{ city: 'asc' }, { title: 'asc' }],
    select: { id: true, title: true, category: true, city: true, country: true, addressLabel: true, approximateLatitude: true, approximateLongitude: true, description: true },
  });
}

export async function reportRecommendation(prisma: PrismaClient, actor: ActorContext, recommendationId: string, reason: string, details?: string) {
  ensureStudent(actor.role);
  const reporter = await requireProfile(prisma, actor.userId);
  const recommendation = await prisma.cityRecommendation.findUnique({ where: { id: recommendationId } });
  if (!recommendation || recommendation.visibility !== 'VISIBLE' || recommendation.moderationState !== 'ACTIVE') throw new SocialValidationError('Recommendation is unavailable');
  if (recommendation.createdByProfileId === reporter.id) throw new SocialValidationError('You cannot report your own recommendation');
  return prisma.socialReport.create({ data: { id: `sreport-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, reporterProfileId: reporter.id, targetRecommendationId: recommendation.id, reason: reason.trim(), details: details?.trim() || null, status: 'PENDING' } });
}
