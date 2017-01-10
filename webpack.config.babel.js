/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin'
import path from 'path'
import pkg from './package.json'

const ENV = process.env.NODE_ENV || 'development'
const CSS_MAPS = ENV !== 'production'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    vendor: ['moment', 'string'],
    bundle: './index.js',
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.less'],
    modulesDirectories: [
      path.resolve(__dirname, 'src/lib'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      style: path.resolve(__dirname, 'src/style'),
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'react-router': 'preact-compat',
    },
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /src\//,
        loader: 'source-map',
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style?singleton', [
          `css?sourceMap=${CSS_MAPS}&modules&importLoaders=1&localIdentName=[local]${process.env.CSS_MODULES_IDENT || '_[hash:base64:5]'}`,
          'postcss',
          `sass?sourceMap=${CSS_MAPS}`,
        ].join('!')),
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(xml|html|txt|md)$/,
        loader: 'raw',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          limit: 50000,
          mimetype: 'application/font-woff',
          name: './fonts/[hash].[ext]',
        },
      },
    ],
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, '/src/components')],
  },

  postcss: () => [
    autoprefixer({ browsers: 'last 2 versions' }),
  ],

  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
      disable: ENV !== 'production',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: ENV }),
    }),
    new HtmlWebpackPlugin({
      template: './home.html',
      filename: `${(ENV === 'dev-server' ? 'index' : 'home')}.html`,
    }),
    new CopyWebpackPlugin([
      { from: './favicon.ico', to: './' },
      { from: './robots.txt', to: './' },
      { from: './sitemap.xml', to: './' },
    ]),
    new webpack.PrefetchPlugin('moment'),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/assets/icons/icon-main.png'),
      prefix: 'assets/icons/',
      inject: true,
      emitStats: false,
      background: '#383333',
      title: '312 Development',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: true,
      },
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/lib/sw.js'),
    }),
  ],

  stats: { colors: true },

  // node: {
  //   global: true,
  //   process: false,
  //   Buffer: false,
  //   __filename: false,
  //   __dirname: false,
  //   setImmediate: false,
  // },

  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    colors: true,
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    open: true,
  },
}
