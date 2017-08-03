/* eslint-disable global-require */

require('babel-register');
const config = require('../../config');

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
  custom_commands_path: [
    './node_modules/nightwatch-axe/src/commands',
  ],
  // globals_path: 'test/e2e/globals.js',

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    log_path: false,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path,
    },
  },

  test_settings: {
    default: {
      launch_url: `http://localhost:${process.env.PORT || config.dev.port}`,
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['--headless', '--disable-gpu'],
        },
      },
    },
  },
};
