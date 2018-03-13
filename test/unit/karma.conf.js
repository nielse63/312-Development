const webpackConfig = require('../../build/webpack.test.conf');
process.env.CHROME_BIN = require('puppeteer').executablePath()

const reporters = ['spec', 'coverage'];
const coverageReporter = {
  dir: './coverage',
  reporters: [
    { type: 'text-summary' },
  ],
};

if (process.env.TRAVIS) {
  coverageReporter.reporters.push({
    type: 'lcov',
    subdir: '.',
    dir: './coverage',
  });
  reporters.push('coveralls');
} else {
  coverageReporter.reporters.push({
    type: 'html',
  });
}

module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'chai'],
    reporters,
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter,
    singleRun: true,
    plugins: [
      'karma-chai',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-coveralls',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-webpack',
    ],
  });
};
