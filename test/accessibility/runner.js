const chalk = require('chalk');
const lighthouse = require('lighthouse');
const chromeLauncher = require('lighthouse/chrome-launcher');
const spawn = require('cross-spawn');

function close() {
  return spawn('yarn', ['run', 'daemon:kill'], { stdio: 'inherit' });
}

function launchChromeAndRunLighthouse(url, flags = {}, config = null) {
  return chromeLauncher.launch().then((chrome) => {
    flags.port = chrome.port;
    return lighthouse(url, flags, config).then(results =>
      chrome.kill().then(() => results)).catch((error) => {
      console.trace(`CAUGHT ERROR:
${error}`);
      close().on('exit', () => {
        process.exit(1);
      });
    });
  });
}

const flags = {
  port: 9999,
  output: 'json',
  chromeFlags: ['--headless'],
};

// Usage:
launchChromeAndRunLighthouse('http://localhost:9999', flags).then((results) => {
  const accessibilityResults = results.reportCategories.filter(category => category.id === 'accessibility');
  const score = accessibilityResults[0].score;
  let code = 0;
  if (score < 90) {
    console.log(chalk.red(`FAILED: Accessibility score is ${score} - 90 is the minimum`));
    code = 1;
  } else {
    console.log(chalk.green(`PASSED: Accessibility score is ${score}!`));
  }
  close().on('exit', () => {
    process.exit(code);
  });
}, (error) => {
  console.log(`ERROR:
${error}`);
  close().on('exit', () => {
    process.exit(1);
  });
}).catch((error) => {
  console.trace(`CAUGHT ERROR:
${error}`);
  close().on('exit', () => {
    process.exit(1);
  });
});
