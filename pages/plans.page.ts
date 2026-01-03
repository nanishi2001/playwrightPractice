import type { Locator, Page } from '@playwright/test';
import type { PlanIdMap } from './types.js';

export const PLANS_PAGE_PATH = '/ja/plans.html' as const;

export const PLANS_PAGE_TITLE =
  '宿泊プラン一覧 | HOTEL PLANISPHERE - テスト自動化練習サイト' as const;

export const PLAN_ID_MAP = {
  お得な特典付きプラン: 0,
  素泊まり: 4,
  出張ビジネスプラン: 5,
  'エステ・マッサージプラン': 6,
  貸し切り露天風呂プラン: 7,
  カップル限定プラン: 8,
  テーマパーク優待プラン: 9,
} as const satisfies PlanIdMap;

export const RESERVE_BUTTON_LABEL = 'このプランで予約' as const;

export const navigateToPlans = (page: Readonly<Page>): Promise<unknown> =>
  page.goto(PLANS_PAGE_PATH);

export const getPlanHeading = (page: Readonly<Page>, planName: string): Locator =>
  page.getByRole('heading', { name: planName, level: 5 });

export const getPlanIndex = (planName: string): number => {
  const planEntries = Object.keys(PLAN_ID_MAP);
  const index = planEntries.indexOf(planName);
  return index === -1 ? 0 : index;
};

export const getReserveButton = (page: Readonly<Page>, planName: string): Locator =>
  page.getByRole('link', { name: RESERVE_BUTTON_LABEL }).nth(getPlanIndex(planName));
