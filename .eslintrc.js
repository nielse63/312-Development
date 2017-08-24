// http://eslint.org/docs/user-guide/configuring

const production = process.env.NODE_ENV !== 'development';
const warnOrOff = production ? 'warn' : 'off';
const errorOrOff = production ? 'error' : 'off';

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
        config: 'build/webpack.base.conf.js',
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
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    'import/prefer-default-export': 'off',
    // allow debugger during development
    'no-debugger': production ? 2 : 0,
    semi: warnOrOff,
    'no-console': [warnOrOff, { allow: ['warn', 'error'] }],
    'no-param-reassign': [warnOrOff, { props: false }],
    'max-len': 'off',
    'keyword-spacing': warnOrOff,
    'no-underscore-dangle': 'off',
    'space-before-function-paren': warnOrOff,
    complexity: ['warn', 3],
    indent: errorOrOff,
    'comma-dangle': [warnOrOff, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never',
    }],
  },
};
