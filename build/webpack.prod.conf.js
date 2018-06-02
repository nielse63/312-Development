/* eslint-disable global-require */

const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const { setPath, extractCSS } = require('./build-config');
const baseConfig = require('./webpack.base.conf');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer');

const prodConfig = merge(baseConfig, {
  mode:   'production',
  output: {
    filename: '[name].[chunkhash].js',
    // chunkFilename: '[name].[chunkhash].js',
  },
  optimization: {
    // nodeEnv: 'production',
    minimize:  true,
    minimizer: [
      new UglifyJsPlugin({
        cache:     true,
        parallel:  true,
        sourceMap: true, // set to true if you want JS source maps
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
    // new DashboardPlugin(),
  ],
});

module.exports = prodConfig;
