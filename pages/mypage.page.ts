import type { Locator, Page } from '@playwright/test';

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

export const getEmailValue = (page: Readonly<Page>): Locator =>
  getInfoValue(page, 'メールアドレス');
export const getUsernameValue = (page: Readonly<Page>): Locator => getInfoValue(page, '氏名');
export const getRankValue = (page: Readonly<Page>): Locator => getInfoValue(page, '会員ランク');
export const getAddressValue = (page: Readonly<Page>): Locator => getInfoValue(page, '住所');
export const getTelValue = (page: Readonly<Page>): Locator => getInfoValue(page, '電話番号');
export const getGenderValue = (page: Readonly<Page>): Locator => getInfoValue(page, '性別');
export const getBirthdayValue = (page: Readonly<Page>): Locator => getInfoValue(page, '生年月日');
export const getNotificationValue = (page: Readonly<Page>): Locator =>
  getInfoValue(page, 'お知らせ');

export const getIconSettingsButton = (page: Readonly<Page>): Locator =>
  page.getByRole('button', { name: 'アイコン設定' });

export const getDeleteAccountButton = (page: Readonly<Page>): Locator =>
  page.getByRole('button', { name: '退会する' });

export const getLogoutButton = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('button', { name: 'ログアウト' });

/**
 * Perform logout action
 */
export const logout = async (page: Readonly<Page>): Promise<void> => {
  await getLogoutButton(page).click();
};
