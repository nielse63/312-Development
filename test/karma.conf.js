require('babel-register');
var webpack = require('../webpack.config.babel.js');

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'chai-sinon'],
    reporters: ['mocha', 'coverage'],

    browsers: ['PhantomJS'],

    files: [
      'test/browser/**/*.js'
    ],

    preprocessors: {
      'test/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack'],
      '**/*.js': ['sourcemap'],
      'src/**/*.js': ['coverage'],
    },

    webpack: webpack,
    webpackMiddleware: { noInfo: true },

    coverageReporter: {
      dir : 'coverage/'
    },
  });
};
