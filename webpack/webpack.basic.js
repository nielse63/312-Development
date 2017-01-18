
import path from 'path'

const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: ['./index.js'],

  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'web',
  stats: {
    colors: true,
  },
  profile: true,
  cache: ENV !== 'production',
}
