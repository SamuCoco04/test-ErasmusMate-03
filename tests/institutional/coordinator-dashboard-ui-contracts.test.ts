import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const source = readFileSync('app/(institutional)/coordinator/dashboard/page.tsx', 'utf8');

describe('Coordinator dashboard UI contracts', () => {
  it('renders coordinator summary cards for operational workload', () => {
    expect(source).toContain('Assigned students');
    expect(source).toContain('Pending review');
    expect(source).toContain('In review');
    expect(source).toContain('Needs correction');
    expect(source).toContain('Overdue deadlines');
    expect(source).toContain('Pending exceptions');
  });

  it('includes assigned student workload overview and risk labels', () => {
    expect(source).toContain('Assigned student workload');
    expect(source).toContain('Risk: {item.riskLevel}');
    expect(source).toContain('Submissions — Submitted');
    expect(source).toContain('Pending exception:');
  });

  it('includes coordinator empty-state guidance when no records are assigned', () => {
    expect(source).toContain('No assigned mobility records yet.');
  });
});
