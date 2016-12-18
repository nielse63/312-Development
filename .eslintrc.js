
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
    "no-unused-vars": [0, { "varsIgnorePattern": "^h$" }],
    "indent": ["error", 2],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "react/prefer-stateless-function": "off",
    "no-underscore-dangle": "off",
    "react/prop-types": "warn",
    "max-len": "warn",
    "no-param-reassign": "warn",
    "no-console": "error",
    "max-nested-callbacks": ["error", 3],
    "complexity": ["error", 5],
    "max-statements": ["error", 10],
    "semi": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "consistent-return": "warn",
  }
};
