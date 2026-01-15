import { test as base } from '@playwright/test';
import * as footerComponent from './footer.component.js';
import * as headerComponent from './header.component.js';
import * as homePage from './home.page.js';
import * as loginPage from './login.page.js';
import * as mypagePage from './mypage.page.js';
import * as plansPage from './plans.page.js';
import * as reservePage from './reserve.page.js';
import * as signupPage from './signup.page.js';

type PageModules = {
  readonly headerComponent: typeof headerComponent;
  readonly footerComponent: typeof footerComponent;
  readonly homePage: typeof homePage;
  readonly loginPage: typeof loginPage;
  readonly mypagePage: typeof mypagePage;
  readonly plansPage: typeof plansPage;
  readonly reservePage: typeof reservePage;
  readonly signupPage: typeof signupPage;
};

export const test = base.extend<PageModules>({
  headerComponent: async ({}, use) => use(headerComponent),
  footerComponent: async ({}, use) => use(footerComponent),
  homePage: async ({}, use) => use(homePage),
  loginPage: async ({}, use) => use(loginPage),
  mypagePage: async ({}, use) => use(mypagePage),
  plansPage: async ({}, use) => use(plansPage),
  reservePage: async ({}, use) => use(reservePage),
  signupPage: async ({}, use) => use(signupPage),
});

export { expect } from '@playwright/test';
