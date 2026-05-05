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

export type DiscoveryConnectionStatus = 'AVAILABLE_TO_REQUEST' | 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'CONNECTED' | 'BLOCKED' | 'UNAVAILABLE';

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
  contactPreferenceLabel?: string;
  connectionStatus: DiscoveryConnectionStatus;
  unavailableReason?: 'CONTACT_PREFERENCE_CONNECTIONS_ONLY' | 'CONTACT_PREFERENCE_HIDDEN' | null;
}

export type ConnectionCategory = 'incomingPending' | 'outgoingPending' | 'accepted' | 'unavailable';

export interface SafeConnectionItem {
  connectionId: string;
  state: string;
  category: ConnectionCategory;
  otherProfile: {
    id: string;
    displayName: string;
    hostCity: string | null;
    hostCountry: string | null;
    studyArea: string | null;
  };
  allowedActions: {
    accept: boolean;
    reject: boolean;
    cancel: boolean;
    message: boolean;
    block: boolean;
    unblock: boolean;
  };
}

export interface ConnectionListsResponse {
  incomingPending: SafeConnectionItem[];
  outgoingPending: SafeConnectionItem[];
  accepted: SafeConnectionItem[];
  unavailable: SafeConnectionItem[];
}

export interface ConnectionTransitionPayload {
  action: 'accept' | 'reject' | 'cancel' | 'block' | 'unblock';
}
