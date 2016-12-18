
import * as utils from './utils'

const Nightmare = require('nightmare')
const expect = require('chai').expect
const should = require('chai').should

function basicPageSuite(url) {
  describe('#header-items', function () {
    this.timeout(15000)

    it('should have logo', function (done) {
      utils.elementExists('[data-header] > h1', url, done)
    })

    // it('should have header when loaded', function (done) {
    //   this.timeout(5000)
    //   utils.elementExists('#app > header', url, done)
    // })

    // it('should have footer when loaded', function (done) {
    //   this.timeout(5000)
    //   utils.elementExists('#app > footer', url, done)
    // })
  })
}

describe('Header', () => {
  basicPageSuite(utils.urls.home)
})
