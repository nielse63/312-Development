
module.exports = {
  parserOptions: {
    ecmaVersion: 6,
  },
  "env": {
    "mocha": true
  },
  "rules": {
    "max-nested-callbacks": ["error", 4],
    "func-names": "off",
    "no-console": "off"
  }
};
