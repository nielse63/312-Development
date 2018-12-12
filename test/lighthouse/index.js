/* eslint-disable unicorn/no-process-exit */
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

let urls = [];
process.argv.forEach((arg) => {
  if (arg.startsWith('--url')) {
    const parts = arg.split('--url=');
    const url = parts.pop();
    urls.push(url.trim());
  }
});
if (!urls.length) {
  urls.push('https://312development.com');
}
urls = [...new Set(urls)];

async function launchChromeAndRunLighthouse(url, opts, config = null) {
  console.log(`Checking ${url}`);
  const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags });
  opts.port = chrome.port; // eslint-disable-line no-param-reassign

  const results = await lighthouse(url, opts, config);
  chrome.kill();
  return results.lhr;
}

const opts = {
  chromeFlags: [
    '--headless',
  ],
};

const benchmarks = {
  performance:      0.85,
  pwa:              0.95,
  accessibility:    1,
  'best-practices': 0.85,
  seo:              0.9,
};
const settings = {
  extends: 'lighthouse:default',
};

const promises = urls.map(url => launchChromeAndRunLighthouse(url, opts, settings));

(async () => {
  const output = await Promise.all(promises);
  let hasError = false;
  output.forEach(({ requestedUrl, categories }) => {
    console.log(requestedUrl);
    Object.entries(categories).forEach(([key, value]) => {
      const { score, title } = value;
      const benchmark = benchmarks[key];
      if (score < benchmark) {
        console.log(` ❌  ${title}: (${score}/${benchmark})`);
        hasError = true;
      } else {
        console.log(` 👍  ${title}: (${score}/${benchmark})`);
      }
    });
  });
  if (hasError) {
    process.exit(1);
  }
})();
