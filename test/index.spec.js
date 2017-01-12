
import * as utils from './utils'
import * as server from './server'
import status from './status.spec'
import nightmare from './nightmare'

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

  // if (!process.env.CI) {
  //   describe('Functional Tests', function () {
  //     this.timeout(2500)

  //     nightmare(utils)
  //   })
  // }
})
