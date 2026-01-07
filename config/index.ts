import { devData } from './dev.config.js';
import { localData } from './local.config.js';

const env = process.env.TEST_ENV ?? 'local';

export const config = env === 'local' ? localData : devData;
