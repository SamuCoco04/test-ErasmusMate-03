import { describe, expect, it } from 'vitest';

import { POST } from '../../app/api/demo-context/route';
import { parseDemoContextCookie, normalizeDemoContext } from '../../src/modules/shared/demo-context';

describe('demo context foundation', () => {
  it('normalizes invalid role payload to default student context', () => {
    expect(normalizeDemoContext({ role: 'INVALID', userId: 'x' } as never)).toEqual({
      role: 'STUDENT',
      userId: 'student-1',
    });
  });

  it('forces seeded user id for a selected valid role', () => {
    expect(normalizeDemoContext({ role: 'COORDINATOR', userId: 'something-else' })).toEqual({
      role: 'COORDINATOR',
      userId: 'coordinator-1',
    });
  });

  it('parses malformed cookies safely', () => {
    expect(parseDemoContextCookie('not-json')).toEqual({ role: 'STUDENT', userId: 'student-1' });
  });

  it('updates context via demo-context API and sets httpOnly cookie', async () => {
    const request = new Request('http://localhost/api/demo-context', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: 'ADMIN' }),
    });

    const response = await POST(request);
    const payload = await response.json();
    const setCookie = response.headers.get('set-cookie');

    expect(payload.context).toEqual({ role: 'ADMIN', userId: 'admin-1' });
    expect(setCookie).toContain('erasmusmate_demo_context=');
    expect(setCookie).toContain('HttpOnly');
  });
});
