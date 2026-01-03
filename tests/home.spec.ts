import { expect, test, type Page } from '@playwright/test';
import * as footer from '../pages/footer.component.js';
import * as header from '../pages/header.component.js';
import * as homePage from '../pages/home.page.js';
import * as loginPage from '../pages/login.page.js';
import * as planPage from '../pages/plan.page.js';
import * as signupPage from '../pages/signup.page.js';

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

test.describe('Header Navigation', () => {
  test('Home link navigates to home page', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    await header.getHomeLink(initializedPage).click();
    await expect(initializedPage).toHaveURL(homePage.HOME_PAGE_PATH);
  });

  test('Plans link navigates to plans page', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    await header.getPlansLink(initializedPage).click();
    await expect(initializedPage).toHaveURL(planPage.PLANS_PAGE_PATH);
  });

  test('Signup link navigates to signup page', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    await header.getSignupLink(initializedPage).click();
    await expect(initializedPage).toHaveURL(signupPage.SIGNUP_PAGE_PATH);
  });

  test('Login button navigates to login page', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    await header.getLoginButton(initializedPage).click();
    await expect(initializedPage).toHaveURL(loginPage.LOGIN_PAGE_PATH);
  });
});

test.describe('Footer', () => {
  test('GitHub link exists', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    const footerLink = footer.getFooterLink(initializedPage);
    await expect(footerLink).toBeVisible();
    await expect(footerLink).toHaveAttribute('href', footer.FOOTER_LINK);
  });
});
