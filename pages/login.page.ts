import type { Locator, Page } from '@playwright/test';
import { LABEL_EMAIL, LABEL_PASSWORD } from './locators.js';

export const LOGIN_PAGE_PATH = '/ja/login.html' as const;
export { TITLE_LOGIN as LOGIN_PAGE_TITLE } from './locators.js';

export const navigateToLogin = (page: Readonly<Page>): Promise<unknown> =>
  page.goto(LOGIN_PAGE_PATH);

export const getEmailInput = (page: Readonly<Page>): Locator => page.getByLabel(LABEL_EMAIL);

export const getPasswordInput = (page: Readonly<Page>): Locator => page.getByLabel(LABEL_PASSWORD);

export const getSubmitButton = (page: Readonly<Page>): Locator =>
  // eslint-disable-next-line playwright/no-raw-locators
  page.locator('#login-button');

export const getEmailErrorMessage = (
  page: Readonly<Page>,
  message: Readonly<string | RegExp>,
): Locator =>
  // eslint-disable-next-line playwright/no-raw-locators
  page.locator('#email-message').getByText(message);

export const getPasswordErrorMessage = (
  page: Readonly<Page>,
  message: Readonly<string | RegExp>,
): Locator =>
  // eslint-disable-next-line playwright/no-raw-locators
  page.locator('#password-message').getByText(message);

/**
 * Perform login action
 */
export const login = async (
  page: Readonly<Page>,
  email: string,
  password: string,
): Promise<void> => {
  await getEmailInput(page).fill(email);
  await getPasswordInput(page).fill(password);
  await getSubmitButton(page).click();
};
