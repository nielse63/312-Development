
import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin'

const ENV = process.env.NODE_ENV || 'development'
const CSS_MAPS = ENV !== 'production'

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
      },
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css'),
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, '../src/assets/icons/icon-main.png'),
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
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../src/lib/sw.js'),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
}
