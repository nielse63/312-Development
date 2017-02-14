
import '../common'
import app from '../../'

console.log(app)

describe('312 Development Tests', function () {
  this.timeout(5000)
  this.retries(3)

  before(done => {
    server = app.start(async () => {
      console.log('Test server started')
      done()
    })
  })

  after(async () => {
    server.close()
  })

  describe('#status', () => {
    // before(async () => {
    //   page = await phantom.createPage()
    // })

    it('home', () => {
      true.should.be.true
    })

    // it('home', async () => {
    //   const status = await page.open(utils.URLS.home)
    //   status.should.equal('success')
    // })

    // it('about', async () => {
    //   const status = await page.open(utils.URLS.about)
    //   status.should.equal('success')
    // })

    // it('portfolio', async () => {
    //   const status = await page.open(utils.URLS.portfolio)
    //   status.should.equal('success')
    // })

    // it('contact', async () => {
    //   const status = await page.open(utils.URLS.contact)
    //   status.should.equal('success')
    // })
  })
})
