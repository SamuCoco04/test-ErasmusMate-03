import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('Student dashboard copy hygiene', () => {
  it('does not expose raw route-like labels in dashboard cards', () => {
    const page = readFileSync('app/(institutional)/student/dashboard/page.tsx', 'utf8');
    expect(page).not.toContain('Open /student/');
    expect(page).not.toContain('Open /coordinator/');
  });
});
