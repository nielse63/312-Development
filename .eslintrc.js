// http://eslint.org/docs/user-guide/configuring

const production = process.env.NODE_ENV !== 'development';
const warnOrOff = production ? 'warn' : 'off';
const errorOrOff = production ? 'error' : 'off';
const errorOrWarn = production ? 'error' : 'warn';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
  ],
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.base.conf.js',
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
    // 'max-len':              [warnOrOff, 100],
    'max-len': 'off',
    'key-spacing': ['warn', { align: 'value' }],
    'no-console': [errorOrOff, { allow: ['error', 'warn'] }],
    'func-names': 'error',
    complexity: ['error', 5],
    'no-mixed-operators': [errorOrWarn],
  },
  overrides: [
    {
      files: [
        'test/e2e/**',
      ],
      env: {
        jest: true,
      },
      globals: {
        browser: true,
        page: true,
      },
    },
    {
      files: [
        'build/**',
      ],
      env: {
        browser: false,
        node: true,
      },
      rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: true,
        }],
      },
    },
    {
      files: [
        'src/lib/canvas/**',
      ],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
};
