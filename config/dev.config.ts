import type { userData } from './types.js';

/**
 * Helper function to safely get environment variable with fallback
 */
const getEnv = (key: string, fallback = ''): string => process.env[key] ?? fallback;

export const devData = {
  userData: {
    ichiro: {
      email: getEnv('USER_EMAIL_ICHIRO'),
      password: getEnv('USER_PASSWORD_ICHIRO'),
      name: getEnv('USER_NAME_ICHIRO'),
      rank: getEnv('USER_RANK_ICHIRO'),
      address: getEnv('USER_ADDRESS_ICHIRO'),
      tel: getEnv('USER_TEL_ICHIRO'),
      gender: getEnv('USER_GENDER_ICHIRO'),
      birthday: getEnv('USER_BIRTHDAY_ICHIRO'),
      notification: getEnv('USER_NOTIFICATION_ICHIRO'),
    },
    sakura: {
      email: getEnv('USER_EMAIL_SAKURA'),
      password: getEnv('USER_PASSWORD_SAKURA'),
    },
    jun: {
      email: getEnv('USER_EMAIL_JUN'),
      password: getEnv('USER_PASSWORD_JUN'),
    },
    yoshiki: {
      email: getEnv('USER_EMAIL_YOSHIKI'),
      password: getEnv('USER_PASSWORD_YOSHIKI'),
    },
  },
  invalidCredentials: {
    email: getEnv('INVALID_EMAIL'),
    password: getEnv('INVALID_PASSWORD'),
  },
  testData: {
    reserveUsername: getEnv('TEST_RESERVE_USERNAME'),
    signupUsername: getEnv('TEST_SIGNUP_USERNAME'),
    signupPassword: getEnv('TEST_SIGNUP_PASSWORD'),
    signupRank: getEnv('TEST_SIGNUP_RANK') as 'premium' | 'normal',
    signupAddress: getEnv('TEST_SIGNUP_ADDRESS'),
    signupTel: getEnv('TEST_SIGNUP_TEL'),
    signupGender: getEnv('TEST_SIGNUP_GENDER') as '男性' | '女性' | 'その他' | '未回答',
    signupBirthday: getEnv('TEST_SIGNUP_BIRTHDAY'),
  },
} as const satisfies {
  readonly userData: Record<string, userData>;
  readonly invalidCredentials: userData;
  readonly testData: {
    readonly reserveUsername: string;
    readonly signupUsername: string;
    readonly signupPassword: string;
    readonly signupRank: 'premium' | 'normal';
    readonly signupAddress: string;
    readonly signupTel: string;
    readonly signupGender: '男性' | '女性' | 'その他' | '未回答';
    readonly signupBirthday: string;
  };
};
