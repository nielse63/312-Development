
module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  },
  "parserOptions": {
    "ecmaFeatures": {
      "modules": true,
      "jsx": true
    }
  },
  "extends": "airbnb",
  "rules": {
    "no-unused-vars": ['error', {
      "varsIgnorePattern": "^h$"
    }],
    "indent": ["error", 2],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "react/prefer-stateless-function": "off",
    "no-underscore-dangle": "off",
    "max-len": "off",
    "no-param-reassign": "warn",
    "max-nested-callbacks": ["error", 3],
    "complexity": ["error", 5],
    "max-statements": ["error", 10],
    "semi": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "consistent-return": "warn",
    "class-methods-use-this": "off",
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "functions": "never",
    }],
    'require-await': "error",
  }
};
