/* eslint-disable unicorn/no-process-exit */
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const chalk = require('chalk');
const settings = require('./config/custom-settings');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then((chrome) => {
    opts.port = chrome.port; // eslint-disable-line no-param-reassign
    return lighthouse(url, opts, config)
      .then(results => chrome.kill().then(() => results.lhr))
      .catch((error) => {
        console.error(chalk.red(error));
        process.exit(1);
      });
  }).catch((error) => {
    console.error(chalk.red(error));
    process.exit(1);
  });
}

const opts = {
  chromeFlags: [
    '--show-paint-rects',
    '--headless',
  ],
};

// Usage:
launchChromeAndRunLighthouse('https://312development.com', opts, settings).then(({ categories }) => {
  const benchmarks = {
    performance:      0.9,
    pwa:              0.95,
    accessibility:    1,
    'best-practices': 0.85,
    seo:              0.9,
  };
  let error = false;
  Object.entries(categories).forEach(([key, value]) => {
    const { score, title } = value;
    const benchmark = benchmarks[key];
    if (score < benchmark) {
      error = true;
      console.log(chalk.red(`${title} failed:
Expected: ${benchmark}
Actual:   ${score}`));
    } else {
      console.log(chalk.green(`${title} passed: ${score}`));
    }
    console.log(chalk.yellow('='.repeat(29)));
  });
  if (error) {
    process.exit(1);
  } else {
    console.log(chalk.green('👍 Lighthouse tests passed'));
    process.exit();
  }
});
