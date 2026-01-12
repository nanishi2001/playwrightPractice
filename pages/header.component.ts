import type { Locator, Page } from '@playwright/test';
import { NAV_HOME, NAV_LOGIN, NAV_PLANS, NAV_SIGNUP } from './locators.js';

export const getHomeLink = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('link', { name: NAV_HOME });

export const getPlansLink = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('link', { name: NAV_PLANS });

export const getSignupLink = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('link', { name: NAV_SIGNUP });

export const getLoginButton = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('button', { name: NAV_LOGIN });
