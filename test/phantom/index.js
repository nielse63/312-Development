
import './common'
import Phantom from 'phantom'
import app from '../../'

let server
let phantom

describe('312 Development Tests', () => {
  // this.timeout(5000)

  before(done => {
    server = app.start(async () => {
      console.log('Test server started')
      phantom = await Phantom.create([], {
        ignoreSslErrors: 'yes'
      })
      done()
    })
  })

  after(async () => {
    await phantom.exit()
    server.close()
    phantom.kill()
  })

  describe('#status', () => {
    let page

    beforeEach(async () => {
      page = null
      page = await phantom.createPage()
    })

    it('home', async () => {
      const status = await page.open(utils.URLS.home)
      status.should.equal('success')
    })

    it('about', async () => {
      const status = await page.open(utils.URLS.about)
      status.should.equal('success')
    })

    it('portfolio', async () => {
      const status = await page.open(utils.URLS.portfolio)
      status.should.equal('success')
    })

    it('contact', async () => {
      const status = await page.open(utils.URLS.contact)
      status.should.equal('success')
    })
  })

  describe('#header', () => {
    let page
    let header

    before(async () => {
      page = await phantom.createPage()
      await page.property('viewportSize', {
        width: utils.VIEWPORT.width,
        height: utils.VIEWPORT.height
      })
      await page.open(utils.URLS.home)
      await page.includeJs('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js')
      header = await page.evaluate(() => {
        /* eslint-disable no-undef */
        const $header = $('[data-header]')
        return {
          exists: !!$header.length,
          width: $header.outerWidth(),
          height: $header.outerHeight()
        }
      })
    })

    it('should have header', () => {
      header.exists.should.be.true
    })

    it('header width', () => {
      expect(header.width).to.equal(utils.VIEWPORT.width)
    })

    it('header height', () => {
      expect(header.height).to.equal(66)
    })
  })
})
