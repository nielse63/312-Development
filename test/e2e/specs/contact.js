// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  Contact: function test(browser) {
    const url = `${browser.launch_url}/#/contact`;
    browser
      .url(url)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.contact')
      .assert.containsText('h1', 'CONTACT ME');
  },
  Accessible: function test(browser) {
    browser.axeInject();
    browser.axeRun();
  },
  End: function test(browser) {
    browser.end();
  },
};
