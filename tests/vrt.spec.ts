import { expect, test, type Page } from '@playwright/test';
import { config } from '../config/index.js';
import * as homePage from '../pages/home.page.js';
import { PLAN_TOKUTEN } from '../pages/locators.js';
import * as loginPage from '../pages/login.page.js';
import * as myPage from '../pages/mypage.page.js';
import * as plansPage from '../pages/plans.page.js';
import { getReservePageUrlPattern } from '../pages/reserve.page.js';
import * as signupPage from '../pages/signup.page.js';

const VRT_PAGES = [
  {
    name: 'home',
    setup: (page: Readonly<Page>) => homePage.navigateToHome(page),
  },
  {
    name: 'login',
    setup: (page: Readonly<Page>) => loginPage.navigateToLogin(page),
  },
  {
    name: 'plans',
    setup: (page: Readonly<Page>) => plansPage.navigateToPlans(page),
  },
  {
    name: 'signup',
    setup: (page: Readonly<Page>) => signupPage.navigateToSignup(page),
  },
  {
    name: 'reserve',
    setup: (page: Readonly<Page>) =>
      page.goto(getReservePageUrlPattern(plansPage.PLAN_ID_MAP[PLAN_TOKUTEN])),
  },
  {
    name: 'mypage',
    setup: async (page: Readonly<Page>) => {
      await loginPage.navigateToLogin(page);
      await loginPage.login(page, config.userData.ichiro.email, config.userData.ichiro.password);
      await expect(page).toHaveURL(myPage.MYPAGE_PAGE_PATH);
    },
  },
] as const;

test.describe('Visual Regression Tests', () => {
  for (const pageConfig of VRT_PAGES) {
    test(`Visual regression test for ${pageConfig.name} page`, async ({ page }) => {
      await pageConfig.setup(page);
      await expect(page).toHaveScreenshot(`${pageConfig.name}.png`, {
        fullPage: true,
      });
    });
  }
});
