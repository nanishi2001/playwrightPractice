import { expect, test } from '@playwright/test';

// Constants
const PATH = '/';
const EXPECTED_TITLE_REGEX = /HOTEL PLANISPHERE/;

test('Home page should load successfully', async ({ page }) => {
  await page.goto(PATH);
  await expect(page).toHaveTitle(EXPECTED_TITLE_REGEX);
});
