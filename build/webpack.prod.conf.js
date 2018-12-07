/* eslint-disable global-require */

const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const { setPath, extractCSS, metadata } = require('./build-config');
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
  mode:   'production',
  output: {
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    minimize:  true,
    minimizer: [
      new UglifyJsPlugin({
        cache:     true,
        parallel:  true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test:   /[\\/]node_modules[\\/]/,
          name:   'vendors',
          chunks: 'all',
        },
        default: {
          priority:           -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      { from: 'static/**/*', to: setPath('dist'), flatten: true },
    ]),
    new WebpackPwaManifest({
      name:             metadata.title,
      short_name:       `${metadata.title.substring(0, 9)}...`,
      description:      metadata.description,
      background_color: metadata.themeColor,
      theme_color:      metadata.themeColor,
      orientation:      'portrait',
      display:          'standalone',
      start_url:        '.',
      inject:           true,
      fingerprints:     false,
      icons:            [
        {
          src:   setPath('src/assets/images/icon.png'),
          sizes: [96, 128, 144, 192, 256, 384, 512],
        },
      ],
      ios: {
        'apple-mobile-web-app-title':            metadata.title,
        'apple-mobile-web-app-status-bar-style': 'black',
      },
    }),
    new ResourceHintWebpackPlugin(),
    new OfflinePlugin({
      safeToUseOptionalCaches: true,
      externals:               [
        'https://fonts.googleapis.com/css?family=Nunito:400,400i,700',
      ],
      appShell: '/',
      caches:   {
        main: [
          '*.js',
          '*.css',
          'index.html',
        ],
        additional: [
          ':rest:',
        ],
        optional: [
          ':externals:',
        ],
      },
      ServiceWorker: {
        events: true,
      },
      AppCache: {
        events: true,
      },
    }),
    new CompressionPlugin({
      test:      /\.(js|css|woff|woff2|svg|html)$/i,
      algorithm: 'gzip',
      filename:  '[path].gz[query]',
      cache:     true,
    }),
    extractCSS,
    new HtmlCriticalWebpackPlugin({
      base:      setPath('dist'),
      src:       'index.html',
      dest:      'index.html',
      inline:    true,
      minify:    true,
      extract:   true,
      width:     1240,
      height:    650,
      penthouse: {
        blockJSRequests: false,
      },
    }),
  ],
});
