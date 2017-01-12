
import * as server from './server'
import status from './status.spec'
import nightmare from './nightmare'

Object.defineProperty(global, 'name_of_leaking_property', {
  set(value) {
    throw new Error('Found the leak!')
  },
})

describe('312 Development Tests', function () {
  this.timeout(0)

  before(function () {
    return server.start()
  })

  after(function (done) {
    server.stop(done)
  })

  describe('Check Page Status', function () {
    status()
  })

  if (!process.env.CI) {
    describe('Functional Tests', function () {
      nightmare()
    })
  }
})
