const vueSetupOrder = require('./vue-setup-order.js');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const pluginVue = require('eslint-plugin-vue');
const prettier = require('eslint-config-prettier');
const unusedImports = require('eslint-plugin-unused-imports');
const perfectionist = require('eslint-plugin-perfectionist');
const vuetify = require('eslint-plugin-vuetify');

const ignorePatterns = ['node_modules/', 'dist/'];

module.exports = tseslint.config(
  {
    ignores: ignorePatterns,
    files: ['**/*.ts', '**/*.vue'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...pluginVue.configs['flat/recommended'],
      ...vuetify.configs['flat/base'],
      ...vuetify.configs['flat/recommended'],
      prettier,
    ],
    plugins: {
      'unused-imports': unusedImports,
      perfectionist,
      'vue-setup-order': vueSetupOrder,
    },
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/ban-ts-comment': ['error'],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'vue/no-v-html': 'warn',
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/typedef': [
        'error',
        {
          arrowParameter: true,
          memberVariableDeclaration: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          variableDeclarationIgnoreFunction: true,
          parameter: true,
        },
      ],

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'max-lines': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'eol-last': ['error', 'always'],

      complexity: ['warn', 10],

      'unused-imports/no-unused-imports': 'error',
      'perfectionist/sort-exports': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-imports': ['warn', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-objects': ['warn', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-enums': ['warn', { type: 'natural', order: 'asc' }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: 'block-like' },
      ],

      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/order-in-components': 'error',
      'vue/no-unused-vars': 'warn',
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue-setup-order/script-setup-order': 'error',
    },
  },
  {
    files: ['**/composables/**/*.ts', '**/use*.ts', '*.config.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    files: ['src/store/**/*.ts', 'src/router/paths.ts', 'src/router/names.ts', 'src/router/routes.ts'],
    rules: {
      '@typescript-eslint/typedef': 'off',
    },
  },
  {
    files: ['src/utils/**/*.ts'],
    rules: {
      'vue-setup-order/script-setup-order': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      '@typescript-eslint/prefer-function-type': 'off',
    },
  },
);
