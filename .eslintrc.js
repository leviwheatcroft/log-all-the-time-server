/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'semi': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'nonblock-statement-body-position': ['error', 'below'],
    'no-use-before-define': ['error', { functions: false }],
    'no-underscore-dangle': 'off',
    'curly': ['error', 'multi-or-nest', 'consistent'],
    'operator-linebreak': ['error', 'after'],
    // 'no-param-reassign': ['error', { 'props': false }],
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'arrow-body-style': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'assert', 'info'] }],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': false }]
  },
  settings: {
    // 'import/resolver': {
    //   webpack: { config: 'webpack.common.js' }
    // }
  }
}
