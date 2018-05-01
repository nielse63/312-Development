const path = require('path');
const webpackConfig = require('../../build/webpack.test.conf');
const chromeFlags = require('../chrome-flags');
process.env.CHROME_BIN = require('puppeteer').executablePath();

const reporters = ['spec', 'coverage'];
const coverageReporter = {
  dir: path.resolve(__dirname, '../../coverage'),
  reporters: [
    { type: 'text-summary' },
    { type: 'lcov', subdir: '.' },
  ],
};

if (!process.env.TRAVIS) {
  coverageReporter.reporters.push({
    type: 'html',
    subdir: '.',
  });
}

module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: chromeFlags,
      },
    },
    frameworks: ['mocha', 'chai'],
    reporters,
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
      'src/**/*.{js,vue}': ['coverage'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter,
    client: {
      mocha: {
        timeout: 5000,
      },
    },
    singleRun: true,
    plugins: [
      'karma-chai',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-webpack',
    ],
  });
};
