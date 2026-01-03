import { Locator, Page } from '@playwright/test';

export const FOOTER_LINK = 'https://github.com/takeyaqa/hotel-example-site' as const;

export const getFooterLink = (page: Readonly<Page>): Locator =>
  page.getByRole('contentinfo').getByRole('link', { name: 'GitHub' });
