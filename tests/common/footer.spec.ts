import { expect, test, type Page } from '@playwright/test';
import * as footer from '../../pages/footer.component.js';
import * as homePage from '../../pages/home.page.js';

const beforeSetup = async (page: Readonly<Page>) => {
  await homePage.navigateToHome(page);
  return page;
};

test.describe('Footer (Common)', () => {
  test('GitHub link exists and has correct href', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    const footerLink = footer.getFooterLink(initializedPage);
    await expect(footerLink).toBeVisible();
    await expect(footerLink).toHaveAttribute('href', footer.FOOTER_LINK);
  });
});
