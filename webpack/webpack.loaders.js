
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

module.exports = {
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
          path.resolve(__dirname, '../src'),
        ],
      }],
    },
    ],
  },
}
