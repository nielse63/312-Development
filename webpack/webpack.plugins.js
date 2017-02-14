
import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import autoprefixer from 'autoprefixer'

const ENV = process.env.NODE_ENV || 'development'
const CSS_MAPS = ENV !== 'production'

module.exports = {
  plugins: [
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
        context: path.resolve(__dirname, '../'),
        postcss() {
          // autoprefixer({ browsers: '> 1%' })
          return [
            // autoprefixer.bind(null, { browsers: '> 1%' })
            autoprefixer,
          ]
        },
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, '../src/components'),
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
      },
      mangle: {
        screw_ie8: true,
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
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.css$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../src/lib/sw.js'),
    }),
  ],
}
