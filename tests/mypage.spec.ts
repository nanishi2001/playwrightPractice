import { config } from '../config/index.js';
import { expect, test } from '../pages/fixtures.js';

test.describe('My Page', () => {
  const demoUser = config.userData.ichiro;

  test('should have correct page title', async ({ page, loginPage, mypagePage }) => {
    await loginPage.navigateToLogin(page);
    await loginPage.login(page, demoUser.email, demoUser.password);
    await expect(page).toHaveURL(mypagePage.MYPAGE_PAGE_PATH);

    await expect(page).toHaveTitle(mypagePage.MYPAGE_PAGE_TITLE);
  });

  test('should display user information correctly', async ({ page, loginPage, mypagePage }) => {
    await loginPage.navigateToLogin(page);
    await loginPage.login(page, demoUser.email, demoUser.password);
    await expect(page).toHaveURL(mypagePage.MYPAGE_PAGE_PATH);

    await expect(mypagePage.getEmailValue(page)).toHaveText(demoUser.email);
    await expect(mypagePage.getUsernameValue(page)).toHaveText(demoUser.name ?? '');
    await expect(mypagePage.getRankValue(page)).toHaveText(demoUser.rank ?? '');
    await expect(mypagePage.getAddressValue(page)).toHaveText(demoUser.address ?? '');
    await expect(mypagePage.getTelValue(page)).toHaveText(demoUser.tel ?? '');
    await expect(mypagePage.getGenderValue(page)).toHaveText(demoUser.gender ?? '');
    await expect(mypagePage.getBirthdayValue(page)).toHaveText(demoUser.birthday ?? '');
    await expect(mypagePage.getNotificationValue(page)).toHaveText(demoUser.notification ?? '');
  });

  test('should have disabled buttons for icon settings and account deletion', async ({
    page,
    loginPage,
    mypagePage,
  }) => {
    await loginPage.navigateToLogin(page);
    await loginPage.login(page, demoUser.email, demoUser.password);
    await expect(page).toHaveURL(mypagePage.MYPAGE_PAGE_PATH);

    const iconButton = mypagePage.getIconSettingsButton(page);
    await expect(iconButton).toBeVisible();
    await expect(iconButton).toBeDisabled();

    const deleteButton = mypagePage.getDeleteAccountButton(page);
    await expect(deleteButton).toBeVisible();
    await expect(deleteButton).toBeDisabled();
  });

  test('should logout and redirect to top page', async ({ page, loginPage, mypagePage }) => {
    await loginPage.navigateToLogin(page);
    await loginPage.login(page, demoUser.email, demoUser.password);
    await expect(page).toHaveURL(mypagePage.MYPAGE_PAGE_PATH);

    await Promise.all([page.waitForURL('**'), mypagePage.getLogoutButton(page).click()]);

    await expect.poll(() => page.url()).toContain('index.html');
    await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible();

    await page.goto(mypagePage.MYPAGE_PAGE_PATH);
    await expect.poll(() => page.url()).toContain('index.html');
  });
});
