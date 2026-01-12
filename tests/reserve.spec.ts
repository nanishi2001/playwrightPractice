import { expect, test, type Page } from '@playwright/test';
import { config } from '../config/index.js';
import { CONTACT_NONE, PLAN_TOKUTEN } from '../pages/locators.js';
import { PLAN_ID_MAP } from '../pages/plans.page.js';
import {
  CONFIRM_PAGE_TITLE,
  getBreakfastCheckbox,
  getCommentInput,
  getContactSelect,
  getDateInput,
  getHeadcountInput,
  getNightsInput,
  getPlanTitle,
  getReservePageUrlPattern,
  getSubmitButton,
  getTotalPriceStatus,
  getUsernameInput,
  RESERVE_PAGE_TITLE,
} from '../pages/reserve.page.js';
import { getSafeTextContent } from '../utils/utils.js';

/**
 * Navigate to the reservation page for a specific plan.
 * @param page - Playwright page instance
 * @param planId - Plan ID to navigate to
 */
const navigateToReservePage = async (page: Readonly<Page>, planId: number): Promise<void> => {
  await page.goto(getReservePageUrlPattern(planId));
};

/**
 * Safely retrieves the plan ID with runtime validation.
 * @param planName - The plan name to look up
 * @returns The plan ID
 * @throws Error if the plan name is not found
 */
const getPlanId = (planName: keyof typeof PLAN_ID_MAP): number => {
  const planId = PLAN_ID_MAP[planName];
  if (planId === undefined) {
    // eslint-disable-next-line functional/no-throw-statements -- Runtime validation for test configuration
    throw new Error(`Unknown plan name: ${planName}`);
  }
  return planId;
};

test.describe('Reservation (Reserve Page)', () => {
  const planName = PLAN_TOKUTEN;
  const planId = getPlanId(planName);

  test('should display correct initial state', async ({ page }) => {
    await navigateToReservePage(page, planId);

    await expect(page).toHaveTitle(RESERVE_PAGE_TITLE);
    await expect(getPlanTitle(page)).toHaveText(planName);

    // Verify presence of form elements
    await expect(getDateInput(page)).toBeVisible();
    await expect(getNightsInput(page)).toBeVisible();
    await expect(getHeadcountInput(page)).toBeVisible();
    await expect(getUsernameInput(page)).toBeVisible();
    await expect(getContactSelect(page)).toBeVisible();
    await expect(getCommentInput(page)).toBeVisible();
    await expect(getSubmitButton(page)).toBeVisible();
  });

  test('should dynamically recalculate total price when nights or headcount change', async ({
    page,
  }) => {
    await navigateToReservePage(page, planId);
    const initialPrice = await getSafeTextContent(getTotalPriceStatus(page));

    // Change number of nights
    await getNightsInput(page).fill('2');
    await getNightsInput(page).blur();
    await expect(getTotalPriceStatus(page)).not.toHaveText(initialPrice);
    const priceAfterNightsChange = await getSafeTextContent(getTotalPriceStatus(page));

    // Change headcount
    await getHeadcountInput(page).fill('2');
    await getHeadcountInput(page).blur();
    await expect(getTotalPriceStatus(page)).not.toHaveText(priceAfterNightsChange);
    const priceAfterHeadcountChange = await getSafeTextContent(getTotalPriceStatus(page));

    // Check additional plan
    await getBreakfastCheckbox(page).check();
    await expect(getTotalPriceStatus(page)).not.toHaveText(priceAfterHeadcountChange);
  });

  test('should navigate to confirm page when submit button is clicked', async ({ page }) => {
    await navigateToReservePage(page, planId);

    await getUsernameInput(page).fill(config.testData.reserveUsername);
    await getContactSelect(page).selectOption(CONTACT_NONE);

    await getSubmitButton(page).click();

    await expect(page).toHaveURL(/.*confirm.html/);
    await expect(page).toHaveTitle(CONFIRM_PAGE_TITLE);
  });
});
