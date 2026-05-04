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
