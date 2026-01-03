import { expect, test } from '@playwright/test';
import * as footer from '../pages/footer.component.js';
import * as header from '../pages/header.component.js';
import * as homePage from '../pages/home.page.js';
import * as loginPage from '../pages/login.page.js';
import * as planPage from '../pages/plan.page.js';
import * as signupPage from '../pages/signup.page.js';

test.describe('Top Page', () => {
  test('Page title matches', async ({ page }) => {
    await homePage.navigateToHome(page);
    await expect(page).toHaveTitle(homePage.HOME_PAGE_TITLE);
  });
});

test.describe('Header Navigation', () => {
  test('Home link navigates to home page', async ({ page }) => {
    await homePage.navigateToHome(page);
    await header.getHomeLink(page).click();
    await expect(page).toHaveURL(homePage.HOME_PAGE_PATH);
  });

  test('Plans link navigates to plans page', async ({ page }) => {
    await homePage.navigateToHome(page);
    await header.getPlansLink(page).click();
    await expect(page).toHaveURL(planPage.PLANS_PAGE_PATH);
  });

  test('Signup link navigates to signup page', async ({ page }) => {
    await homePage.navigateToHome(page);
    await header.getSignupLink(page).click();
    await expect(page).toHaveURL(signupPage.SIGNUP_PAGE_PATH);
  });

  test('Login button navigates to login page', async ({ page }) => {
    await homePage.navigateToHome(page);
    await header.getLoginButton(page).click();
    await expect(page).toHaveURL(loginPage.LOGIN_PAGE_PATH);
  });
});

test.describe('Footer', () => {
  test('GitHub link exists', async ({ page }) => {
    await homePage.navigateToHome(page);
    const footerLink = footer.getFooterLink(page);
    await expect(footerLink).toBeVisible();
    await expect(footerLink).toHaveAttribute('href', footer.FOOTER_LINK);
  });
});
