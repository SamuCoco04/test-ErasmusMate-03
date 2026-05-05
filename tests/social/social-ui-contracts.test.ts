import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const connectionsPage = readFileSync('app/(social)/social/student/connections/page.tsx', 'utf8');
const discoveryPage = readFileSync('app/(social)/social/student/discovery/page.tsx', 'utf8');
const messagesPage = readFileSync('app/(social)/social/student/messages/page.tsx', 'utf8');
const mapPage = readFileSync('app/(social)/social/student/map/page.tsx', 'utf8');
const dashboardPage = readFileSync('app/(social)/social/student/dashboard/page.tsx', 'utf8');
const layoutPage = readFileSync('app/(social)/social/student/layout.tsx', 'utf8');

describe('Social UI hardening contracts', () => {
  it('connections page has clear sections and supports blocking and unblocking from clear sections', () => {
    expect(connectionsPage).toContain('Requests received');
    expect(connectionsPage).toContain('Requests sent');
    expect(connectionsPage).toContain('Connected students');
    expect(connectionsPage).not.toContain('& {c.receiverProfile.displayName}');
    expect(connectionsPage).toContain('window.confirm(');
    expect(connectionsPage).toContain('Message');
    expect(connectionsPage).toContain('Block ${c.otherProfile.displayName}');
    expect(connectionsPage).not.toContain(' & ');
    expect(connectionsPage).toContain('c.allowedActions.message ?');
    expect(connectionsPage).toContain('c.allowedActions.block ?');
    expect(connectionsPage).toContain('c.allowedActions.unblock ?');
  });

  it('does not reference removed /student/social route', () => {
    const appFiles = [connectionsPage, discoveryPage, messagesPage, layoutPage];
    appFiles.forEach((fileText) => expect(fileText).not.toContain('/student/social'));
  });

  it('discovery page shows single status and separates contact preference from actions', () => {
    expect(discoveryPage).toContain("const canRequest = p.connectionStatus === 'AVAILABLE_TO_REQUEST';");
    expect(discoveryPage).toContain("const canMessage = p.connectionStatus === 'CONNECTED';");
    expect(discoveryPage).toContain('Status: {stateLabel[p.connectionStatus]}');
    expect(discoveryPage).toContain('Contact preference:');
    expect(discoveryPage).not.toContain('moderationState');
    expect(discoveryPage).not.toContain('pairKey');
  });

  it('messages page uses other names and blocks empty messages', () => {
    expect(messagesPage).toContain('otherProfile.displayName');
    expect(messagesPage).not.toContain('requesterProfile');
    expect(messagesPage).toContain('latestMessage?.body');
    expect(messagesPage).toContain('Please write a message before sending.');
    expect(messagesPage).toContain('disabled={!body.trim()}');
  });

  it('map discovery route and links are present with safe copy', () => {
    expect(layoutPage).toContain('Recommendations');
    expect(layoutPage).toContain('Map');
    expect(layoutPage).toContain('/social/student/map');
    expect(dashboardPage).toContain('Map');
    expect(dashboardPage).toContain('/social/student/map');
    expect(mapPage).toContain('recommendations map');
    expect(mapPage).toContain('Leaflet + OpenStreetMap');
    expect(mapPage).toContain('SocialRecommendationsMap');
    expect(mapPage).toContain('recommendationId');
    expect(mapPage).not.toContain('live location sharing');
    expect(mapPage).not.toContain('precise GPS');
  });
});
