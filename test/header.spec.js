
import path from 'path'
import * as utils from './utils'

const url = require('url')
const Nightmare = require('nightmare')
const expect = require('chai').expect
const should = require('chai').should

const URL = utils.urls.home
const SELECTORS = '[data-header] nav a'
const VIEWPORT = {
  width: 1350,
  height: 650,
}

describe('Header', function () {
  this.timeout(0)
  const nightmare = new Nightmare({ show: true })
  let data = {}

  before(function () {
    return nightmare
        .viewport(VIEWPORT.width, VIEWPORT.height)
        .goto(URL)
        .wait('[data-header]')
        .wait(1500)
        .evaluate(function (sel) {
          const header = document.querySelector(sel)
          const logo = document.querySelector('[data-header] h1')
          const nav = document.querySelector('[data-header] nav')
          const navItems = document.querySelectorAll('[data-header] nav a')
          const navItemsArray = [].slice.call(navItems)
          const style = window.getComputedStyle(header)

          return {
            header: {
              exists: !!header,
              width: header.clientWidth,
              height: header.clientHeight,
            },
            logo: {
              exists: !!logo,
              width: logo.clientWidth,
              height: logo.clientHeight,
              left: logo.offsetLeft,
              link: window.getComputedStyle(document.querySelector('[data-header] h1 a')),
            },
            nav: {
              exists: !!nav,
              right: window.innerWidth - ((nav.offsetLeft + nav.clientWidth) - 15),
              items: navItemsArray.map(function (item) {
                const itemStyle = window.getComputedStyle(item)
                return {
                  paddingLeft: itemStyle.paddingLeft,
                  paddingRight: itemStyle.paddingRight,
                }
              }),
              links: navItemsArray.map(function (item) {
                return item.href
              }),
            },
          }
        }, '[data-header]')
        .end()
        .then(function (d) {
          data = d
        })
        .catch(function (e) {
          console.error(e)
        })
  })

  describe('Header items', function () {
    it('should have header', function () {
      expect(data.header.exists).to.be.true
    })

    it('should have logo', function () {
      expect(data.logo.exists).to.be.true
    })

    it('should have nav', function () {
      expect(data.nav.exists).to.be.true
    })
  })

  describe('Nav Links', function () {
    let links = {
      length: 0,
      urls: [],
    }

    before(function () {
      links = {
        length: data.nav.items.length,
        urls: data.nav.links,
      }
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

  describe('Header Style', function () {
    it('validate header styles', function () {
      expect(data.header.width).to.equal(VIEWPORT.width)
      expect(data.header.height).to.equal(66)
    })

    it('validate logo styles', function () {
      expect(data.logo.width).to.equal(218)
      expect(data.logo.height).to.equal(66)
      expect(data.logo.left).to.equal(50)
      expect(data.logo.link.color).to.equal('rgb(249, 247, 249)')
    })

    it('validate nav styles', function () {
      expect(data.nav.right).to.equal(50)
      data.nav.items.forEach(function (item) {
        expect(item.paddingLeft).to.equal('15px')
        expect(item.paddingRight).to.equal('15px')
      })
    })
  })
})
