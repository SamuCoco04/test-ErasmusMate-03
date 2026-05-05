import { PrismaClient } from '@prisma/client';
import { SocialForbiddenError, SocialNotFoundError } from './social-errors';
import type { SocialProfileRow, SocialDiscoveryItem, DiscoveryConnectionStatus } from './types';
import { getConnectionStateForProfile } from './connections';

function ensureStudent(role: string) { if (role !== 'STUDENT') throw new SocialForbiddenError(); }


function normalizeDiscoveryStatus(connectionStatus: DiscoveryConnectionStatus, contactPreference: string | null): DiscoveryConnectionStatus {
	if (['REQUEST_SENT', 'REQUEST_RECEIVED', 'CONNECTED', 'BLOCKED'].includes(connectionStatus)) return connectionStatus;
	if (contactPreference !== 'OPEN_TO_REQUESTS') return 'UNAVAILABLE';
	return 'AVAILABLE_TO_REQUEST';
}

function toContactPreferenceLabel(contactPreference: string | null): string {
	if (contactPreference === 'CONNECTIONS_ONLY') return 'Connections only';
	if (contactPreference === 'HIDDEN') return 'Unavailable';
	return 'Open to requests';
}

const mapPublic = (p: SocialProfileRow): Omit<SocialDiscoveryItem, 'connectionStatus'> => ({
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
	contactPreferenceLabel: toContactPreferenceLabel(p.contactPreference),
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

  const items = rows
		.filter((r) => !language || (JSON.parse(r.languagesJson || '[]') as string[]).some((l) => l.toLowerCase() === language))
		.filter((r) => !interest || (JSON.parse(r.interestsJson || '[]') as string[]).some((i) => i.toLowerCase() === interest))
		.map(mapPublic);

  return Promise.all(items.map(async (item) => {
		const rawStatus = await getConnectionStateForProfile(prisma, actor, item.id);
		return { ...item, connectionStatus: normalizeDiscoveryStatus(rawStatus, item.contactPreference ?? null) };
	}));
}

export async function getDiscoveryProfileDetail(prisma: PrismaClient, actor: { role: string; userId: string }, profileId: string) {
	ensureStudent(actor.role);
	const p = await prisma.socialProfile.findFirst({
		where: { id: profileId, userId: { not: actor.userId }, visibility: 'VISIBLE', moderationState: 'ACTIVE' },
	});
	if (!p) throw new SocialNotFoundError();
	const mapped = mapPublic(p as SocialProfileRow);
	const rawStatus = await getConnectionStateForProfile(prisma, actor, p.id);
	return { ...mapped, connectionStatus: normalizeDiscoveryStatus(rawStatus, mapped.contactPreference ?? null) };
}
