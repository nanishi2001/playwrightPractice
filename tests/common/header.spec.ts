import { expect, test } from '../../pages/fixtures.js';

test.describe('Header Navigation (Common)', () => {
  test('Home link navigates to home page', async ({ page, homePage, headerComponent }) => {
    await homePage.navigateToHome(page);
    await headerComponent.getHomeLink(page).click();
    await expect(page).toHaveURL(homePage.HOME_PAGE_PATH);
  });

  test('Plans link navigates to plans page', async ({
    page,
    homePage,
    headerComponent,
    plansPage,
  }) => {
    await homePage.navigateToHome(page);
    await headerComponent.getPlansLink(page).click();
    await expect(page).toHaveURL(plansPage.PLANS_PAGE_PATH);
  });

  test('Signup link navigates to signup page', async ({
    page,
    homePage,
    headerComponent,
    signupPage,
  }) => {
    await homePage.navigateToHome(page);
    await headerComponent.getSignupLink(page).click();
    await expect(page).toHaveURL(signupPage.SIGNUP_PAGE_PATH);
  });

  test('Login button navigates to login page', async ({
    page,
    homePage,
    headerComponent,
    loginPage,
  }) => {
    await homePage.navigateToHome(page);
    await headerComponent.getLoginButton(page).click();
    await expect(page).toHaveURL(loginPage.LOGIN_PAGE_PATH);
  });
});
