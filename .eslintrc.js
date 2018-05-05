// http://eslint.org/docs/user-guide/configuring

const production = process.env.NODE_ENV !== 'development';
const warnOrOff = production ? 'warn' : 'off';
const errorOrOff = production ? 'error' : 'off';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    // parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
    // 'plugin:vue/essential',
  ],
  // required to lint *.vue files
  plugins: [
    // 'vue',
    'html',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'import/prefer-default-export': 'off',

    // allow debugger during development
    'key-spacing':          ['warn', { align: 'value' }],
    'no-console':           ['error', { allow: ['error', 'warn'] }],
    'func-names':           'error',
    complexity:             ['error', 5],
  },
  overrides: [
    {
      files: [
        'bin/**',
      ],
      env: {
        browser: false,
        node: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off',
      }
    },
    {
      files: [
        'test/**'
      ],
      env: {
        mocha: true,
      },
      rules: {
        'no-console': 'off',
      }
    }
  ],
};
