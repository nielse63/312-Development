/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const setPath = dir => path.resolve(__dirname, dir);
const IS_LOCAL = NODE_ENV === 'development';
const PORT = process.env.PORT || 8080;

// const setPublicPath = () => {
//   if (NODE_ENV === 'production') {
//     return 'https://312development.com/';
//   } else if (NODE_ENV === 'staging') {
//     return 'https://three-one-two-staging.herokuapp.com/';
//   }
//   return '/';
// };

const stats = {
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
const extractCSS = new ExtractTextPlugin({
  filename: '[name].[chunkhash].css',
  disable:  IS_LOCAL,
});
const extractHTML = new HtmlWebpackPlugin({
  filename:       'index.html',
  inject:         true,
  template:       setPath('index.html'),
  chunksSortMode: 'dependency',
  // minify:         {
  //   removeComments:        true,
  //   collapseWhitespace:    true,
  //   removeAttributeQuotes: true,
  // },

  // options
  title: 'Erik Nielsen | Tech Lead & Senior UI Engineer',
  // environment:  NODE_ENV,
  // isLocalBuild: IS_LOCAL,
  // imgPath:      !IS_LOCAL ? 'assets' : 'src/assets',
});

const config = {
  mode:  IS_LOCAL ? 'development' : 'production',
  entry: {
    app: setPath('src/main.js'),
  },
  output: {
    path:       setPath('dist'),
    publicPath: '/',
    filename:   '[name].[chunkhash].js',
  },
  devtool:     IS_LOCAL ? '#cheap-module-eval-source-map' : '#source-map',
  stats,
  cache:       true,
  performance: {
    hints: 'warning',
  },
  optimization: {
    minimize:     !IS_LOCAL,
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
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias:      {
      vue$: 'vue/dist/vue.esm.js',
      '@':  setPath('src'),
    },
  },
  // recordsOutputPath: setPath('dist/records.json'),
  devServer: {
    stats,
    historyApiFallback: true,
    noInfo:             false,
    inline:             true,
    hot:                true,
    port:               PORT,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${NODE_ENV}"`,
      },
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HashedModuleIdsPlugin(), // should be used in prod only
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
    new CompressionPlugin({
      test:      /\.(js|css|woff|woff2|svg|html)$/,
      algorithm: 'gzip',
      asset:     '[path].gz[query]',
    }),
    new VueLoaderPlugin(),
    extractHTML,
    extractCSS,
  ],
  module: {
    rules: [
      {
        test:    /\.(js|vue)$/,
        loader:  'eslint-loader',
        enforce: 'pre',
        include: [setPath('src'), setPath('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
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
        include: [setPath('src'), setPath('test')],
      },
      {
        test: /\.scss$/,
        use:  !IS_LOCAL ?
          extractCSS.extract({
            fallback: 'style-loader',
            use:      ['css-loader', 'postcss-loader', 'sass-loader'],
          }) :
          [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
      },
      // {
      //   test:   /\.svg$/,
      //   loader: 'svg-sprite-loader',
      // },
      {
        test:    /\.(svg|png|jpg|gif)$/,
        loader:  'file-loader',
        options: {
          name:            '[name].[hash].[ext]',
          useRelativePath: false,
        },
      },
    ],
  },
};

module.exports = config;
