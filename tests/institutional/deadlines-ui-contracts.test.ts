import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const studentPage = readFileSync('app/(institutional)/student/deadlines/page.tsx', 'utf8');
const coordinatorPage = readFileSync('app/(institutional)/coordinator/deadlines/page.tsx', 'utf8');

describe('Phase 6C deadline UI contracts', () => {
  it('student page contains deadline filters and export action', () => {
    expect(studentPage).toContain("['all','upcoming','overdue','fulfilled','overridden']");
    expect(studentPage).toContain('Export calendar');
    expect(studentPage).toContain('Effective due date');
  });

  it('coordinator page contains risk visibility and export action', () => {
    expect(coordinatorPage).toContain('Overdue first');
    expect(coordinatorPage).toContain('Overridden');
    expect(coordinatorPage).toContain('Exception related');
    expect(coordinatorPage).toContain('Export calendar');
  });
});
