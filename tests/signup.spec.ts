import { config } from '../config/index.js';
import { expect, test } from '../pages/fixtures.js';
import { ERROR_EMAIL_INVALID } from '../pages/locators.js';

test.describe('Signup Page', () => {
  test('Page title matches', async ({ page, signupPage }) => {
    await signupPage.navigateToSignup(page);
    await expect(page).toHaveTitle(signupPage.SIGNUP_PAGE_TITLE);
  });

  test('Form fields are displayed', async ({ page, signupPage }) => {
    await signupPage.navigateToSignup(page);

    await expect(signupPage.getEmailInput(page)).toBeVisible();
    await expect(signupPage.getPasswordInput(page)).toBeVisible();
    await expect(signupPage.getPasswordConfirmationInput(page)).toBeVisible();
    await expect(signupPage.getUsernameInput(page)).toBeVisible();
    await expect(signupPage.getRankPremiumRadio(page)).toBeVisible();
    await expect(signupPage.getRankNormalRadio(page)).toBeVisible();
    await expect(signupPage.getAddressInput(page)).toBeVisible();
    await expect(signupPage.getTelInput(page)).toBeVisible();
    await expect(signupPage.getGenderSelect(page)).toBeVisible();
    await expect(signupPage.getBirthdayInput(page)).toBeVisible();
    await expect(signupPage.getNotificationCheckbox(page)).toBeVisible();
    await expect(signupPage.getSubmitButton(page)).toBeVisible();
  });

  test('Shows validation errors for empty fields', async ({ page, signupPage }) => {
    await signupPage.navigateToSignup(page);

    await signupPage.getSubmitButton(page).click();

    const errorCount = await signupPage.getErrorMessage(page, /必須|入力してください/).count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('Shows validation error for invalid email format', async ({ page, signupPage }) => {
    await signupPage.navigateToSignup(page);

    await signupPage.setEmail(page, 'invalidemail');
    await signupPage.getSubmitButton(page).click();

    await expect(signupPage.getErrorMessage(page, ERROR_EMAIL_INVALID)).toBeVisible();
  });

  test('Successfully registers a user', async ({ page, signupPage }) => {
    await signupPage.navigateToSignup(page);

    const timestamp = Date.now();
    const email = `test_${timestamp}@example.com`;

    await signupPage.fillSignupForm(page, {
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

    await signupPage.getSubmitButton(page).click();
    await expect(page).toHaveTitle(signupPage.SIGNUP_SUCCESS_TITLE);
  });
});
