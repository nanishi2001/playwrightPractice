import { expect, test } from '../pages/fixtures.js';
import { PLAN_TOKUTEN } from '../pages/locators.js';
import type { PlanName } from '../pages/types.js';

test.describe('Plans Page', () => {
  test('Page title matches', async ({ page, plansPage }) => {
    await plansPage.navigateToPlans(page);
    await expect(page).toHaveTitle(plansPage.PLANS_PAGE_TITLE);
  });

  test('All plan names are displayed', async ({ page, plansPage }) => {
    await plansPage.navigateToPlans(page);

    const assertions = Object.entries(plansPage.PLAN_ID_MAP).map(([planName]) =>
      expect(plansPage.getPlanHeading(page, planName)).toBeVisible(),
    );

    await Promise.all(assertions);
  });

  test('All reserve buttons have correct href with query parameters', async ({
    page,
    plansPage,
    reservePage,
  }) => {
    await plansPage.navigateToPlans(page);

    const assertions = Object.entries(plansPage.PLAN_ID_MAP).flatMap(([planName, planId]) => {
      const reserveButton = plansPage.getReserveButton(page, planName);

      return [
        expect(reserveButton).toBeVisible(),
        expect(reserveButton).toHaveAttribute('href', reservePage.getReserveUrlWithPlanId(planId)),
      ];
    });

    await Promise.all(assertions);
  });

  test('Clicking reserve button navigates to reservation page in a new tab', async ({
    page,
    plansPage,
    reservePage,
  }) => {
    await plansPage.navigateToPlans(page);
    const planName: PlanName = PLAN_TOKUTEN;
    const planId = plansPage.PLAN_ID_MAP[planName];
    const reserveButton = plansPage.getReserveButton(page, planName);

    const newPagePromise = page.context().waitForEvent('page');
    await reserveButton.click();
    const newPage = await newPagePromise;

    await expect(newPage).toHaveURL(reservePage.getReservePageUrlPattern(planId));
  });
});
