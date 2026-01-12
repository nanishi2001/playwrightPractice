import { expect, test, type Page } from '@playwright/test';
import { config } from '../config/index.js';
import { ERROR_EMAIL_INVALID } from '../pages/locators.js';
import * as signupPage from '../pages/signup.page.js';

const beforeSetup = async (page: Readonly<Page>) => {
  await signupPage.navigateToSignup(page);
  return page;
};

test.describe('Signup Page', () => {
  test('Page title matches', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    await expect(initializedPage).toHaveTitle(signupPage.SIGNUP_PAGE_TITLE);
  });

  test('Form fields are displayed', async ({ page }) => {
    const initializedPage = await beforeSetup(page);

    await expect(signupPage.getEmailInput(initializedPage)).toBeVisible();
    await expect(signupPage.getPasswordInput(initializedPage)).toBeVisible();
    await expect(signupPage.getPasswordConfirmationInput(initializedPage)).toBeVisible();
    await expect(signupPage.getUsernameInput(initializedPage)).toBeVisible();
    await expect(signupPage.getRankPremiumRadio(initializedPage)).toBeVisible();
    await expect(signupPage.getRankNormalRadio(initializedPage)).toBeVisible();
    await expect(signupPage.getAddressInput(initializedPage)).toBeVisible();
    await expect(signupPage.getTelInput(initializedPage)).toBeVisible();
    await expect(signupPage.getGenderSelect(initializedPage)).toBeVisible();
    await expect(signupPage.getBirthdayInput(initializedPage)).toBeVisible();
    await expect(signupPage.getNotificationCheckbox(initializedPage)).toBeVisible();
    await expect(signupPage.getSubmitButton(initializedPage)).toBeVisible();
  });

  test('Shows validation errors for empty fields', async ({ page }) => {
    const initializedPage = await beforeSetup(page);

    await signupPage.getSubmitButton(initializedPage).click();

    const errorCount = await signupPage
      .getErrorMessage(initializedPage, /必須|入力してください/)
      .count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('Shows validation error for invalid email format', async ({ page }) => {
    const initializedPage = await beforeSetup(page);

    await signupPage.setEmail(initializedPage, 'invalidemail');
    await signupPage.getSubmitButton(initializedPage).click();

    await expect(signupPage.getErrorMessage(initializedPage, ERROR_EMAIL_INVALID)).toBeVisible();
  });

  test('Successfully registers a user', async ({ page }) => {
    const initializedPage = await beforeSetup(page);

    const timestamp = Date.now();
    const email = `test_${timestamp}@example.com`;

    await signupPage.fillSignupForm(initializedPage, {
      email,
      password: config.testData.signupPassword,
      passwordConfirmation: config.testData.signupPassword,
      username: config.testData.signupUsername,
      rank: config.testData.signupRank,
      address: config.testData.signupAddress,
      tel: config.testData.signupTel,
      gender: config.testData.signupGender,
      birthday: config.testData.signupBirthday,
      notification: true,
    });

    await signupPage.getSubmitButton(initializedPage).click();
    await expect(initializedPage).toHaveTitle(signupPage.SIGNUP_SUCCESS_TITLE);
  });
});
