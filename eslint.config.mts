import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import functional from 'eslint-plugin-functional';
import importPlugin from 'eslint-plugin-import';
import playwright from 'eslint-plugin-playwright';
import { configs as preferArrowFunctionsConfig } from 'eslint-plugin-prefer-arrow-functions';
import unicorn from 'eslint-plugin-unicorn';
import { configs as tsLintConfig } from 'typescript-eslint';

export default [
  {
    ignores: [
      '.vscode/',
      'node_modules/',
      'playwright-report/',
      'test-results/',
      '.husky/',
      '.github/',
      'test-target/',
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
  ...tsLintConfig.recommended,
  unicorn.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  functional.configs.recommended,
  preferArrowFunctionsConfig.all,
  {
    files: ['**/*.{ts,js,mts,mjs,cts,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
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
      'unicorn/prevent-abbreviations': 'off',

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

      // import rules
      'import/no-cycle': 'error',

      // Force sort method arguments
      '@typescript-eslint/require-array-sort-compare': [
        'error',
        {
          ignoreStringArrays: true,
        },
      ],

      // Strict use arrow functions
      'arrow-body-style': ['error', 'as-needed'],
      'func-style': 'error',
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'implicit',
          singleReturnOnly: false,
        },
      ],
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.spec.ts', 'pages/**/*.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'functional/no-expression-statements': [
        'error',
        {
          ignoreCodePattern: [
            '^test',
            '^expect',
            '^await.*',
            '^.*.goto',
            '^.*.click',
            '^.*.waitFor',
            '^.*.navigate',
            '^.*.Promise.all',
            'fillSignupForm',
            'setEmail',
            'setPassword',
            'setPasswordConfirmation',
            'setUsername',
            'setRank',
            'setAddress',
            'setTel',
            'setGender',
            'setBirthday',
            'setNotification',
            '^.*.login',
            '^generateTests',
          ],
        },
      ],
      'functional/no-return-void': 'off',
      'playwright/expect-expect': 'error',
      'playwright/missing-playwright-await': 'error',
      'playwright/no-conditional-in-test': 'error',
      'playwright/no-element-handle': 'error',
      'playwright/no-eval': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-get-by-title': 'error',
      'playwright/no-hooks': 'error',
      'playwright/no-nested-step': 'error',
      'playwright/no-networkidle': 'error',
      'playwright/no-nth-methods': 'error',
      'playwright/no-raw-locators': 'error',
      'playwright/no-skipped-test': 'error',
      'playwright/no-slowed-test': 'error',
      'playwright/no-standalone-expect': 'error',
      'playwright/no-unsafe-references': 'error',
      'playwright/no-unused-locators': 'error',
      'playwright/no-useless-await': 'error',
      'playwright/no-wait-for-navigation': 'error',
      'playwright/no-wait-for-selector': 'error',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-comparison-matcher': 'error',
      'playwright/prefer-equality-matcher': 'error',
      'playwright/prefer-locator': 'error',
      'playwright/prefer-strict-equal': 'error',
      'playwright/prefer-to-be': 'error',
      'playwright/prefer-to-contain': 'error',
      'playwright/prefer-to-have-count': 'error',
      'playwright/prefer-to-have-length': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/require-to-throw-message': 'error',
      'playwright/valid-describe-callback': 'error',
      'playwright/valid-expect-in-promise': 'error',
      'playwright/valid-test-tags': 'error',
      'playwright/valid-title': [
        'error',
        {
          ignoreTypeOfStepName: false,
        },
      ],
    },
  },
  prettierConfig,
];
