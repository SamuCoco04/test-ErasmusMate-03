import { PrismaClient } from '@prisma/client';
import { SocialForbiddenError, SocialNotFoundError } from './social-errors';
import type { SocialProfileRow, SocialDiscoveryItem } from './types';

function ensureStudent(role: string) {
	if (role !== 'STUDENT') throw new SocialForbiddenError();
}

const mapPublic = (p: SocialProfileRow): SocialDiscoveryItem => ({
	id: p.id,
	displayName: p.displayName,
	homeCity: p.homeCity,
	hostCity: p.hostCity,
	hostCountry: p.hostCountry,
	homeInstitutionName: p.homeInstitutionName,
	hostInstitutionName: p.hostInstitutionName,
	studyArea: p.studyArea,
	mobilityPhase: p.mobilityPhase,
	languages: JSON.parse(p.languagesJson || '[]') as string[],
	interests: JSON.parse(p.interestsJson || '[]') as string[],
	bio: p.bio,
	contactPreference: p.contactPreference,
});

export async function listDiscoveryProfiles(prisma: PrismaClient, actor: { role: string; userId: string }, filters: URLSearchParams) {
	ensureStudent(actor.role);
	const rows = await prisma.socialProfile.findMany({
		where: {
			userId: { not: actor.userId },
			visibility: 'VISIBLE',
			moderationState: 'ACTIVE',
			...(filters.get('hostCity') ? { hostCity: filters.get('hostCity')! } : {}),
			...(filters.get('studyArea') ? { studyArea: filters.get('studyArea')! } : {}),
		},
		orderBy: [{ hostCity: 'asc' }, { displayName: 'asc' }],
	});

	const language = filters.get('language')?.toLowerCase();
	const interest = filters.get('interest')?.toLowerCase();

	return rows
		.filter((r) => !language || (JSON.parse(r.languagesJson || '[]') as string[]).some((l) => l.toLowerCase() === language))
		.filter((r) => !interest || (JSON.parse(r.interestsJson || '[]') as string[]).some((i) => i.toLowerCase() === interest))
		.map(mapPublic);
}

export async function getDiscoveryProfileDetail(prisma: PrismaClient, actor: { role: string; userId: string }, profileId: string) {
	ensureStudent(actor.role);
	const p = await prisma.socialProfile.findFirst({
		where: { id: profileId, userId: { not: actor.userId }, visibility: 'VISIBLE', moderationState: 'ACTIVE' },
	});
	if (!p) throw new SocialNotFoundError();
	return mapPublic(p as SocialProfileRow);
}
