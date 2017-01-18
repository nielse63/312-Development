
module.exports = {
  "parser": "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
  },
  "env": {
    "mocha": true,
    phantomjs: true
  },
  "rules": {
    "max-nested-callbacks": ["error", 4],
    "func-names": "off",
    "no-console": "off",
    'require-await': "error",
    'import/first': 'off',
    'no-unused-expressions': 'off',
    "max-statements": 'off',
  },
  globals: {
    phantom: true,
    page: true,
    utils: true
  }
};
