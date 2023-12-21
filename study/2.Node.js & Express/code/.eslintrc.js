module.exports = {
  env: {
    node: true,
    es6: true,
  },
  plugins: ['node'],
  extends: ['airbnb-base', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'node/no-extraneous-require': ['error', { allowModules: ['mongoose'] }],
  },
};
