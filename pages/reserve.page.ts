import type { Locator, Page } from '@playwright/test';
import {
  LABEL_BREAKFAST,
  LABEL_COMMENT,
  LABEL_CONTACT_REQUIRED,
  LABEL_DATE_REQUIRED,
  LABEL_EARLY_CHECKIN,
  LABEL_HEADCOUNT_REQUIRED,
  LABEL_NIGHTS_REQUIRED,
  LABEL_SIGHTSEEING,
  LABEL_SUBMIT_CONFIRM,
  LABEL_USERNAME_REQUIRED,
} from './locators.js';

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
  page.getByRole('textbox', { name: LABEL_DATE_REQUIRED });

export const getNightsInput = (page: Readonly<Page>): Locator =>
  page.getByRole('spinbutton', { name: LABEL_NIGHTS_REQUIRED });

export const getHeadcountInput = (page: Readonly<Page>): Locator =>
  page.getByRole('spinbutton', { name: LABEL_HEADCOUNT_REQUIRED });

export const getBreakfastCheckbox = (page: Readonly<Page>): Locator =>
  page.getByRole('checkbox', { name: LABEL_BREAKFAST });

export const getEarlyCheckinCheckbox = (page: Readonly<Page>): Locator =>
  page.getByRole('checkbox', { name: LABEL_EARLY_CHECKIN });

export const getSightseeingCheckbox = (page: Readonly<Page>): Locator =>
  page.getByRole('checkbox', { name: LABEL_SIGHTSEEING });

export const getUsernameInput = (page: Readonly<Page>): Locator =>
  page.getByRole('textbox', { name: LABEL_USERNAME_REQUIRED });

export const getContactSelect = (page: Readonly<Page>): Locator =>
  page.getByLabel(LABEL_CONTACT_REQUIRED);

export const getCommentInput = (page: Readonly<Page>): Locator =>
  page.getByRole('textbox', { name: LABEL_COMMENT });

export const getTotalPriceStatus = (page: Readonly<Page>): Locator => page.getByRole('status');

export const getSubmitButton = (page: Readonly<Page>): Locator =>
  page.getByRole('button', { name: LABEL_SUBMIT_CONFIRM });
