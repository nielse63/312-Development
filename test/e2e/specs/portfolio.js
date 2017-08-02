// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  Portfolio: function test(browser) {
    const url = `${browser.launch_url}/#/portfolio`;
    browser
      .url(url)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.portfolio')
      .assert.containsText('h1', 'PORTFOLIO');
  },
  Accessible: function test(browser) {
    browser.axeInject();
    browser.axeRun();
  },
  End: function test(browser) {
    browser.end();
  },
};
