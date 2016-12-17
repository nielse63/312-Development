/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import OfflinePlugin from 'offline-plugin'
import path from 'path'

const ENV = process.env.NODE_ENV || 'development'

const CSS_MAPS = ENV !== 'production'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['whatwg-fetch', './index.js'],

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.less'],
    modulesDirectories: [
      path.resolve(__dirname, 'src/lib'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
    alias: {
      components: path.resolve(__dirname, 'src/components'),    // used for tests
      style: path.resolve(__dirname, 'src/style'),
      react: 'preact-compat',
      'react-dom': 'preact-compat',
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

  plugins: ([
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
      disable: ENV !== 'production',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: ENV }),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      // minify: { collapseWhitespace: true },
      hash: ENV === 'production' ? false : true
    }),
    new CopyWebpackPlugin([
   { from: './manifest.json', to: './' },
   { from: './favicon.ico', to: './' },
    ]),
    new OfflinePlugin({
      relativePaths: false,
      AppCache: false,
      publicPath: '/',
      externals: [
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
      ],
    }),
  ]).concat(ENV === 'production' ? [
    new webpack.optimize.OccurenceOrderPlugin(),
  ] : []),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
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
      // OPTIONAL: proxy configuration:
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
    },
  },
}
