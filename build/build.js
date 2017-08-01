require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  // stats: {
  //   // Add asset Information
  //   assets: true,
  //   // Sort assets by a field
  //   assetsSort: "field",
  //   // Add information about cached (not built) modules
  //   cached: true,
  //   // Show cached assets (setting this to `false` only shows emitted files)
  //   cachedAssets: true,
  //   // Add children information
  //   children: true,
  //   // Add chunk information (setting this to `false` allows for a less verbose output)
  //   chunks: true,
  //   // Add built modules information to chunk information
  //   chunkModules: true,
  //   // Add the origins of chunks and chunk merging info
  //   chunkOrigins: true,
  //   // Sort the chunks by a field
  //   chunksSort: "field",
  //   // Context directory for request shortening
  //   // context: "../src/",
  //   // `webpack --colors` equivalent
  //   colors: true,
  //   // Display the distance from the entry point for each module
  //   depth: false,
  //   // Display the entry points with the corresponding bundles
  //   entrypoints: false,
  //   // Add errors
  //   errors: true,
  //   // Add details to errors (like resolving log)
  //   errorDetails: true,
  //   // Exclude modules which match one of the given strings or regular expressions
  // //   exclude: [],
  // //   // Add the hash of the compilation
  // //   hash: true,
  // //   // Set the maximum number of modules to be shown
  // //   maxModules: 15,
  // //   // Add built modules information
  // //   modules: true,
  // //   // Sort the modules by a field
  // //   modulesSort: "field",
  // //   // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
  // //   moduleTrace: true,
  // //   // Show performance hint when file size exceeds `performance.maxAssetSize`
  // //   performance: true,
  // //   // Show the exports of the modules
  // //   providedExports: false,
  // //   // Add public path information
  // //   publicPath: true,
  //   // Add information about the reasons why modules are included
  //   reasons: true,
  // //   // Add the source code of modules
  // //   source: true,
  //   // Add timing information
  //   timings: true,
  //   // Show which exports of a module are used
  //   usedExports: false,
  //   // Add webpack version information
  //   version: true,
  //   // Add warnings
  //   warnings: true,
  // //   // Filter warnings to be shown (since webpack 2.4.0),
  // //   // can be a String, Regexp, a function getting the warning and returning a boolean
  // //   // or an Array of a combination of the above. First match wins.
  // //   warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false
  // },

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
