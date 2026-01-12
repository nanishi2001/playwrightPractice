import { defineConfig, devices } from '@playwright/test';

// Constants
const TEST_ENV = process.env.TEST_ENV ?? 'dev';
const BASE_URL =
  TEST_ENV === 'local' ? 'http://localhost:8080' : 'https://hotel-example-site.takeyaqa.dev';
const DEFAULT_RETRIES = 0;
const CI_RETRIES = 2;
const CI_WORKERS = 2;

const IS_CI = process.env.CI !== undefined;
const RETRIES = IS_CI ? CI_RETRIES : DEFAULT_RETRIES;
const WORKERS = IS_CI ? CI_WORKERS : undefined;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: IS_CI,
  retries: RETRIES,
  workers: WORKERS,

  timeout: 30_000,
  expect: {
    timeout: 5000,
  },

  reporter: IS_CI
    ? [['list'], ['html', { open: 'never' }], ['@estruyf/github-actions-reporter']]
    : [['list'], ['html', { open: 'never' }]],

  use: {
    trace: 'on-first-retry',
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 10_000,
    actionTimeout: 10_000,
    launchOptions: IS_CI
      ? {
          args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox',
          ],
        }
      : {},
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer:
    TEST_ENV === 'local'
      ? {
          command: 'cd test-target && pnpm install && pnpm run build && pnpm start',
          port: 8080,
          reuseExistingServer: !IS_CI,
          timeout: 120_000,
        }
      : undefined,
});
