// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  About: function test(browser) {
    const url = `${browser.launch_url}/#/about`;
    browser
      .url(url)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.about')
      .assert.containsText('h1', 'ABOUT ME');
  },
  Accessible: function test(browser) {
    browser.axeInject();
    browser.axeRun();
  },
  End: function test(browser) {
    browser.end();
  },
};
