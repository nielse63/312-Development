
module.exports = {
  "env": {
    "node": true,
    "mocha": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
  },
  "rules": {
    "max-nested-callbacks": ["error", 4],
    "no-unused-expressions": "off",
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "prefer-arrow-callback": "off"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "modules": true
    }
  },
};
