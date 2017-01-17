/* globals nightmare */
/* eslint-disable import/first */

if (process.env.CI) {
  process.exit(0)
}

import shelljs from 'shelljs'
import './nightmare/common'
import app from '../'
import status from './status.spec'
import header from './nightmare/header.nightmare'
import banner from './nightmare/banner.nightmare'
import navigation from './nightmare/navigation.nightmare'

let server

describe('312 Development Tests', function () {
  this.retries(2)

  before(done => {
    server = app.start(() => {
      console.log('Started test server')
      done()
    })
  })

  after(() => {
    server.close()
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
