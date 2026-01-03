import type { Locator, Page } from '@playwright/test';

export const getHomeLink = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('link', { name: 'ホーム' });

export const getPlansLink = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('link', { name: '宿泊予約' });

export const getSignupLink = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('link', { name: '会員登録' });

export const getLoginButton = (page: Readonly<Page>): Locator =>
  page.getByRole('navigation').getByRole('button', { name: 'ログイン' });
