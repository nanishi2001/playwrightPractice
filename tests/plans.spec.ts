import { expect, test, type Page } from '@playwright/test';
import * as planPage from '../pages/plans.page.js';
import * as reservePage from '../pages/reserve.page.js';

const beforeSetup = async (page: Readonly<Page>) => {
  await planPage.navigateToPlans(page);
  return page;
};

test.describe('Plans Page', () => {
  test('Page title matches', async ({ page }) => {
    const initializedPage = await beforeSetup(page);
    await expect(initializedPage).toHaveTitle(planPage.PLANS_PAGE_TITLE);
  });

  test('All plan names are displayed', async ({ page }) => {
    const initializedPage = await beforeSetup(page);

    const assertions = Object.keys(planPage.PLAN_ID_MAP).map((planName) =>
      expect(planPage.getPlanHeading(initializedPage, planName)).toBeVisible(),
    );

    await Promise.all(assertions);
  });

  test('All reserve buttons have correct href with query parameters', async ({ page }) => {
    const initializedPage = await beforeSetup(page);

    const assertions = Object.entries(planPage.PLAN_ID_MAP).flatMap(([planName, planId]) => {
      const reserveButton = planPage.getReserveButton(initializedPage, planName);

      return [
        expect(reserveButton).toBeVisible(),
        expect(reserveButton).toHaveAttribute('href', reservePage.getReserveUrlWithPlanId(planId)),
      ];
    });

    await Promise.all(assertions);
  });
});
