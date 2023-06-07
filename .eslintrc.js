module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'no-console': 'off',
    'no-debugger': 'off',
  },
};
