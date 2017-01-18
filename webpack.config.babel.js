
import basic from './webpack/webpack.basic'
import resolve from './webpack/webpack.resolve'
import loaders from './webpack/webpack.loaders'
import plugins from './webpack/webpack.plugins'
import devserver from './webpack/webpack.devserver'

module.exports = Object.assign(
  {},
  basic,
  resolve,
  loaders,
  plugins,
  devserver
)
