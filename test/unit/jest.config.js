const path = require('path');

module.exports = {
  verbose: false,
  bail:    true,
  testURL: 'http://localhost',

  // config defs
  rootDir: path.resolve(__dirname, '../../'),

  // setup files
  setupFiles: [
    '<rootDir>/test/unit/utils/jest-setup.js',
    'jest-canvas-mock',
  ],

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

  // coverage
  collectCoverage:     true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/main.js',
    '!src/assets/**',
  ],
  coverageReporters: ['html', 'text-summary', 'lcov'],
};
