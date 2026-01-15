import { expect, test } from '../pages/fixtures.js';

test.describe('Top Page', () => {
  test('Page title matches', async ({ page, homePage }) => {
    await homePage.navigateToHome(page);
    await expect(page).toHaveTitle(homePage.HOME_PAGE_TITLE);
  });
});
