
const SITE_URL = 'http://localhost:3001'

casper.on('load.failed', function (args) {
  console.log('failed: ')
  console.log(args)
})

describe('Homepage', function() {
  before(function() {
    return server.start().then(function() {
      casper.start(SITE_URL)
    })
  })

  it('should match title', function() {
    casper.then(function() {
      '312 Development | UI & JavaScript Software Engineer'.should.matchTitle
    })
  })

  it('should have header', function() {
    casper.waitUntilVisible('[data-header]', function() {
      '[data-header]'.should.be.inDOM
    })
  })
})
