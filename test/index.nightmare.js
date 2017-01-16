/* globals nightmare */

import shelljs from 'shelljs'
import './nightmare/common'
import * as server from './server'
import status from './status.spec'
import header from './nightmare/header.nightmare'
import banner from './nightmare/banner.nightmare'
import navigation from './nightmare/navigation.nightmare'

describe('312 Development Tests', function () {
  this.timeout(10000)
  this.retries(2)

  before(done => {
    server.start(done)
  })

  after(done => {
    shelljs.exec('./node_modules/.bin/pm2 kill', {
      silent: true,
    }, (code, stdout, stderr) => {
      server.stop(done)
    })
  })

  describe('#status', () => {
    status()
  })

  if (!process.env.CI) {
    describe('#pages', () => {
      header()
      banner()
      navigation()
    })
  }
})
