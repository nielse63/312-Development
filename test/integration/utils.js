const puppeteer = require('puppeteer');
const chromeFlags = require('../chrome-flags');

const DEFAULTS = {
  viewport: {
    width: 1280,
    height: 630,
  },
};

export const newBrowser = async function newBrowser() {
  const browser = await puppeteer.launch({ args: chromeFlags });
  return browser;
};

export const newPage = async function newPage(browser, viewport = DEFAULTS.viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  return page;
};

export function urlForPage(pagename = '') {
  const port = process.env.PORT || 9999;
  return `http://localhost:${port}/#/${pagename}`;
}
