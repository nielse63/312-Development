const path = require('path');

module.exports = {
  verbose: true,

  // config defs
  rootDir: path.resolve(__dirname, '../../'),
  globals: {
    'vue-jest': {
      babelRcFile: 'test/unit/jest.babelrc',
    },
  },

  // transformations and matchers
  transform: {
    '^.+\\.js$':   '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  testMatch: [
    '**/test/unit/**/(*.)test.js',
  ],


  // module defs
  moduleFileExtensions: [
    'js',
    'vue',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/test/__mocks__/image-mock.js',
    '\\.(css|scss)$':             '<rootDir>/test/__mocks__/style-mock.js',
    '^@/(.*)$':                   '<rootDir>/src/$1',
  },

  // snapshots
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],

  // coverage
  collectCoverage:     true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/main.js',
    '!src/assets/**',
  ],
  coverageReporters: ['html', 'text-summary'],
};
