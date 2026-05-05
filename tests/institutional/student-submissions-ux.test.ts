import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const studentSubmissionsClient = readFileSync('src/components/institutional/student-submissions-client.tsx', 'utf8');

describe('Student submissions UX contracts (Phase 6D)', () => {
  it('includes filters, search, and approved toggle controls', () => {
    expect(studentSubmissionsClient).toContain("{ label: 'All', states: [] }");
    expect(studentSubmissionsClient).toContain("{ label: 'Draft', states: ['DRAFT'] }");
    expect(studentSubmissionsClient).toContain("Submitted / Waiting for review");
    expect(studentSubmissionsClient).toContain("Needs correction / Rejected / Reopened");
    expect(studentSubmissionsClient).toContain('Search by procedure, reviewer note, or attachment filename');
    expect(studentSubmissionsClient).toContain('Show approved');
    expect(studentSubmissionsClient).toContain("if (!showApproved && s.state === 'APPROVED') return false;");
  });

  it('shows only valid student actions based on submission state', () => {
    expect(studentSubmissionsClient).toContain('const editable = EDITABLE_STATES.includes(s.state);');
    expect(studentSubmissionsClient).toContain("{s.state === 'DRAFT' && <button");
    expect(studentSubmissionsClient).toContain('{RESUBMIT_STATES.includes(s.state) && <button');
    expect(studentSubmissionsClient).toContain('{editable && <div className=\'mt-2 flex items-center gap-2\'>');
  });

  it('renders attachment affordances without leaking storage internals', () => {
    expect(studentSubmissionsClient).toContain('Open document');
    expect(studentSubmissionsClient).toContain('Demo metadata only');
    expect(studentSubmissionsClient).not.toContain('storageKey');
    expect(studentSubmissionsClient).not.toContain('/tmp/');
    expect(studentSubmissionsClient).not.toContain('local/');
  });
});
