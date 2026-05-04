import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const connectionsPage = readFileSync('app/(social)/social/student/connections/page.tsx', 'utf8');
const discoveryPage = readFileSync('app/(social)/social/student/discovery/page.tsx', 'utf8');
const messagesPage = readFileSync('app/(social)/social/student/messages/page.tsx', 'utf8');

describe('Social UI hardening contracts', () => {
  it('connections page has clear sections and supports blocking from requests and accepted rows', () => {
    expect(connectionsPage).toContain('Requests received');
    expect(connectionsPage).toContain('Requests sent');
    expect(connectionsPage).toContain('Connected students');
    expect(connectionsPage).not.toContain('& {c.receiverProfile.displayName}');
    expect(connectionsPage).toContain('window.confirm(');
    expect(connectionsPage).toContain('Message');
    expect(connectionsPage).toContain("act(c.id, 'block')");
  });

  it('discovery page uses safe contact labels and guarded send request action', () => {
    expect(discoveryPage).toContain('Available to request');
    expect(discoveryPage).toContain('Connections only');
    expect(discoveryPage).toContain("p.connectionStatus === 'NOT_CONNECTED' && p.contactPreference === 'OPEN_TO_REQUESTS'");
    expect(discoveryPage).not.toContain('moderationState');
    expect(discoveryPage).not.toContain('pairKey');
  });

  it('messages page uses other names and blocks empty messages', () => {
    expect(messagesPage).toContain('otherProfile.displayName');
    expect(messagesPage).toContain('latestMessage?.body');
    expect(messagesPage).toContain('Please write a message before sending.');
    expect(messagesPage).toContain('disabled={!body.trim()}');
  });
});
