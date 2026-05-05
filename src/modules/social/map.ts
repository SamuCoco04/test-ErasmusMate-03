import { PrismaClient } from '@prisma/client';
import { SocialForbiddenError, SocialNotFoundError } from './social-errors';
import { getConnectionStateForProfile } from './connections';

function ensureStudent(role: string) {
  if (role !== 'STUDENT') throw new SocialForbiddenError();
}

export interface SocialMapItem {
  profileId: string;
  displayName: string;
  hostCity: string | null;
  hostCountry: string | null;
  studyArea: string | null;
  mobilityPhase: string | null;
  approximateLatitude: number | null;
  approximateLongitude: number | null;
  connectionStatus: 'CONNECTED' | 'OPEN_TO_REQUESTS' | 'CONNECTIONS_ONLY' | 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'BLOCKED';
}

export async function listMapProfiles(prisma: PrismaClient, actor: { role: string; userId: string }, filters: URLSearchParams): Promise<SocialMapItem[]> {
  ensureStudent(actor.role);
  const me = await prisma.socialProfile.findUnique({ where: { userId: actor.userId } });
  if (!me) throw new SocialNotFoundError('Social profile not found');

  const rows = await prisma.socialProfile.findMany({
    where: {
      id: { not: me.id },
      visibility: 'VISIBLE',
      moderationState: 'ACTIVE',
      mapVisibility: 'CITY_ONLY',
      ...(filters.get('hostCity') ? { hostCity: filters.get('hostCity')! } : {}),
      ...(filters.get('studyArea') ? { studyArea: filters.get('studyArea')! } : {}),
    },
    orderBy: [{ hostCity: 'asc' }, { displayName: 'asc' }],
  });

  return Promise.all(
    rows.map(async (row) => {
      const state = await getConnectionStateForProfile(prisma, actor, row.id);
      if (state === 'AVAILABLE_TO_REQUEST') {
        return {
          profileId: row.id,
          displayName: row.displayName,
          hostCity: row.hostCity,
          hostCountry: row.hostCountry,
          studyArea: row.studyArea,
          mobilityPhase: row.mobilityPhase,
          approximateLatitude: row.approximateLatitude,
          approximateLongitude: row.approximateLongitude,
          connectionStatus: row.contactPreference === 'CONNECTIONS_ONLY' ? 'CONNECTIONS_ONLY' : 'OPEN_TO_REQUESTS',
        };
      }

      return {
        profileId: row.id,
        displayName: row.displayName,
        hostCity: row.hostCity,
        hostCountry: row.hostCountry,
        studyArea: row.studyArea,
        mobilityPhase: row.mobilityPhase,
        approximateLatitude: row.approximateLatitude,
        approximateLongitude: row.approximateLongitude,
        connectionStatus: state,
      };
    }),
  );
}
