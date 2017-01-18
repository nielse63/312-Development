
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'

const ENV = process.env.NODE_ENV || 'development'
const CSS_MAPS = ENV !== 'production'

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /src\//,
        loader: 'source-map',
      },
    ],
    loaders: [
      {
        test: /\.js?$/,
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
      }],
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, '/src/components')],
  },
  postcss: () => [
    autoprefixer({ browsers: '> 1%' }),
  ],
}
