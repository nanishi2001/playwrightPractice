import { expect, test, type Locator, type Page } from '@playwright/test';
import { PLAN_ID_MAP } from '../pages/plans.page.js';
import {
  CONFIRM_PAGE_TITLE,
  getBreakfastCheckbox,
  getCommentInput,
  getContactSelect,
  getDateInput,
  getHeadcountInput,
  getNightsInput,
  getPlanTitle,
  getReservePageUrlPattern,
  getSubmitButton,
  getTotalPriceStatus,
  getUsernameInput,
  RESERVE_PAGE_TITLE,
} from '../pages/reserve.page.js';

const beforeSetup = async (page: Readonly<Page>, planId: number) => {
  await page.goto(getReservePageUrlPattern(planId));
  return page;
};

const getSafeTextContent = async (locator: Readonly<Locator>): Promise<string> =>
  (await locator.textContent()) ?? '';

test.describe('宿泊予約 (Reserve Page)', () => {
  const planName = 'お得な特典付きプラン';
  const planId = PLAN_ID_MAP[planName];

  test('初期表示が正しいこと', async ({ page }) => {
    const initializedPage = await beforeSetup(page, planId);

    await expect(initializedPage).toHaveTitle(RESERVE_PAGE_TITLE);
    await expect(getPlanTitle(initializedPage)).toHaveText(planName);

    // フォーム要素の存在確認
    await expect(getDateInput(initializedPage)).toBeVisible();
    await expect(getNightsInput(initializedPage)).toBeVisible();
    await expect(getHeadcountInput(initializedPage)).toBeVisible();
    await expect(getUsernameInput(initializedPage)).toBeVisible();
    await expect(getContactSelect(initializedPage)).toBeVisible();
    await expect(getCommentInput(initializedPage)).toBeVisible();
    await expect(getSubmitButton(initializedPage)).toBeVisible();
  });

  test('宿泊数や人数を変更した際、合計金額が動的に再計算されること', async ({ page }) => {
    const initializedPage = await beforeSetup(page, planId);
    const initialPrice = await getSafeTextContent(getTotalPriceStatus(initializedPage));

    // 宿泊数を変更
    await getNightsInput(initializedPage).fill('2');
    await getPlanTitle(initializedPage).click(); // blur を誘発
    await expect(getTotalPriceStatus(initializedPage)).not.toHaveText(initialPrice);
    const priceAfterNightsChange = await getSafeTextContent(getTotalPriceStatus(initializedPage));

    // 人数を変更
    await getHeadcountInput(initializedPage).fill('2');
    await getPlanTitle(initializedPage).click(); // blur を誘発
    await expect(getTotalPriceStatus(initializedPage)).not.toHaveText(priceAfterNightsChange);
    const priceAfterHeadcountChange = await getSafeTextContent(
      getTotalPriceStatus(initializedPage),
    );

    // 追加プランを選択
    await getBreakfastCheckbox(initializedPage).check();
    await expect(getTotalPriceStatus(initializedPage)).not.toHaveText(priceAfterHeadcountChange);
  });

  test('「予約内容を確認する」ボタンを押下すると、確認画面へ遷移すること', async ({ page }) => {
    const initializedPage = await beforeSetup(page, planId);

    await getUsernameInput(initializedPage).fill('テスト太郎');
    await getContactSelect(initializedPage).selectOption('希望しない');

    await getSubmitButton(initializedPage).click();

    await expect(initializedPage).toHaveURL(/.*confirm.html/);
    await expect(initializedPage).toHaveTitle(CONFIRM_PAGE_TITLE);
  });
});
