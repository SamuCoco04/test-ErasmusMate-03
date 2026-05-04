import { describe, expect, it } from 'vitest';

import { POST } from '../../app/api/demo-context/route';

describe('Smoke checks (foundation)', () => {
  it.skip('app home loads (requires browser/server harness)', () => {});
  it.skip('student dashboard route loads (requires browser/server harness)', () => {});
  it.skip('coordinator dashboard route loads (requires browser/server harness)', () => {});
  it.skip('admin dashboard route loads (requires browser/server harness)', () => {});
  it.skip('social student dashboard route loads (requires browser/server harness)', () => {});

  it('demo context API can update selected role', async () => {
    const response = await POST(
      new Request('http://localhost/api/demo-context', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ role: 'STUDENT' }),
      })
    );

    const payload = await response.json();
    expect(payload.context.role).toBe('STUDENT');
    expect(payload.context.userId).toBe('student-1');
  });
});
