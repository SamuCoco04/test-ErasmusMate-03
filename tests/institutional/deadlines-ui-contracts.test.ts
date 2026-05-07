import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const studentPage = readFileSync('app/(institutional)/student/deadlines/page.tsx', 'utf8');
const coordinatorPage = readFileSync('app/(institutional)/coordinator/deadlines/page.tsx', 'utf8');

describe('Phase 8D deadline UI contracts', () => {
  it('student page contains deadline filters, export action, and calendar section', () => {
    expect(studentPage).toContain("['all','upcoming','due-soon','overdue','fulfilled','overridden']");
    expect(studentPage).toContain('Export calendar');
    expect(studentPage).toContain('Effective due date');
    expect(studentPage).toContain('Deadline calendar (read-only)');
    expect(studentPage).toContain('Upcoming deadlines');
  });

  it('coordinator page contains risk visibility and export action', () => {
    expect(coordinatorPage).toContain('Overdue first');
    expect(coordinatorPage).toContain('Overridden');
    expect(coordinatorPage).toContain('Exception related');
    expect(coordinatorPage).toContain('Export calendar');
  });

  it('student and coordinator pages include empty-state copy and internal-ID-safe copy', () => {
    expect(studentPage).toContain('No deadlines match the current filter.');
    expect(studentPage).toContain('Original due date');
    expect(studentPage).not.toContain('dead-');
    expect(coordinatorPage).toContain('No assigned deadlines for this filter.');
    expect(coordinatorPage).toContain('Risk:');
  });
});
