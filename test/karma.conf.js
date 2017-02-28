require('babel-register')
const webpack = require('../webpack.config.babel')
const path = require('path')

// webpack.module.rules.push({
//   test: /\.jsx?$/,
//   use: 'isparta-loader',
//   include: path.resolve(__dirname, '../src'),
// })

module.exports = function (config) {
  config.set({
    basePath: path.resolve(__dirname, '../'),
    frameworks: ['mocha', 'chai-sinon'],
    // reporters: ['mocha', 'coverage'],
    reporters: ['dots'],
    singleRun: true,
    // plugins: [
    //   'karma-firefox-launcher',
    //   'karma-chai-sinon',
    //   'karma-mocha',
    //   'karma-sourcemap-loader',
    //   'karma-webpack',
    // ],

    browsers: ['Firefox'],
    // exclude: ['test/karma/**/*'],

    files: [
      'test/index.js',
    ],

    preprocessors: {
      'test/index.js': ['webpack'],
      // 'src/**/*.js': ['webpack', 'sourcemap'],
      // '**/*.js': ['sourcemap']
    },

    webpack,
    webpackMiddleware: {
      stats: 'errors-only',
    },
  })
}
