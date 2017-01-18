
import chai from 'chai'
import * as utils from './utils'

process.env.NODE_ENV = 'test'
global.chai = chai
global.expect = chai.expect
global.should = chai.should()
global.utils = utils
