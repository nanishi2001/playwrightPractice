import { config } from '../config/index.js';
import { expect, test } from '../pages/fixtures.js';
import { CONTACT_NONE, PLAN_TOKUTEN } from '../pages/locators.js';
import { getSafeTextContent } from '../utils/utils.js';

/**
 * Safely retrieves the plan ID with runtime validation.
 * @param planName - The plan name to look up
 * @param planIdMap - The plan ID map from plansPage
 * @returns The plan ID
 * @throws Error if the plan name is not found
 */
const getPlanId = (planName: string, planIdMap: Record<string, number>): number => {
  const planId = planIdMap[planName];
  if (planId === undefined) {
    // eslint-disable-next-line functional/no-throw-statements -- Runtime validation for test configuration
    throw new Error(`Unknown plan name: ${planName}`);
  }
  return planId;
};

test.describe('Reservation (Reserve Page)', () => {
  const planName = PLAN_TOKUTEN;

  test('should display correct initial state', async ({ page, plansPage, reservePage }) => {
    const planId = getPlanId(planName, plansPage.PLAN_ID_MAP);
    await page.goto(reservePage.getReservePageUrlPattern(planId));

    await expect(page).toHaveTitle(reservePage.RESERVE_PAGE_TITLE);
    await expect(reservePage.getPlanTitle(page)).toHaveText(planName);

    await expect(reservePage.getDateInput(page)).toBeVisible();
    await expect(reservePage.getNightsInput(page)).toBeVisible();
    await expect(reservePage.getHeadcountInput(page)).toBeVisible();
    await expect(reservePage.getUsernameInput(page)).toBeVisible();
    await expect(reservePage.getContactSelect(page)).toBeVisible();
    await expect(reservePage.getCommentInput(page)).toBeVisible();
    await expect(reservePage.getSubmitButton(page)).toBeVisible();
  });

  test('should dynamically recalculate total price when nights or headcount change', async ({
    page,
    plansPage,
    reservePage,
  }) => {
    const planId = getPlanId(planName, plansPage.PLAN_ID_MAP);
    await page.goto(reservePage.getReservePageUrlPattern(planId));
    const initialPrice = await getSafeTextContent(reservePage.getTotalPriceStatus(page));

    await reservePage.getNightsInput(page).fill('2');
    await reservePage.getNightsInput(page).blur();
    await expect(reservePage.getTotalPriceStatus(page)).not.toHaveText(initialPrice);
    const priceAfterNightsChange = await getSafeTextContent(reservePage.getTotalPriceStatus(page));

    await reservePage.getHeadcountInput(page).fill('2');
    await reservePage.getHeadcountInput(page).blur();
    await expect(reservePage.getTotalPriceStatus(page)).not.toHaveText(priceAfterNightsChange);
    const priceAfterHeadcountChange = await getSafeTextContent(
      reservePage.getTotalPriceStatus(page),
    );

    await reservePage.getBreakfastCheckbox(page).check();
    await expect(reservePage.getTotalPriceStatus(page)).not.toHaveText(priceAfterHeadcountChange);
  });

  test('should navigate to confirm page when submit button is clicked', async ({
    page,
    plansPage,
    reservePage,
  }) => {
    const planId = getPlanId(planName, plansPage.PLAN_ID_MAP);
    await page.goto(reservePage.getReservePageUrlPattern(planId));

    await reservePage.getUsernameInput(page).fill(config.testData.reserveUsername);
    await reservePage.getContactSelect(page).selectOption(CONTACT_NONE);

    await reservePage.getSubmitButton(page).click();

    await expect(page).toHaveURL(/.*confirm.html/);
    await expect(page).toHaveTitle(reservePage.CONFIRM_PAGE_TITLE);
  });
});
