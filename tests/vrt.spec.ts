import { config } from '../config/index.js';
import { expect, test } from '../pages/fixtures.js';
import { PLAN_TOKUTEN } from '../pages/locators.js';

test.describe('Visual Regression Tests', () => {
  test('Visual regression test for home page', async ({ page, homePage }) => {
    await homePage.navigateToHome(page);
    await expect(page).toHaveScreenshot('home.png', { fullPage: true });
  });

  test('Visual regression test for login page', async ({ page, loginPage }) => {
    await loginPage.navigateToLogin(page);
    await expect(page).toHaveScreenshot('login.png', { fullPage: true });
  });

  test('Visual regression test for plans page', async ({ page, plansPage }) => {
    await plansPage.navigateToPlans(page);
    await expect(page).toHaveScreenshot('plans.png', { fullPage: true });
  });

  test('Visual regression test for signup page', async ({ page, signupPage }) => {
    await signupPage.navigateToSignup(page);
    await expect(page).toHaveScreenshot('signup.png', { fullPage: true });
  });

  test('Visual regression test for reserve page', async ({ page, plansPage, reservePage }) => {
    await page.goto(reservePage.getReservePageUrlPattern(plansPage.PLAN_ID_MAP[PLAN_TOKUTEN]));
    await expect(page).toHaveScreenshot('reserve.png', { fullPage: true });
  });

  test('Visual regression test for mypage page', async ({ page, loginPage, mypagePage }) => {
    await loginPage.navigateToLogin(page);
    await loginPage.login(page, config.userData.ichiro.email, config.userData.ichiro.password);
    await expect(page).toHaveURL(mypagePage.MYPAGE_PAGE_PATH);
    await expect(page).toHaveScreenshot('mypage.png', { fullPage: true });
  });
});
