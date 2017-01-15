
import chai from 'chai'
import Nightmare from 'nightmare'
import * as utils from '../utils'

chai.should()

const nightmare = new Nightmare()

process.env.NODE_ENV = 'test'

global.chai = chai
global.nightmare = nightmare
global.utils = utils
