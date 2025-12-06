import js from '@eslint/js';
import { configs } from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';
import playwright from 'eslint-plugin-playwright';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      '.vscode/',
      'node_modules/',
      'playwright-report/',
      'test-results/',
      '.husky/',
      '.github/',
    ],
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
  js.configs.recommended,
  ...configs.recommended,
  unicorn.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.spec.ts'],
  },
  prettierConfig,
];
