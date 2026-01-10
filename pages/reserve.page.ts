import type { Locator, Page } from '@playwright/test';

export const RESERVE_PAGE_PATH = '/ja/reserve.html' as const;
export const RESERVE_PAGE_URL = './reserve.html' as const;

export const RESERVE_PAGE_TITLE = '宿泊予約 | HOTEL PLANISPHERE - テスト自動化練習サイト' as const;
export const CONFIRM_PAGE_TITLE =
  '宿泊予約確認 | HOTEL PLANISPHERE - テスト自動化練習サイト' as const;

export const getReserveUrlWithPlanId = (planId: number): string =>
  `${RESERVE_PAGE_URL}?plan-id=${planId}`;

export const getReservePageUrlPattern = (planId: number): string =>
  `${RESERVE_PAGE_PATH}?plan-id=${planId}`;

export const getPlanTitle = (page: Readonly<Page>): Locator =>
  page.getByRole('heading', { level: 4 });

export const getDateInput = (page: Readonly<Page>): Locator =>
  page.getByRole('textbox', { name: '宿泊日 必須' });

export const getNightsInput = (page: Readonly<Page>): Locator =>
  page.getByRole('spinbutton', { name: '宿泊数 必須' });

export const getHeadcountInput = (page: Readonly<Page>): Locator =>
  page.getByRole('spinbutton', { name: '人数 必須' });

export const getBreakfastCheckbox = (page: Readonly<Page>): Locator =>
  page.getByRole('checkbox', { name: '朝食バイキング' });

export const getEarlyCheckinCheckbox = (page: Readonly<Page>): Locator =>
  page.getByRole('checkbox', { name: '昼からチェックインプラン' });

export const getSightseeingCheckbox = (page: Readonly<Page>): Locator =>
  page.getByRole('checkbox', { name: 'お得な観光プラン' });

export const getUsernameInput = (page: Readonly<Page>): Locator =>
  page.getByRole('textbox', { name: '氏名 必須' });

export const getContactSelect = (page: Readonly<Page>): Locator =>
  page.getByLabel('確認のご連絡 必須');

export const getCommentInput = (page: Readonly<Page>): Locator =>
  page.getByRole('textbox', { name: 'ご要望・ご連絡事項等ありましたらご記入ください' });

export const getTotalPriceStatus = (page: Readonly<Page>): Locator => page.getByRole('status');

export const getSubmitButton = (page: Readonly<Page>): Locator =>
  page.getByRole('button', { name: '予約内容を確認する' });
