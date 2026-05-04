import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: false,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'on-first-retry'
  },
  // webServer is disabled by default (no app exists in Phase 1).
  // Set PLAYWRIGHT_START_SERVER=1 once the Next.js app is scaffolded
  // so Playwright can automatically start it with `npm run dev`.
  webServer: process.env.PLAYWRIGHT_START_SERVER
    ? {
        command: 'npm run dev',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: true,
        timeout: 120_000
      }
    : undefined
});
