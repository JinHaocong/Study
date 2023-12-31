module.exports = {
  env: {
    node: true,
    es6: true,
  },
  plugins: ['node', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'node/no-extraneous-require': ['error', { allowModules: ['mongoose'] }],
    'node/no-unsupported-features/es-syntax': 'off',
    semi: ['error', 'always'],
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'no-unused-vars': 'off',
  },
};
