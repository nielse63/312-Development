module.exports = {
  "root": true,
  // "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "modules": true,
      "jsx": true
    }
  },
  "extends": "airbnb",
  "rules": {
    // "no-empty": 0,
    // "no-console": 0,
    "no-unused-vars": [0, { "varsIgnorePattern": "^h$" }],
    // "no-cond-assign": 1,
    "semi": ["error", "never"],
    // "camelcase": 0,
    // "comma-style": 2,
    // "comma-dangle": [2, "never"],
    "indent": ["error", 2],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "react/prefer-stateless-function": "off",
    "no-underscore-dangle": "off",
    "react/prop-types": "warn",
    "max-len": "warn",
    "no-param-reassign": "warn"
    // "no-trailing-spaces": [2, { "skipBlankLines": true }],
    // "max-nested-callbacks": ["error", 3],
    // "no-eval": 2,
    // "no-implied-eval": 2,
    // "no-new-func": 2,
    // "guard-for-in": 2,
    // "eqeqeq": 1,
    // "no-else-return": 2,
    // "no-redeclare": 2,
    // "no-dupe-keys": 2,
    // "radix": 2,
    // "strict": [2, "never"],
    // "no-shadow": 0,
    // "no-delete-var": 2,
    // "no-undef-init": 2,
    // "no-shadow-restricted-names": 2,
    // "handle-callback-err": 0,
    // "no-lonely-if": 2,
    // "keyword-spacing": 2,
    // "constructor-super": 2,
    // "no-this-before-super": 2,
    // "no-dupe-class-members": 2,
    // "no-const-assign": 2,
    // "prefer-spread": 2,
    // "no-useless-concat": 2,
    // "no-var": 2,
    // "object-shorthand": 2,
    // "prefer-arrow-callback": 2
  }
};
