
if (process.env.CI) {
  process.exit()
}

import 'babel-polyfill'
import chai from 'chai'
import p from 'phantom'
import * as utils from './utils'

process.env.NODE_ENV = 'test'
global.chai = chai
global.expect = chai.expect
global.should = chai.should()
global.utils = utils
