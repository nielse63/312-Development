
import test from 'ava';
// import path from 'path';
import { newBrowser, newPage } from './utils';

let browser;
let page;

test.before(async (t) => {
  browser = await newBrowser();
  if (!browser) {
    return;
  }
  page = await newPage(browser);
  page.on('error', (error) => {
    t.fail(error);
  });
  await page.goto('http://localhost:9999/');
  await page.waitForSelector('#app');
});

test.after(async () => {
  if (!browser) {
    return;
  }
  await browser.close();
});

test('Home Loads Page', async (t) => {
  const home = await page.$('.home');
  t.not(home, null);
});

test('Main Site Title', async (t) => {
  const element = await page.$('.site-title');
  t.not(element, null);

  const titles = await page.evaluate(() => ({
    h1: document.body.querySelector('.site-title').innerText,
    h2: document.body.querySelector('.site-title__sub').innerText,
    h3: document.body.querySelector('.site-title__sub__sub').innerText,
  }));
  t.is(titles.h1, 'ERIK NIELSEN');
  t.is(titles.h2, 'UI/UX SOFTWARE ENGINEER');
  t.is(titles.h3, 'AT ENOVA INTERNATIONAL');
});

test('Has Correct Number of Panels', async (t) => {
  const count = await page.evaluate(() => document.body.querySelectorAll('.panel').length);
  t.is(count, 3);
});

test.skip('Correct Panel Titles', async (t) => {
  const titles = await page.evaluate(() => {
    const panels = document.body.querySelectorAll('.panel');
    const output = [];
    panels.forEach((panel) => {
      const element = panel.querySelector('.panel__title');
      if(!element) {
        output.push('');
      } else {
        output.push(element.innerText);
      }
    })
    return output;
  });
  let hasAllTitles = true;
  titles.forEach((title) => {
    if(!title) {
      hasAllTitles = false;
      return false;
    }
  })
  if(!hasAllTitles) {
    await page.screenshot({
      path: path.join(__dirname, 'home-titles.png'),
      fullPage: true,
    });
  }
  t.is(titles.length, 3);
  t.is(titles[0], 'About Me');
  t.is(titles[1], 'Latest Work');
  t.is(titles[2], 'What I\'m Reading');
})

test('6 Reading Panels', async (t) => {
  const count = await page.evaluate(() => {
    const panels = document.body.querySelectorAll('.panel');
    const panel = panels.item(2);
    return panel.querySelectorAll('.card').length;
  });
  t.is(count, 6);
});
