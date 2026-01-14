import { expect, test, type Page } from '@playwright/test';
import { config } from '../config/index.js';
import type { userData } from '../config/types.js';
import {
  LOGIN_INVALID_ERROR_MESSAGE,
  LOGIN_REQUIRED_ERROR_MESSAGE,
} from '../constants/error-messages.js';
import * as loginPage from '../pages/login.page.js';
import * as mypagePage from '../pages/mypage.page.js';

const beforeSetup = async (page: Readonly<Page>) => {
  await loginPage.navigateToLogin(page);
  return page;
};

/**
 * Recursively generate tests for demo users
 */
const generateTests = (entries: readonly (readonly [string, userData])[]): void => {
  for (const [username, user] of entries) {
    test(`Successfully logs in as demo user: ${username}`, async ({ page }) => {
      const initializedPage = await beforeSetup(page);
      await loginPage.login(initializedPage, user.email, user.password);
      await expect(initializedPage).toHaveTitle(mypagePage.MYPAGE_PAGE_TITLE);
    });
  }
};

test.describe('Login Page', () => {
  test('Page title matches', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    await expect(initializedPage).toHaveTitle(loginPage.LOGIN_PAGE_TITLE);
  });

  test('Form fields are displayed', async ({ page }) => {
    const initializedPage = await beforeSetup(page);

    await expect(loginPage.getEmailInput(initializedPage)).toBeVisible();
    await expect(loginPage.getPasswordInput(initializedPage)).toBeVisible();
    await expect(loginPage.getSubmitButton(initializedPage)).toBeVisible();
  });

  test('Shows error message with invalid credentials', async ({ page }) => {
    const initializedPage = await beforeSetup(page);

    await loginPage.login(
      initializedPage,
      config.invalidCredentials.email,
      config.invalidCredentials.password,
    );

    await expect(
      loginPage.getEmailErrorMessage(initializedPage, LOGIN_INVALID_ERROR_MESSAGE),
    ).toBeVisible();
    await expect(
      loginPage.getPasswordErrorMessage(initializedPage, LOGIN_INVALID_ERROR_MESSAGE),
    ).toBeVisible();
  });

  test('Shows validation error with empty fields', async ({ page }) => {
    const initializedPage = await beforeSetup(page);

    await loginPage.getSubmitButton(initializedPage).click();

    await expect(
      loginPage.getEmailErrorMessage(initializedPage, LOGIN_REQUIRED_ERROR_MESSAGE),
    ).toBeVisible();
    await expect(
      loginPage.getPasswordErrorMessage(initializedPage, LOGIN_REQUIRED_ERROR_MESSAGE),
    ).toBeVisible();
  });

  // Dynamic test generation for demo users from config
  generateTests(Object.entries(config.userData));
});
