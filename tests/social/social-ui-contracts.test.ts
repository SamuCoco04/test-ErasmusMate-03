import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const files = {
  dashboard: readFileSync('app/(social)/social/student/dashboard/page.tsx', 'utf8'),
  profile: readFileSync('app/(social)/social/student/profile/page.tsx', 'utf8'),
  discovery: readFileSync('app/(social)/social/student/discovery/page.tsx', 'utf8'),
  connections: readFileSync('app/(social)/social/student/connections/page.tsx', 'utf8'),
  messages: readFileSync('app/(social)/social/student/messages/page.tsx', 'utf8'),
  recommendations: readFileSync('app/(social)/social/student/recommendations/page.tsx', 'utf8'),
  map: readFileSync('app/(social)/social/student/map/page.tsx', 'utf8'),
  moderation: readFileSync('app/(institutional)/admin/social-moderation/page.tsx', 'utf8'),
};

describe('Phase 7C social UI contracts', () => {
  it('keeps social dashboard purpose and key routes visible', () => {
    expect(files.dashboard).toContain('Erasmus student support space');
    expect(files.dashboard).toContain('/social/student/profile');
    expect(files.dashboard).toContain('/social/student/discovery');
    expect(files.dashboard).toContain('/social/student/connections');
    expect(files.dashboard).toContain('/social/student/messages');
    expect(files.dashboard).toContain('/social/student/recommendations');
    expect(files.dashboard).toContain('/social/student/map');
  });

  it('shows profile privacy labels and avoids moderation internals', () => {
    expect(files.profile).toContain('Privacy overview');
    expect(files.profile).toContain('Visibility:');
    expect(files.profile).toContain('Contact preference:');
    expect(files.profile).toContain('Map visibility');
    expect(files.profile).not.toContain('moderationState');
  });

  it('shows discovery filters and safe status labels', () => {
    expect(files.discovery).toContain('Host city filter');
    expect(files.discovery).toContain('Study area filter');
    expect(files.discovery).toContain('Status:');
    expect(files.discovery).toContain('Report profile');
    expect(files.discovery).not.toContain('pairKey');
  });

  it('keeps connection lifecycle actions and accepted-only messaging cues', () => {
    expect(files.connections).toContain('Requests received');
    expect(files.connections).toContain('Requests sent');
    expect(files.connections).toContain('Connected students');
    expect(files.connections).toContain('Blocked connections');
    expect(files.connections).toContain('c.allowedActions.message ?');
    expect(files.messages).toContain('No accepted connections yet');
  });

  it('keeps recommendations/map/report affordances and admin moderation actions', () => {
    expect(files.recommendations).toContain('Create recommendation');
    expect(files.map).toContain('Create recommendation');
    expect(files.map).toContain('Click the map to place your recommendation marker.');
    expect(files.messages).toContain('Report');
    expect(files.moderation).toContain('Social moderation');
    expect(files.moderation).toContain('Profile report');
    expect(files.moderation).toContain('Message report');
    expect(files.moderation).toContain('Recommendation report');
    expect(files.moderation).toContain('Pending');
    expect(files.moderation).toContain('Actioned');
    expect(files.moderation).toContain('Dismissed');
    expect(files.moderation).toContain('Decision rationale');
    expect(files.moderation).toContain('Dismiss report');
    expect(files.moderation).toContain('Hide recommendation');
  });
});
