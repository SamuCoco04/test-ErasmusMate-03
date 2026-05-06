import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const homePage = readFileSync('app/page.tsx', 'utf8');
const topBar = readFileSync('src/components/TopBar.tsx', 'utf8');

describe('launcher UI contracts', () => {
  it('exposes stable launcher entries for demo role areas', () => {
    expect(homePage).toContain('Student Dashboard');
    expect(homePage).toContain('Coordinator Dashboard');
    expect(homePage).toContain('Admin Dashboard');
    expect(homePage).toContain('Student Social');
  });

  it('keeps launcher routes mapped to all major dashboard areas', () => {
    expect(homePage).toContain('/student/dashboard');
    expect(homePage).toContain('/coordinator/dashboard');
    expect(homePage).toContain('/admin/dashboard');
    expect(homePage).toContain('/social/student/dashboard');
  });

  it('keeps discoverable return to launcher from area top bar', () => {
    expect(topBar).toContain('Back to ErasmusMate home');
    expect(topBar).toContain('href="/"');
  });
});
