const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  globals: {
    __DEV__: true,
    Promise: true,
  },
  plugins: ['babel', 'prettier'],
  rules: {
    curly: ['error', 'all'],
    'spaced-comment': [2, 'always'],
    'no-use-before-define': 0,
    'import/no-extraneous-dependencies': 0,
    'one-var': [2, { uninitialized: 'always', initialized: 'never' }],
    'import/prefer-default-export': 'off',
    'babel/new-cap': 1,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'one-var-declaration-per-line': 0,
    'prefer-destructuring': [0, { object: true, array: false }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
    'no-console': 'error',
    'no-empty-function': 0,
    '@typescript-eslint/indent': 0,
    'no-useless-constructor': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/member-delimiter-style': 0,
  },
  overrides: [
    {
      files: '*.spec.ts',
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
      },
    },
    {
      files: '*.entity.ts',
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
      },
    },
  ],
}
