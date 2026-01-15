import { expect, test } from '../../pages/fixtures.js';

test.describe('Footer (Common)', () => {
  test('GitHub link exists and has correct href', async ({ page, homePage, footerComponent }) => {
    await homePage.navigateToHome(page);
    const footerLink = footerComponent.getFooterLink(page);
    await expect(footerLink).toBeVisible();
    await expect(footerLink).toHaveAttribute('href', footerComponent.FOOTER_LINK);
  });
});
