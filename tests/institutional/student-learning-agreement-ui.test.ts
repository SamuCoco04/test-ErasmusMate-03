import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('Student Learning Agreement UI shell', () => {
  it('exposes student page with user-friendly title', () => {
    const page = readFileSync('app/(institutional)/student/learning-agreement/page.tsx', 'utf8');
    expect(page.includes('My Learning Agreement')).toBe(true);
    expect(page.includes('AAT')).toBe(false);
  });

  it('student editor form does not expose grade field', () => {
    const editor = readFileSync('src/components/student-learning-agreement-editor.tsx', 'utf8');
    expect(editor.includes('grade')).toBe(false);
  });

  it('student navigation does not use broken institutional learning agreement path', () => {
    const layout = readFileSync('app/(institutional)/student/layout.tsx', 'utf8');
    const dashboard = readFileSync('app/(institutional)/student/dashboard/page.tsx', 'utf8');
    const summary = readFileSync('app/(institutional)/student/academic-summary/page.tsx', 'utf8');
    expect(layout.includes('/student/learning-agreement')).toBe(true);
    expect(dashboard.includes('/student/learning-agreement')).toBe(true);
    expect(layout.includes('/student/academic-summary')).toBe(true);
    expect(dashboard.includes('/student/academic-summary')).toBe(true);
    expect(layout.includes('/student/institutional/learning-agreement')).toBe(false);
    expect(dashboard.includes('/student/institutional/learning-agreement')).toBe(false);
    expect(summary.includes('No approved courses yet')).toBe(true);
    expect(summary.includes('Total ECTS')).toBe(true);
    expect(summary.includes('Not recorded')).toBe(true);
    expect(summary.includes('rowKey')).toBe(false);
    expect(summary.includes('isLatest')).toBe(false);
  });
});
