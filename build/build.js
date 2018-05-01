
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(`${stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  })}\n\n`);
});
