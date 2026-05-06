import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const homePage = readFileSync('app/page.tsx', 'utf8');
const studentLayout = readFileSync('app/(institutional)/student/layout.tsx', 'utf8');
const socialLayout = readFileSync('app/(social)/social/student/layout.tsx', 'utf8');
const coordinatorLayout = readFileSync('app/(institutional)/coordinator/layout.tsx', 'utf8');
const adminLayout = readFileSync('app/(institutional)/admin/layout.tsx', 'utf8');
const topBar = readFileSync('src/components/TopBar.tsx', 'utf8');
const studentDashboard = readFileSync('app/(institutional)/student/dashboard/page.tsx', 'utf8');
const adminDashboard = readFileSync('app/(institutional)/admin/dashboard/page.tsx', 'utf8');

const obsoleteCopyPatterns = [
  'will be connected in a later phase',
  'not implemented in this phase',
  'coming in next phases',
  'placeholders.'
];

describe('Navigation and role coherence contracts', () => {
  it('keeps global launcher links for all main role areas', () => {
    expect(homePage).toContain('/student/dashboard');
    expect(homePage).toContain('/social/student/dashboard');
    expect(homePage).toContain('/coordinator/dashboard');
    expect(homePage).toContain('/admin/dashboard');
  });

  it('keeps student institutional and social bridge links visible', () => {
    expect(studentLayout).toContain('Open social support');
    expect(studentLayout).toContain('/social/student/dashboard');
    expect(socialLayout).toContain('Back to official mobility');
    expect(socialLayout).toContain('/student/dashboard');
  });

  it('keeps a global return affordance in all main role layouts', () => {
    expect(topBar).toContain('Back to ErasmusMate home');
    expect(studentLayout).toContain('TopBar');
    expect(socialLayout).toContain('TopBar');
    expect(coordinatorLayout).toContain('TopBar');
    expect(adminLayout).toContain('TopBar');
  });

  it('uses human-readable role and area labels', () => {
    expect(studentLayout).toContain('Student institutional area');
    expect(socialLayout).toContain('Student social support');
    expect(coordinatorLayout).toContain('Coordinator workspace');
    expect(adminLayout).toContain('Admin console');
  });

  it('removes obsolete later-phase copy from key launcher and dashboard pages', () => {
    for (const pattern of obsoleteCopyPatterns) {
      expect(homePage).not.toContain(pattern);
      expect(studentDashboard).not.toContain(pattern);
      expect(adminDashboard).not.toContain(pattern);
    }
  });
});
