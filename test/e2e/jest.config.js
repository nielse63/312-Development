const path = require('path');

module.exports = {
  preset:    'jest-puppeteer',
  rootDir:   path.resolve(__dirname, '../../'),
  transform: {},
  verbose:   true,
  testMatch: [
    '**/test/e2e/**/(*.)test.js',
  ],
};
