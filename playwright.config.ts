import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: false,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'on-first-retry'
  },
  // Guard against the previous baseline bug where Playwright attempted `npm run dev`
  // despite this repository not defining a dev script yet.
  webServer: undefined
});
