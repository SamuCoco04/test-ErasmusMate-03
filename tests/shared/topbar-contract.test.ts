import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const topBar = readFileSync('src/components/TopBar.tsx', 'utf8');

describe('topbar UI contracts', () => {
  it('keeps notification and profile affordances in top-right utilities', () => {
    expect(topBar).toContain('Open notifications');
    expect(topBar).toContain('Open profile');
    expect(topBar).toContain('aria-label="Open notifications"');
    expect(topBar).toContain('aria-label="Open profile"');
  });
});
