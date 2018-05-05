/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const setPath = dir => path.resolve(__dirname, dir);
const buildingForLocal = () => NODE_ENV === 'development';
const IS_LOCAL = buildingForLocal();
const PORT = process.env.PORT || 8080;

// eslint-disable-next-line no-console
console.log(`
===================================
NODE_ENV: ${process.env.NODE_ENV}
IS_LOCAL: ${IS_LOCAL}
===================================
`);

// const setPublicPath = () => {
//   if (NODE_ENV === 'production') {
//     return 'https://312development.com/';
//   } else if (NODE_ENV === 'staging') {
//     return 'https://three-one-two-staging.herokuapp.com/';
//   }
//   return '/';
// };

const extractCSS = new ExtractTextPlugin({
  filename: '[name].[chunkhash].css',
  disable:  IS_LOCAL,
});
const extractHTML = new HtmlWebpackPlugin({
  title:        'History Search',
  filename:     'index.html',
  inject:       true,
  template:     setPath('index.html'),
  environment:  NODE_ENV,
  isLocalBuild: IS_LOCAL,
  imgPath:      !IS_LOCAL ? 'assets' : 'src/assets',
});

const config = {
  mode:  IS_LOCAL ? 'development' : 'production',
  entry: {
    app: setPath('src/main.js'),
  },
  output: {
    path:       setPath('dist'), // this one sets the path to serve
    // publicPath: setPublicPath(),
    publicPath: '/',
    filename:   IS_LOCAL ? '[name].js' : '[name].[hash].js',
  },
  optimization: {
    minimize: !IS_LOCAL,
    // runtimeChunk: false,
    // splitChunks:  {
    //   chunks:      'all',
    //   // cacheGroups: {
    //   //   vendors: {
    //   //     test:     /[\\/]node_modules[\\/]/,
    //   //     priority: -10,
    //   //   },
    //   //   default: {
    //   //     minChunks:          2,
    //   //     priority:           -20,
    //   //     reuseExistingChunk: true,
    //   //   },
    //   // },
    // },
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias:      {
      vue$: 'vue/dist/vue.esm.js',
      '@':  setPath('src'),
    },
  },
  devServer: {
    historyApiFallback: true,
    noInfo:             false,
    inline:             true,
    hot:                true,
    port:               PORT,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
    extractHTML,
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${NODE_ENV}"`,
      },
    }),
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
      {
        test:   /\.svg$/,
        loader: 'svg-sprite-loader',
      },
      {
        test:    /\.(png|jpg|gif)$/,
        loader:  'file-loader',
        options: {
          name:            '[name].[ext]?[hash]',
          useRelativePath: buildingForLocal(),
        },
      },
    ],
  },
};

if (IS_LOCAL) {
  config.devtool = '#cheap-module-eval-source-map';
  config.plugins.concat([
    new FriendlyErrorsWebpackPlugin(),
  ]);
}

module.exports = config;
