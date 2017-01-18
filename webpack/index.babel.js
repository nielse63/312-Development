
import 'babel-polyfill'
import basic from './webpack.basic'
import resolve from './webpack.resolve'
import loaders from './webpack.loaders'
import plugins from './webpack.plugins'
import devserver from './webpack.devserver'

const config = Object.assign(
  {},
  basic,
  resolve,
  loaders,
  plugins,
  devserver
)

console.log(config)
