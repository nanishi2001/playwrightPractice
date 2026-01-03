import type { Locator, Page } from '@playwright/test';
import type { SignupFormValues } from './types.js';
export type { PlanIdMap, PlanName, SignupFormValues } from './types.js';

export const SIGNUP_PAGE_PATH = '/ja/signup.html' as const;
export const SIGNUP_PAGE_TITLE = '会員登録 | HOTEL PLANISPHERE - テスト自動化練習サイト' as const;

export const SIGNUP_SUCCESS_TITLE =
  'マイページ | HOTEL PLANISPHERE - テスト自動化練習サイト' as const;

export const getEmailInput = (page: Readonly<Page>): Locator => page.getByLabel('メールアドレス');

export const getPasswordInput = (page: Readonly<Page>): Locator => page.locator('#password');

export const getPasswordConfirmationInput = (page: Readonly<Page>): Locator =>
  page.locator('#password-confirmation');

export const getUsernameInput = (page: Readonly<Page>): Locator => page.getByLabel('氏名');

export const getRankPremiumRadio = (page: Readonly<Page>): Locator =>
  page.getByLabel('プレミアム会員');

export const getRankNormalRadio = (page: Readonly<Page>): Locator => page.getByLabel('一般会員');

export const getAddressInput = (page: Readonly<Page>): Locator => page.getByLabel('住所');

export const getTelInput = (page: Readonly<Page>): Locator => page.getByLabel('電話番号');

export const getGenderSelect = (page: Readonly<Page>): Locator => page.getByLabel('性別');

export const getBirthdayInput = (page: Readonly<Page>): Locator => page.getByLabel('生年月日');

export const getNotificationCheckbox = (page: Readonly<Page>): Locator =>
  page.getByLabel('お知らせを受け取る');

export const getSubmitButton = (page: Readonly<Page>): Locator =>
  page.getByRole('button', { name: '登録' });

export const getErrorMessage = (page: Readonly<Page>): Locator => page.locator('.invalid-feedback');

export const navigateToSignup = (page: Readonly<Page>): Promise<unknown> =>
  page.goto(SIGNUP_PAGE_PATH);

export const setEmail = (page: Readonly<Page>, value?: string): Promise<boolean> =>
  value === undefined
    ? Promise.resolve(true)
    : getEmailInput(page)
        .fill(value)
        .then(() => true);

export const setPassword = (page: Readonly<Page>, value?: string): Promise<boolean> =>
  value === undefined
    ? Promise.resolve(true)
    : getPasswordInput(page)
        .fill(value)
        .then(() => true);

export const setPasswordConfirmation = (page: Readonly<Page>, value?: string): Promise<boolean> =>
  value === undefined
    ? Promise.resolve(true)
    : getPasswordConfirmationInput(page)
        .fill(value)
        .then(() => true);

export const setUsername = (page: Readonly<Page>, value?: string): Promise<boolean> =>
  value === undefined
    ? Promise.resolve(true)
    : getUsernameInput(page)
        .fill(value)
        .then(() => true);

export const setRank = (
  page: Readonly<Page>,
  rank: 'premium' | 'normal' | undefined,
): Promise<boolean> =>
  rank === 'premium'
    ? getRankPremiumRadio(page)
        .check()
        .then(() => true)
    : rank === 'normal'
      ? getRankNormalRadio(page)
          .check()
          .then(() => true)
      : Promise.resolve(true);

export const setAddress = (page: Readonly<Page>, value?: string): Promise<boolean> =>
  value === undefined
    ? Promise.resolve(true)
    : getAddressInput(page)
        .fill(value)
        .then(() => true);

export const setTel = (page: Readonly<Page>, value?: string): Promise<boolean> =>
  value === undefined
    ? Promise.resolve(true)
    : getTelInput(page)
        .fill(value)
        .then(() => true);

export const setGender = (page: Readonly<Page>, value?: string): Promise<boolean> =>
  value === undefined
    ? Promise.resolve(true)
    : getGenderSelect(page)
        .selectOption(value)
        .then(() => true);

export const setBirthday = (page: Readonly<Page>, value?: string): Promise<boolean> =>
  value === undefined
    ? Promise.resolve(true)
    : getBirthdayInput(page)
        .fill(value)
        .then(() => true);

export const setNotification = (page: Readonly<Page>, notification?: boolean): Promise<boolean> =>
  notification === true
    ? getNotificationCheckbox(page)
        .check()
        .then(() => true)
    : notification === false
      ? getNotificationCheckbox(page)
          .uncheck()
          .then(() => true)
      : Promise.resolve(true);

export const fillSignupForm = (
  page: Readonly<Page>,
  values: SignupFormValues,
): Promise<boolean> => {
  const tasks: readonly ((p: Readonly<Page>) => Promise<boolean>)[] = [
    (p) => setEmail(p, values.email),
    (p) => setPassword(p, values.password),
    (p) => setPasswordConfirmation(p, values.passwordConfirmation),
    (p) => setUsername(p, values.username),
    (p) => setRank(p, values.rank),
    (p) => setAddress(p, values.address),
    (p) => setTel(p, values.tel),
    (p) => setGender(p, values.gender),
    (p) => setBirthday(p, values.birthday),
    (p) => setNotification(p, values.notification),
  ];

  const runTasks = async (
    index: number,
    taskList: readonly ((p: Readonly<Page>) => Promise<boolean>)[],
    p: Readonly<Page>,
  ): Promise<boolean> =>
    index >= taskList.length
      ? true
      : (await taskList[index](p)) && (await runTasks(index + 1, taskList, p));

  return runTasks(0, tasks, page);
};
