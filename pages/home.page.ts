import type { Page } from '@playwright/test';

export const HOME_PAGE_PATH = '/ja/index.html' as const;

export { TITLE_HOME as HOME_PAGE_TITLE } from './locators.js';

export const navigateToHome = (page: Readonly<Page>): Promise<unknown> => page.goto(HOME_PAGE_PATH);

export const getPageTitle = async (page: Readonly<Page>): Promise<string> => page.title();
