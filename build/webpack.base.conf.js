/* eslint-disable global-require */

const webpack = require('webpack');
const { NODE_ENV, IS_LOCAL, setPath, stats, extractCSS, extractHTML } = require('./build-config');
const { VueLoaderPlugin } = require('vue-loader');

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
        test:    /\.(js|vue)$/,
        loader:  'eslint-loader',
        enforce: 'pre',
        include: [setPath('src')],
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
        include: [setPath('src')],
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
        test:    /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${NODE_ENV}"`,
      },
    }),
    new VueLoaderPlugin(),
    extractHTML,
  ],
};
