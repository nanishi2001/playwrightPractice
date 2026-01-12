import { expect, test, type Page } from '@playwright/test';
import { config } from '../config/index.js';
import * as LoginPage from '../pages/login.page.js';
import * as MyPage from '../pages/mypage.page.js';

test.describe('My Page', () => {
  const demoUser = config.userData.ichiro;

  const setup = async (page: Readonly<Page>) => {
    // Navigate to login page and login
    await LoginPage.navigateToLogin(page);
    await LoginPage.login(page, demoUser.email, demoUser.password);
    // Verify redirection to My Page
    await expect(page).toHaveURL(MyPage.MYPAGE_PAGE_PATH);
    return page;
  };

  test('should have correct page title', async ({ page }) => {
    const initializedPage = await setup(page);
    await expect(initializedPage).toHaveTitle(MyPage.MYPAGE_PAGE_TITLE);
  });

  test('should display user information correctly', async ({ page }) => {
    const initializedPage = await setup(page);
    await expect(MyPage.getEmailValue(initializedPage)).toHaveText(demoUser.email);
    await expect(MyPage.getUsernameValue(initializedPage)).toHaveText(demoUser.name ?? '');
    await expect(MyPage.getRankValue(initializedPage)).toHaveText(demoUser.rank ?? '');
    await expect(MyPage.getAddressValue(initializedPage)).toHaveText(demoUser.address ?? '');
    await expect(MyPage.getTelValue(initializedPage)).toHaveText(demoUser.tel ?? '');
    await expect(MyPage.getGenderValue(initializedPage)).toHaveText(demoUser.gender ?? '');
    await expect(MyPage.getBirthdayValue(initializedPage)).toHaveText(demoUser.birthday ?? '');
    await expect(MyPage.getNotificationValue(initializedPage)).toHaveText(
      demoUser.notification ?? '',
    );
  });

  test('should have disabled buttons for icon settings and account deletion', async ({ page }) => {
    const initializedPage = await setup(page);
    const iconButton = MyPage.getIconSettingsButton(initializedPage);
    await expect(iconButton).toBeVisible();
    await expect(iconButton).toBeDisabled();

    const deleteButton = MyPage.getDeleteAccountButton(initializedPage);
    await expect(deleteButton).toBeVisible();
    await expect(deleteButton).toBeDisabled();
  });

  test('should logout and redirect to top page', async ({ page }) => {
    const initializedPage = await setup(page);

    await Promise.all([
      initializedPage.waitForURL('**'), // Wait for any navigation to complete
      MyPage.getLogoutButton(initializedPage).click(),
    ]);

    // Verify redirection to top page (or login page)
    await expect.poll(() => initializedPage.url()).toContain('index.html');

    // Verify unauthenticated state (Login button should be visible)
    await expect(initializedPage.getByRole('button', { name: 'ログイン' })).toBeVisible();

    // Verify redirect to top page when accessing My Page while unauthenticated
    await initializedPage.goto(MyPage.MYPAGE_PAGE_PATH);
    await expect.poll(() => initializedPage.url()).toContain('index.html');
  });
});
