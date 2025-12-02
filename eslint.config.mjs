import typescriptEslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...typescriptEslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-console': 'warn',
    },
    ignores: [".vscode/", ".yarn/", "node_modules/", "yarn.lock", "playwright-report/", "test-results/"]
  },
  prettierConfig,
];
