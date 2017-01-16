
import chai from 'chai'
import Nightmare from 'nightmare'
import * as utils from '../utils'


process.env.NODE_ENV = 'test'

global.chai = chai
global.expect = chai.expect
global.utils = utils

if (!process.env.CI) {
  global.nightmare = new Nightmare()
}
