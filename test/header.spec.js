
import * as utils from './utils'

const url = require('url')
const Nightmare = require('nightmare')
const expect = require('chai').expect
const should = require('chai').should

const URL = utils.urls.home
const SELECTORS = '[data-header] nav a'
const nightmare = new Nightmare({ show: true })

describe('Header', function () {
  describe('Header items', function () {
    this.timeout(0)

    it('should have header', function (done) {
      utils.elementExists('[data-header]', URL, done)
    })

    it('should have logo', function (done) {
      utils.elementExists('[data-header] > div > h1', URL, done)
    })

    it('should have nav', function (done) {
      utils.elementExists('[data-header] > div > nav', URL, done)
    })
  })

  describe('Nav Links', function () {
    this.timeout(0)
    let links = {
      length: 0,
      urls: [],
    }

    before(function () {
      return nightmare
        .goto(URL)
        .wait(SELECTORS)
        .evaluate(function (sel) {
          const tags = document.querySelectorAll(sel)
          if (!tags || !tags.length) {
            return links
          }
          const urls = []
          tags.forEach(function (a) {
            urls.push(a.href)
          })
          return {
            length: tags.length,
            urls,
          }
        }, SELECTORS)
        .end()
        .then(function (r) {
          links = r
        })
        .catch(function (e) {
          console.error(e)
        })
    })

    it('should have 4 links', function () {
      expect(links.length).to.equal(4)
    })

    it('should have home link first', function () {
      const object = url.parse(links.urls[0])
      expect(object.pathname).to.equal('/')
    })

    it('should have about link second', function () {
      const object = url.parse(links.urls[1])
      expect(object.pathname).to.equal('/about')
    })

    it('should have portfolio link third', function () {
      const object = url.parse(links.urls[2])
      expect(object.pathname).to.equal('/portfolio')
    })

    it('should have contact link fourth', function () {
      const object = url.parse(links.urls[3])
      expect(object.pathname).to.equal('/contact')
    })
  })
})
