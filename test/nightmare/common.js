
import chai from 'chai'
import Nightmare from 'nightmare'
import * as utils from '../utils'

if (process.env.CI) {
  process.exit()
}

process.env.NODE_ENV = 'test'

global.chai = chai
global.expect = chai.expect
global.utils = utils

global.nightmare = new Nightmare()
