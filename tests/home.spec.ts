import { expect, test, type Page } from '@playwright/test';
import * as homePage from '../pages/home.page.js';

const beforeSetup = async (page: Readonly<Page>) => {
  await homePage.navigateToHome(page);
  return page;
};

test.describe('Top Page', () => {
  test('Page title matches', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    await expect(initializedPage).toHaveTitle(homePage.HOME_PAGE_TITLE);
  });
});
