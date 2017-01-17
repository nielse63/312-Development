/* globals nightmare */

import shelljs from 'shelljs'
import './nightmare/common'
import * as server from './server'
import status from './status.spec'
import header from './nightmare/header.nightmare'
import banner from './nightmare/banner.nightmare'
import navigation from './nightmare/navigation.nightmare'

describe('312 Development Tests', function () {
  this.timeout(5000)
  this.retries(2)

  before(done => {
    server.start(done)
  })

  after(done => {
    // shelljs.exec('yarn run killpm2', (code, stdout, stderr) => {
    //   server.stop(done)
    // })
    server.stop(done)
  })

  describe('#status', () => {
    status()
  })

  describe('#pages', () => {
    header()
    banner()
    navigation()
  })
})
