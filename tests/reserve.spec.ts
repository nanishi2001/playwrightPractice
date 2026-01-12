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

const beforeSetup = async (page: Readonly<Page>, planId: number) => {
  await page.goto(getReservePageUrlPattern(planId));
  return page;
};

test.describe('Reservation (Reserve Page)', () => {
  const planName = PLAN_TOKUTEN;
  const planId = PLAN_ID_MAP[planName];

  test('should display correct initial state', async ({ page }) => {
    const initializedPage = await beforeSetup(page, planId);

    await expect(initializedPage).toHaveTitle(RESERVE_PAGE_TITLE);
    await expect(getPlanTitle(initializedPage)).toHaveText(planName);

    // Verify presence of form elements
    await expect(getDateInput(initializedPage)).toBeVisible();
    await expect(getNightsInput(initializedPage)).toBeVisible();
    await expect(getHeadcountInput(initializedPage)).toBeVisible();
    await expect(getUsernameInput(initializedPage)).toBeVisible();
    await expect(getContactSelect(initializedPage)).toBeVisible();
    await expect(getCommentInput(initializedPage)).toBeVisible();
    await expect(getSubmitButton(initializedPage)).toBeVisible();
  });

  test('should dynamically recalculate total price when nights or headcount change', async ({
    page,
  }) => {
    const initializedPage = await beforeSetup(page, planId);
    const initialPrice = await getSafeTextContent(getTotalPriceStatus(initializedPage));

    // Change number of nights
    await getNightsInput(initializedPage).fill('2');
    await getPlanTitle(initializedPage).click(); // Trigger blur
    await expect(getTotalPriceStatus(initializedPage)).not.toHaveText(initialPrice);
    const priceAfterNightsChange = await getSafeTextContent(getTotalPriceStatus(initializedPage));

    // Change headcount
    await getHeadcountInput(initializedPage).fill('2');
    await getPlanTitle(initializedPage).click(); // Trigger blur
    await expect(getTotalPriceStatus(initializedPage)).not.toHaveText(priceAfterNightsChange);
    const priceAfterHeadcountChange = await getSafeTextContent(
      getTotalPriceStatus(initializedPage),
    );

    // Check additional plan
    await getBreakfastCheckbox(initializedPage).check();
    await expect(getTotalPriceStatus(initializedPage)).not.toHaveText(priceAfterHeadcountChange);
  });

  test('should navigate to confirm page when submit button is clicked', async ({ page }) => {
    const initializedPage = await beforeSetup(page, planId);

    await getUsernameInput(initializedPage).fill(config.testData.reserveUsername);
    await getContactSelect(initializedPage).selectOption(CONTACT_NONE);

    await getSubmitButton(initializedPage).click();

    await expect(initializedPage).toHaveURL(/.*confirm.html/);
    await expect(initializedPage).toHaveTitle(CONFIRM_PAGE_TITLE);
  });
});
