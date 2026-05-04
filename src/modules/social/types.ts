import type { SocialProfile as PrismaSocialProfile } from '@prisma/client';

export type SocialProfileRow = PrismaSocialProfile;

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
}
