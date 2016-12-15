'use strict';

var _webpack = require('webpack');
var _webpack2 = _interopRequireDefault(_webpack);
var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);
var _htmlWebpackPlugin = require('html-webpack-plugin');
var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);
var _autoprefixer = require('autoprefixer');
var _autoprefixer2 = _interopRequireDefault(_autoprefixer);
var _copyWebpackPlugin = require('copy-webpack-plugin');
var _copyWebpackPlugin2 = _interopRequireDefault(_copyWebpackPlugin);
var _offlinePlugin = require('offline-plugin');
var _offlinePlugin2 = _interopRequireDefault(_offlinePlugin);
var _path = require('path');
var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENV = process.env.NODE_ENV || 'development';

var CSS_MAPS = ENV !== 'production';

module.exports = {
  context: _path2.default.resolve(__dirname, "src"),
  entry: './index.js',

  output: {
    path: _path2.default.resolve(__dirname, "build"),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.less'],
    modulesDirectories: [_path2.default.resolve(__dirname, "src/lib"), _path2.default.resolve(__dirname, "node_modules"), 'node_modules'],
    alias: {
      components: _path2.default.resolve(__dirname, "src/components"), // used for tests
      style: _path2.default.resolve(__dirname, "src/style"),
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /src\//,
      loader: 'source-map'
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.scss$/,
      loader: _extractTextWebpackPlugin2.default.extract('style?singleton', ['css?sourceMap=' + CSS_MAPS + '&modules&importLoaders=1&localIdentName=[local]' + (process.env.CSS_MODULES_IDENT || '_[hash:base64:5]'), 'postcss', 'sass?sourceMap=' + CSS_MAPS].join('!'))
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(xml|html|txt|md)$/,
      loader: 'raw'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url',
      query: {
        limit: 50000,
        mimetype: 'application/font-woff',
        name: './fonts/[hash].[ext]'
      }
    }]
  },

  sassLoader: {
    includePaths: [_path2.default.resolve(__dirname, "/src/components")]
  },

  postcss: function postcss() {
    return [(0, _autoprefixer2.default)({ browsers: 'last 2 versions' })];
  },

  plugins: [new _webpack2.default.NoErrorsPlugin(), new _extractTextWebpackPlugin2.default('style.css', {
    allChunks: true,
    disable: ENV !== 'production'
  }), new _webpack2.default.optimize.DedupePlugin(), new _webpack2.default.DefinePlugin({
    'process.env': JSON.stringify({ NODE_ENV: ENV })
  }), new _htmlWebpackPlugin2.default({
    template: './index.html',
    minify: { collapseWhitespace: true }
  }), new _copyWebpackPlugin2.default([{ from: './manifest.json', to: './' }, { from: './favicon.ico', to: './' }]), new _offlinePlugin2.default({
    relativePaths: false,
    AppCache: false,
    publicPath: '/',
    externals: ['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js']
  }), new _webpack2.default.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  })].concat(ENV === 'production' ? [new _webpack2.default.optimize.OccurenceOrderPlugin()] : []),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    colors: true,
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    open: true,
    proxy: {
    }
  }
};
