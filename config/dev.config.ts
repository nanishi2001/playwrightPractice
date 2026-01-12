import type { userData } from './types.js';

export const devData = {
  userData: {
    ichiro: {
      email: 'ichiro@example.com',
      password: 'password',
      name: '山田一郎',
      rank: 'プレミアム会員',
      address: '東京都豊島区池袋',
      tel: '01234567891',
      gender: '男性',
      birthday: '未登録',
      notification: '受け取る',
    },
    sakura: {
      email: 'sakura@example.com',
      password: 'pass1234',
    },
    jun: {
      email: 'jun@example.com',
      password: 'pa55w0rd!',
    },
    yoshiki: {
      email: 'yoshiki@example.com',
      password: 'pass-pass',
    },
  },
  invalidCredentials: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },
} as const satisfies {
  readonly userData: Record<string, userData>;
  readonly invalidCredentials: userData;
};
