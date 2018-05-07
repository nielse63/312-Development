/* eslint-disable global-require */

const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { setPath, extractCSS } = require('./build-config');
const baseConfig = require('./webpack.base.conf');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer');

module.exports = merge(baseConfig, {
  mode:  'production',
  output: {
    filename:   '[name].[chunkhash].js',
  },
  optimization: {
    minimize: true,
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
    new CleanWebpackPlugin(['dist'], {
      root: setPath('/'),
    }),
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

        // create icons for...
        windows:      true,
        android:      true,
        appleIcon:    true,
        appleStartup: true,
        favicons:     true,
        opengraph:    true,
        twitter:      true,
      },
    }),
    // new PrerenderSPAPlugin({
    //   staticDir: setPath('dist'),
    //   routes:    ['/'],
    //   renderer:  new PuppeteerRenderer({
    //     renderAfterElementExists: '#social-media',
    //   }),
    // }),
    new CompressionPlugin({
      test:      /\.(js|css|woff|woff2|svg|html)$/,
      algorithm: 'gzip',
      asset:     '[path].gz[query]',
    }),
    extractCSS,
  ],
});
