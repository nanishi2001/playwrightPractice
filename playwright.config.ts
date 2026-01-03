import { defineConfig, devices } from '@playwright/test';

// Constants
const BASE_URL = process.env.BASE_URL ?? 'https://hotel-example-site.takeyaqa.dev';
const DEFAULT_RETRIES = 0;
const CI_RETRIES = 2;
const CI_WORKERS = 1;

// Computed constants
const IS_CI = process.env.CI !== undefined;
const RETRIES = IS_CI ? CI_RETRIES : DEFAULT_RETRIES;
const WORKERS = IS_CI ? CI_WORKERS : undefined;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: IS_CI,
  retries: RETRIES,
  workers: WORKERS,
  reporter: IS_CI
    ? [['list'], ['html', { open: 'never' }], ['@estruyf/github-actions-reporter']]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-all-retries',
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'cd test-target && pnpm start',
    port: 8080,
    reuseExistingServer: !IS_CI,
  },
});
