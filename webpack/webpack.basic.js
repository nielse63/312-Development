
import path from 'path'

const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    bundle: './index.js',
    vendor: ['babel-polyfill', 'preact', 'preact-router', 'proptypes'],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
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
}
