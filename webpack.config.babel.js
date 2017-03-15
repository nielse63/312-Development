
import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import autoprefixer from 'autoprefixer'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const ENV = process.env.NODE_ENV
const CSS_MAPS = ENV !== 'production'

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(ENV),
    'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin({
    filename: '[name].[hash].css',
    allChunks: true,
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss() {
        return [
          autoprefixer,
        ]
      },
      sassLoader: {
        includePaths: [
          path.join(__dirname, 'src/components'),
        ],
      },
    },
  }),
  new HtmlWebpackPlugin({
    template: './home.html',
    filename: `${(ENV === 'dev-server' ? 'index' : 'home')}.html`,
    hash: CSS_MAPS,
    cache: false,
    minify: {},
  }),
  new CopyWebpackPlugin([
    { from: './favicon.ico', to: './' },
    { from: './robots.txt', to: './' },
    { from: './sitemap.xml', to: './' },
  ]),
]

const prodPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    comments: false,
    compress: {
      warnings: false,
      // drop_console: true,
    },
    mangle: {
      screw_ie8: true,
    },
  }),
  new FaviconsWebpackPlugin({
    logo: path.join(__dirname, 'src/assets/icons/icon-main.png'),
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
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.html$|\.css$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
  new ServiceWorkerWebpackPlugin({
    entry: path.join(__dirname, 'src/lib/sw.js'),
  }),
]

if (ENV === 'production') {
  plugins = plugins.concat(prodPlugins)
}

module.exports = {
  // basic
  context: path.join(__dirname, 'src'),
  entry: {
    bundle: './index.js',
    vendor: ['babel-polyfill', 'preact', 'preact-router', 'proptypes'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: `${ENV === 'production' ? '[chunkhash]' : '[hash]'}.[name].js`,
  },
  target: 'web',
  stats: 'errors-only',
  profile: ENV !== 'production',
  cache: ENV !== 'production',
  devtool: ENV === 'production' ? 'cheap-source-map' : 'inline-source-map',
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js') || assetFilename.endsWith('.html')
    },
  },

  // resolvers
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.scss'],
    alias: {
      components: path.join(__dirname, 'src/components'),
      style: path.join(__dirname, 'src/style'),
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },

  // loaders
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: `[local]${process.env.CSS_MODULES_IDENT || '_[hash:base64:5]'}`,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'postcss-loader',
        }],
      }),
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(xml|html|txt|md)$/,
      loader: 'raw-loader',
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader',
      query: {
        limit: 50000,
        mimetype: 'application/font-woff',
        name: './fonts/[hash].[ext]',
      },
    }, {
      rules: [{
        exclude: ['node_modules'],
        include: [
          path.join(__dirname, 'src'),
        ],
      }],
    },
    ],
  },

  // plugins
  plugins,

  // dev server
  devServer: {
    port: process.env.PORT || 9000,
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    compress: true,
  },
}
