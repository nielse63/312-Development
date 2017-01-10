/* global exec */

import * as utils from './utils'

require('shelljs/global')
const expect = require('chai').expect

describe('Check Page Status', function () {
  Object.keys(utils.URLS).forEach(page => {
    const url = utils.URLS[page]

    describe(url, function () {
      this.timeout(0)

      it('page should not be a 404', function (done) {
        exec(`curl -I ${url} 2>/dev/null | head -n 1 | cut -d$' ' -f2`, {
          silent: true,
        }, function (code, stdout, stderr) {
          if (code) return false
          const status = parseInt(stdout, 10)
          expect(status).to.be.within(200, 300)
          return done()
        })
      })
    })
  })
})
