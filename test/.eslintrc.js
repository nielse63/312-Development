
module.exports = {
  parserOptions: {
    ecmaVersion: 6,
  },
  "env": {
    "mocha": true
  },
  "rules": {
    "no-unused-expressions": "off",
    "max-nested-callbacks": "off",
    "prefer-arrow-callback": "off",
    "func-names": "off",
    "no-console": "off"
  },
  "globals": {
    browser: true
  }
};
