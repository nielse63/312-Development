// http://eslint.org/docs/user-guide/configuring

const production = process.env.NODE_ENV !== 'development';
const errorOrOff = production ? 'error' : 'off';
const errorOrWarn = production ? 'error' : 'warn';

module.exports = {
  root:          true,
  parserOptions: {
    parser:      'babel-eslint',
    ecmaVersion: 2017,
    sourceType:  'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:unicorn/recommended',
    'plugin:vue/essential',
  ],
  // required to lint *.vue files
  plugins: [
    'unicorn',
    'vue',
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
      js:  'never',
      vue: 'never',
    }],
    'import/prefer-default-export': 'off',

    // override unicorn rules
    'unicorn/explicit-length-check': 'off',

    // allow debugger during development
    'max-len':            'off',
    'key-spacing':        ['warn', { align: 'value' }],
    'no-console':         [errorOrOff, { allow: ['error', 'warn'] }],
    'func-names':         'error',
    complexity:           ['error', 5],
    'no-mixed-operators': [errorOrWarn],
    'no-debugger':        [errorOrWarn],
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'unicorn/filename-case': ['error', {
          case: 'pascalCase',
        }],
      },
    },
    {
      files: ['test/**'],
      env:   {
        jest: true,
      },
      globals: {
        browser: true,
        page:    true,
      },
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
    {
      files: [
        'build/**',
        'scripts/**',
      ],
      env: {
        browser: false,
        node:    true,
      },
      rules: {
        'no-console':                        'off',
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: true,
        }],
      },
    },
    {
      files: [
        'scripts/**',
      ],
      rules: {
        'unicorn/no-process-exit': 'off',
      },
    },
    {
      files: ['src/store/**/mutations.js'],
      rules: {
        'no-param-reassign': ['error', {
          props:                          true,
          ignorePropertyModificationsFor: ['state'],
        }],
      },
    },
    {
      files: ['src/lib/canvas/**'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
};
