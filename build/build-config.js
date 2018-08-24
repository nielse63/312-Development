
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('../package.json');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IN_DEV = NODE_ENV !== 'production';
const setPath = dir => path.resolve(__dirname, '..', dir);
const PORT = process.env.PORT || 8080;

// export vars
exports.NODE_ENV = NODE_ENV;
exports.IN_DEV = IN_DEV;
exports.setPath = setPath;
exports.PORT = PORT;

exports.stats = {
  colors:        true,
  modules:       false,
  children:      false,
  chunks:        false,
  chunkModules:  false,
  cached:        true,
  builtAt:       true,
  assetsSort:    '!size',
  version:       true,
  entrypoints:   false,
  env:           true,
  excludeAssets: asset => !asset.endsWith('.js') && !asset.endsWith('.css'),
};

exports.extractHTML = new HtmlWebpackPlugin({
  inject:         true,
  template:       setPath('index.html'),
  chunksSortMode: 'dependency',
  minify:         {
    removeComments:        true,
    collapseWhitespace:    true,
    removeAttributeQuotes: true,
  },
  meta: {
    viewport:    'width=device-width, initial-scale=1.0, maximum-scale=5.0',
    description: pkg.description,
  },
  favicon: setPath('src/assets/images/icon.png'),

  // custom resource hinting strategy
  preload:  ['**/*.*'],
  prefetch: false,

  // options
  title:    'Erik Nielsen | Chicago Senior UI Engineer',
  homepage: pkg.homepage,
  ogimage:  '/homepage.jpg',
});

exports.extractCSS = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: IN_DEV ? '[name].css' : '[name].[chunkhash].css',
});

exports.metadata = {
  title:       pkg.name.replace(/-/g, ' '),
  description: pkg.description,
  themeColor:  '#0c96c0',
};
