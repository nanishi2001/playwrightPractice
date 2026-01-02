import type { Page } from '@playwright/test';

export const HOME_PAGE_PATH = '/ja/index.html' as const;

export const HOME_PAGE_TITLE = 'HOTEL PLANISPHERE - テスト自動化練習サイト' as const;

export const navigateToHome = (page: Readonly<Page>): Promise<unknown> => page.goto(HOME_PAGE_PATH);

export const getPageTitle = async (page: Readonly<Page>): Promise<string> => page.title();
