import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: false,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'on-first-retry'
  }
  // Intentionally no `webServer` in Phase 1: there is no Next.js app scaffold yet.
  // Run against an externally started server by setting PLAYWRIGHT_BASE_URL.
});
