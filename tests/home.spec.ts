import { expect, test } from '@playwright/test';
import { FOOTER_LINK, getFooterLink } from '../pom/footer.component.js';
import {
  getHomeLink,
  getLoginButton,
  getPlansLink,
  getSignupLink,
} from '../pom/header.component.js';
import { HOME_PAGE_PATH, HOME_PAGE_TITLE, navigateToHome } from '../pom/home.page.js';
import { LOGIN_PAGE_PATH } from '../pom/login.page.js';
import { PLANS_PAGE_PATH } from '../pom/plan.page.js';
import { SIGNUP_PAGE_PATH } from '../pom/signup.page.js';

test.describe('Top Page', () => {
  test('Page title matches', async ({ page }) => {
    await navigateToHome(page);
    await expect(page).toHaveTitle(HOME_PAGE_TITLE);
  });
});

test.describe('Header Navigation', () => {
  test('Home link navigates to home page', async ({ page }) => {
    await navigateToHome(page);
    await getHomeLink(page).click();
    await expect(page).toHaveURL(HOME_PAGE_PATH);
  });

  test('Plans link navigates to plans page', async ({ page }) => {
    await navigateToHome(page);
    await getPlansLink(page).click();
    await expect(page).toHaveURL(PLANS_PAGE_PATH);
  });

  test('Signup link navigates to signup page', async ({ page }) => {
    await navigateToHome(page);
    await getSignupLink(page).click();
    await expect(page).toHaveURL(SIGNUP_PAGE_PATH);
  });

  test('Login button navigates to login page', async ({ page }) => {
    await navigateToHome(page);
    await getLoginButton(page).click();
    await expect(page).toHaveURL(LOGIN_PAGE_PATH);
  });
});

test.describe('Footer', () => {
  test('GitHub link exists', async ({ page }) => {
    await navigateToHome(page);
    const footerLink = getFooterLink(page);
    await expect(footerLink).toBeVisible();
    await expect(footerLink).toHaveAttribute('href', FOOTER_LINK);
  });
});
