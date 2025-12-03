import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      '.vscode/',
      '.yarn/',
      'node_modules/',
      'yarn.lock',
      'playwright-report/',
      'test-results/',
    ],
  },
  ...tseslint.configs.recommended,
  playwright.configs['flat/recommended'],
  prettierConfig,
];
