import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const uiReadme = readFileSync('src/components/ui/README.md', 'utf8');
const pageShellSource = readFileSync('src/components/layout/page-shell.tsx', 'utf8');
const studentDashboardSource = readFileSync('app/(institutional)/student/dashboard/page.tsx', 'utf8');
const coordinatorDashboardSource = readFileSync('app/(institutional)/coordinator/dashboard/page.tsx', 'utf8');
const adminDashboardSource = readFileSync('app/(institutional)/admin/dashboard/page.tsx', 'utf8');

describe('Phase 7A design system foundation', () => {
  it('documents phase-scoped reusable UI foundation and deferred full redesign', () => {
    expect(uiReadme).toContain('Phase 7A UI Foundation');
    expect(uiReadme).toContain('deferred to Phase 7B/7C/7D');
  });

  it('defines reusable page shell and section header primitives', () => {
    expect(pageShellSource).toContain('export function PageShell');
    expect(pageShellSource).toContain('export function PageHeader');
    expect(pageShellSource).toContain('export function SectionHeader');
  });

  it('lightly migrates representative institutional dashboards to page shell foundation', () => {
    expect(studentDashboardSource).toContain('PageShell');
    expect(coordinatorDashboardSource).toContain('PageShell');
    expect(adminDashboardSource).toContain('PageShell');
  });
});
