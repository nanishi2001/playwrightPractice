import type { userData } from './types.js';

export const devData = {
  userData: {
    ichiro: {
      email: 'ichiro@example.com',
      password: 'password',
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
} as const satisfies { readonly userData: Record<string, userData> };
