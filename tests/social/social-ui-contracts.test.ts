import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const connectionsPage = readFileSync('app/(social)/social/student/connections/page.tsx', 'utf8');
const discoveryPage = readFileSync('app/(social)/social/student/discovery/page.tsx', 'utf8');
const messagesPage = readFileSync('app/(social)/social/student/messages/page.tsx', 'utf8');

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

  it('discovery page uses safe contact labels and guarded send request action', () => {
    expect(discoveryPage).toContain('Available to request');
    expect(discoveryPage).toContain('Connections only');
    expect(discoveryPage).toContain("p.connectionStatus === 'AVAILABLE_TO_REQUEST' && p.contactPreference === 'OPEN_TO_REQUESTS'");
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
});
