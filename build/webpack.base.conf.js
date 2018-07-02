/* eslint-disable global-require */

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const {
  NODE_ENV, IN_DEV, setPath, stats, extractHTML,
} = require('./build-config');

module.exports = {
  entry: {
    app: setPath('src/main.js'),
  },
  output: {
    path:       setPath('dist'),
    publicPath: '/',
  },
  stats,
  cache:       true,
  performance: {
    hints: 'warning',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias:      {
      vue$: 'vue/dist/vue.esm.js',
      '@':  setPath('src'),
    },
  },
  module: {
    rules: [
      {
        test:    /\.vue$/,
        loader:  'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
          },
          transformToRequire: {
            video:  ['src', 'poster'],
            source: 'src',
            img:    'src',
            image:  'xlink:href',
          },
        },
      },
      {
        test:    /\.js$/,
        loader:  'babel-loader',
        include: [setPath('src')],
      },
      {
        test: /\.scss$/,
        use:  [
          IN_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use:  [
          {
            loader:  'file-loader',
            options: {
              name:            '[name].[hash].[ext]',
              useRelativePath: false,
            },
          },
          'img-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${NODE_ENV}"`,
      },
    }),
    new VueLoaderPlugin(),
    extractHTML,
  ],
};
