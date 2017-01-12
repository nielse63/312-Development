/* global exec */

import * as utils from './utils'

require('shelljs/global')
const expect = require('chai').expect

export default function () {
  Object.keys(utils.URLS).forEach(page => {
    const url = utils.URLS[page]

    describe(url, function () {
      it('page should give valid status', function () {
        return new Promise(function (resolve, reject) {
          exec(`curl -I ${url} 2>/dev/null | head -n 1 | cut -d$' ' -f2`, {
            silent: true,
          }, function (code, stdout, stderr) {
            if (code) {
              reject(stderr)
            }
            const status = parseInt(stdout, 10)
            expect(status).to.be.within(200, 300)
            return resolve()
          })
        }).catch(function (err) {
          console.log(err)
        })
      })
    })
  })
}
