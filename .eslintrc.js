module.exports = {
  "root": true,
  "parser": "babel-eslint",
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
    "semi": ["error", "never"],
    "no-param-reassign": "warn",
    "arrow-parens": ["error", "as-needed"],
    "consistent-return": "warn",
    "max-statements": ["error", 10],
    "max-len": ["error", {
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true
    }],
    "consistent-return": "off",
    "max-nested-callbacks": ["error", 3],
    "complexity": ["error", 4]
  }
};
