/* eslint-disable global-require */

const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { setPath, extractCSS } = require('./build-config');
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
    new FaviconsWebpackPlugin({
      logo:            setPath('src/assets/images/icon.png'),
      prefix:          'icons/',
      emitStats:       false,
      statsFilename:   'iconstats.json',
      persistentCache: true,
      inject:          true,
      background:      '#fff',
      title:           'Erik Nielsen',
      icons:           {
        // don't create icons for...
        firefox: false,
        coast:   false,
        yandex:  false,
        windows: false,

        // create icons for...
        android:      true,
        appleIcon:    true,
        appleStartup: true,
        favicons:     true,
        opengraph:    true,
        twitter:      true,
      },
    }),
    new CompressionPlugin({
      test:      /\.(js|css|woff|woff2|svg|html)$/,
      algorithm: 'gzip',
      asset:     '[path].gz[query]',
    }),
    extractCSS,
  ],
});
