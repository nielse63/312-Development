
import * as utils from '../utils'
import banner from './banner.nightmare'
import header from './header.nightmare'
// require('./header.nightmare')
// const banner = require('./banner.nightmare')

Object.keys(utils.URLS).forEach(function (key) {
  // const url = utils.URLS[key]
  header(utils.URLS[key])
  banner(utils.URLS[key])
})
