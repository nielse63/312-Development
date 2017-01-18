
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
    "func-names": "off",
    "no-console": "off",
    "max-statements": 'off',
    "import/first": 'off',
    "max-nested-callbacks": ["warn", 3],
    "max-statements": 'off',
  },
  globals: {
    phantom: true,
    page: true,
    utils: true
  }
};
