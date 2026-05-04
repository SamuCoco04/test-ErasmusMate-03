import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('Routing and style configuration guards', () => {
  it('keeps social dashboard under explicit /social URL segment', () => {
    expect(existsSync('app/(social)/social/student/dashboard/page.tsx')).toBe(true);
    expect(existsSync('app/social/student/dashboard/page.tsx')).toBe(false);
  });

  it('links home social CTA to a real social dashboard route', () => {
    const homePage = require('node:fs').readFileSync('app/page.tsx', 'utf8');
    expect(homePage.includes('/social/student/dashboard')).toBe(true);
  });

  it('includes src components in Tailwind content globs', () => {
    const tailwindConfig = require('node:fs').readFileSync('tailwind.config.ts', 'utf8');
    expect(tailwindConfig.includes('./src/**/*.{js,ts,jsx,tsx,mdx}')).toBe(true);
  });
});
