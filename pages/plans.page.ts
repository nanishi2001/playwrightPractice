import type { Locator, Page } from '@playwright/test';
import {
  PLAN_BUSINESS,
  PLAN_COUPLE,
  PLAN_ESTHE,
  PLAN_ROTENBURO,
  PLAN_SUDOMARI,
  PLAN_THEMEPARK,
  PLAN_TOKUTEN,
  RESERVE_BUTTON,
} from './locators.js';
import type { PlanIdMap } from './types.js';

export const PLANS_PAGE_PATH = '/ja/plans.html' as const;

export { TITLE_PLANS as PLANS_PAGE_TITLE } from './locators.js';

export const PLAN_ID_MAP = {
  [PLAN_TOKUTEN]: 0,
  [PLAN_SUDOMARI]: 4,
  [PLAN_BUSINESS]: 5,
  [PLAN_ESTHE]: 6,
  [PLAN_ROTENBURO]: 7,
  [PLAN_COUPLE]: 8,
  [PLAN_THEMEPARK]: 9,
} as const satisfies PlanIdMap;

export const RESERVE_BUTTON_LABEL = RESERVE_BUTTON;

export const navigateToPlans = (page: Readonly<Page>): Promise<unknown> =>
  page.goto(PLANS_PAGE_PATH);

export const getPlanHeading = (page: Readonly<Page>, planName: string): Locator =>
  page.getByRole('heading', { name: planName, level: 5 });

export const getReserveButton = (page: Readonly<Page>, planName: string): Locator =>
  // eslint-disable-next-line playwright/no-raw-locators
  getPlanHeading(page, planName).locator('..').getByRole('link', { name: RESERVE_BUTTON_LABEL });
