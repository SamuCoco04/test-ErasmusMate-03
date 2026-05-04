import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('Coordinator Learning Agreement review UI shell', () => {
  it('exposes coordinator route with required page title', () => {
    const page = readFileSync('app/(institutional)/coordinator/learning-agreement-review/page.tsx', 'utf8');
    expect(page.includes('Learning Agreement Review')).toBe(true);
    expect(page.includes('AAT')).toBe(false);
  });

  it('coordinator navigation links to learning agreement review route', () => {
    const layout = readFileSync('app/(institutional)/coordinator/layout.tsx', 'utf8');
    const dashboard = readFileSync('app/(institutional)/coordinator/dashboard/page.tsx', 'utf8');
    expect(layout.includes('/coordinator/learning-agreement-review')).toBe(true);
    expect(dashboard.includes('/coordinator/learning-agreement-review')).toBe(true);
  });

  it('uses human-friendly learning agreement labels', () => {
    const labels = readFileSync('src/modules/institutional/status-labels.ts', 'utf8');
    expect(labels.includes('IN_REVIEW')).toBe(true);
    expect(labels.includes("'In review'")).toBe(true);
    expect(labels.includes("'Needs changes'")).toBe(true);
  });
});
