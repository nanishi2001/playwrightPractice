import js from '@eslint/js';
import { configs } from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';
import functional from 'eslint-plugin-functional';
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
  functional.configs.recommended,
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
    rules: {
      // Prevent type coercion to boolean
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
        },
      ],

      // Prevent the + and += operators from being used with non-numeric types
      'no-implicit-coercion': 'error',
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          skipCompoundAssignments: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumberAndString: false,
          allowRegExp: false,
          allowAny: false,
        },
      ],
      'prefer-template': 'error',

      // Restrict the types usable in template literals
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowNullish: false,
          allowAny: false,
          allowArray: false,
          allowNever: false,
          allowRegExp: false,
        },
      ],

      // Verify that the swich statement exhausively covers all cases of the union type
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'unicorn/prefer-switch': 'error',

      // Restrict global variables
      'no-restricted-globals': [
        'error',
        'eval',
        'Boolean',
        'Function',
        'globalThis',
        { name: 'isFinite', message: 'Use Number.isFinite instead' },
        { name: 'isNaN', message: 'Use Number.isNaN instead' },
      ],

      // Restrict Mutation
      'functional/no-let': [
        'error',
        {
          allowInForLoopInit: true,
          allowInFunctions: false,
          ignoreIdentifierPattern: ['^mut_', '^_mut_', '^#mut_'],
        },
      ],
      'functional/immutable-data': [
        'error',
        {
          ignoreClasses: false,
          ignoreMapsAndSets: false,
          ignoreImmediateMutation: true,
          ignoreNonConstDeclarations: false,
          ignoreIdentifierPattern: ['^mut_', '^_mut_', '^#mut_'],
        },
      ],

      // Restrict Method Signatures
      '@typescript-eslint/method-signature-style': 'error',
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.spec.ts'],
  },
  prettierConfig,
];
