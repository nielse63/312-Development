
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_LOCAL = NODE_ENV === 'development';
const IN_DEV = NODE_ENV !== 'production';
const setPath = dir => path.resolve(__dirname, '..', dir);
const PORT = process.env.PORT || 8080;

// export vars
exports.NODE_ENV = NODE_ENV;
exports.IS_LOCAL = IS_LOCAL;
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
  filename:       'index.html',
  inject:         true,
  template:       setPath('index.html'),
  chunksSortMode: 'dependency',
  minify:         {
    removeComments:        true,
    collapseWhitespace:    true,
    removeAttributeQuotes: true,
  },

  // options
  title: 'Erik Nielsen | Chicago Senior UI Engineer',
});

// exports.extractCSS = new ExtractTextPlugin({
//   filename: '[name].[chunkhash].css',
//   disable:  IS_LOCAL,
//   // allChunks: true,
// });
exports.extractCSS = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: IN_DEV ? '[name].css' : '[name].[chunkhash].css',
  // chunkFilename: IN_DEV ? '[id].css' : '[id].[hash].css',
});
