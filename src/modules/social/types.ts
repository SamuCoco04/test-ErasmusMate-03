import type { SocialConnection as PrismaSocialConnection, SocialProfile as PrismaSocialProfile } from '@prisma/client';

export type SocialProfileRow = PrismaSocialProfile;
export type SocialConnectionRow = PrismaSocialConnection;

export interface SocialProfileDTO {
  id?: string;
  userId?: string;
  displayName: string;
  homeCity: string | null;
  hostCity: string | null;
  hostCountry: string | null;
  homeInstitutionName: string | null;
  hostInstitutionName: string | null;
  studyArea: string | null;
  mobilityPhase: string | null;
  languages: string[];
  interests: string[];
  bio: string | null;
  visibility?: string;
  contactPreference?: string;
}

export type DiscoveryConnectionStatus = 'NOT_CONNECTED' | 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'CONNECTED' | 'BLOCKED' | 'UNAVAILABLE';

export interface SocialDiscoveryItem {
  id: string;
  displayName: string;
  homeCity?: string | null;
  hostCity?: string | null;
  hostCountry?: string | null;
  homeInstitutionName?: string | null;
  hostInstitutionName?: string | null;
  studyArea?: string | null;
  mobilityPhase?: string | null;
  languages: string[];
  interests: string[];
  bio?: string | null;
  contactPreference?: string;
  connectionStatus?: DiscoveryConnectionStatus;
}

export interface ConnectionListItem {
  id: string;
  state: string;
  requestedAt: Date;
  respondedAt?: Date | null;
  blockedAt?: Date | null;
  requesterProfile: SocialProfileRow;
  receiverProfile: SocialProfileRow;
}

export interface ConnectionListsResponse {
  incomingPending: ConnectionListItem[];
  outgoingPending: ConnectionListItem[];
  accepted: ConnectionListItem[];
  unavailable: ConnectionListItem[];
}

export interface ConnectionTransitionPayload {
  action: 'accept' | 'reject' | 'cancel' | 'block';
}
