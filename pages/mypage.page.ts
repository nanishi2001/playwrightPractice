import type { Locator, Page } from '@playwright/test';
import {
  BUTTON_DELETE_ACCOUNT,
  BUTTON_ICON_SETTINGS,
  LABEL_ADDRESS,
  LABEL_BIRTHDAY,
  LABEL_EMAIL,
  LABEL_GENDER,
  LABEL_NOTIFICATION_STATUS,
  LABEL_RANK,
  LABEL_TEL,
  LABEL_USERNAME,
  NAV_LOGOUT,
} from './locators.js';

export const MYPAGE_PAGE_PATH = '/ja/mypage.html' as const;
export const MYPAGE_PAGE_TITLE = 'マイページ | HOTEL PLANISPHERE - テスト自動化練習サイト' as const;

export const navigateToMyPage = (page: Readonly<Page>): Promise<unknown> =>
  page.goto(MYPAGE_PAGE_PATH);

/**
 * Get the value locator for a specific field label in the user info list.
 */
export const getInfoValue = (page: Readonly<Page>, label: string): Locator =>
  page
    .getByRole('listitem')
    .filter({ has: page.getByRole('heading', { name: label }) })
    .getByRole('paragraph');

export const getEmailValue = (page: Readonly<Page>): Locator => getInfoValue(page, LABEL_EMAIL);
export const getUsernameValue = (page: Readonly<Page>): Locator =>
  getInfoValue(page, LABEL_USERNAME);
export const getRankValue = (page: Readonly<Page>): Locator => getInfoValue(page, LABEL_RANK);
export const getAddressValue = (page: Readonly<Page>): Locator => getInfoValue(page, LABEL_ADDRESS);
export const getTelValue = (page: Readonly<Page>): Locator => getInfoValue(page, LABEL_TEL);
export const getGenderValue = (page: Readonly<Page>): Locator => getInfoValue(page, LABEL_GENDER);
export const getBirthdayValue = (page: Readonly<Page>): Locator =>
  getInfoValue(page, LABEL_BIRTHDAY);
export const getNotificationValue = (page: Readonly<Page>): Locator =>
  getInfoValue(page, LABEL_NOTIFICATION_STATUS);

export const getIconSettingsButton = (page: Readonly<Page>): Locator =>
  page.getByRole('button', { name: BUTTON_ICON_SETTINGS });

export const getDeleteAccountButton = (page: Readonly<Page>): Locator =>
  page.getByRole('button', { name: BUTTON_DELETE_ACCOUNT });

export const getLogoutButton = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('button', { name: NAV_LOGOUT });

/**
 * Perform logout action
 */
export const logout = async (page: Readonly<Page>): Promise<void> => {
  await getLogoutButton(page).click();
};
