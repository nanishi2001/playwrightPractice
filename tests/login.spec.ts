import { config } from '../config/index.js';
import {
  LOGIN_INVALID_ERROR_MESSAGE,
  LOGIN_REQUIRED_ERROR_MESSAGE,
} from '../constants/error-messages.js';
import { expect, test } from '../pages/fixtures.js';

test.describe('Login Page', () => {
  test('Page title matches', async ({ page, loginPage }) => {
    await loginPage.navigateToLogin(page);
    await expect(page).toHaveTitle(loginPage.LOGIN_PAGE_TITLE);
  });

  test('Form fields are displayed', async ({ page, loginPage }) => {
    await loginPage.navigateToLogin(page);

    await expect(loginPage.getEmailInput(page)).toBeVisible();
    await expect(loginPage.getPasswordInput(page)).toBeVisible();
    await expect(loginPage.getSubmitButton(page)).toBeVisible();
  });

  test('Shows error message with invalid credentials', async ({ page, loginPage }) => {
    await loginPage.navigateToLogin(page);

    await loginPage.login(
      page,
      config.invalidCredentials.email,
      config.invalidCredentials.password,
    );

    await expect(loginPage.getEmailErrorMessage(page, LOGIN_INVALID_ERROR_MESSAGE)).toBeVisible();
    await expect(
      loginPage.getPasswordErrorMessage(page, LOGIN_INVALID_ERROR_MESSAGE),
    ).toBeVisible();
  });

  test('Shows validation error with empty fields', async ({ page, loginPage }) => {
    await loginPage.navigateToLogin(page);

    await loginPage.getSubmitButton(page).click();

    await expect(loginPage.getEmailErrorMessage(page, LOGIN_REQUIRED_ERROR_MESSAGE)).toBeVisible();
    await expect(
      loginPage.getPasswordErrorMessage(page, LOGIN_REQUIRED_ERROR_MESSAGE),
    ).toBeVisible();
  });

  for (const [username, user] of Object.entries(config.userData)) {
    test(`Successfully logs in as demo user: ${username}`, async ({
      page,
      loginPage,
      mypagePage,
    }) => {
      await loginPage.navigateToLogin(page);
      await loginPage.login(page, user.email, user.password);
      await expect(page).toHaveTitle(mypagePage.MYPAGE_PAGE_TITLE);
    });
  }
});
