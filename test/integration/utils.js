
const puppeteer = require('puppeteer');

const DEFAULTS = {
  viewport: {
    width: 1280,
    height: 630,
  },
};

export const newBrowser = async function newBrowser() {
  const browser = await puppeteer.launch();
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
