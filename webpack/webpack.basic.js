
import path from 'path'

const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    bundle: './index.js',
    vendor: ['babel-polyfill', 'preact', 'preact-router', 'proptypes'],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    // filename: '[name].[hash].js',
    filename: (ENV === 'production' ? '[chunkhash]' : '[hash]') + '.[name].js',
  },
  target: 'web',
  stats: "errors-only",
  // stats: {
  //   // Add asset Information
  //   assets: true,
  //   // Sort assets by a field
  //   assetsSort: "field",
  //   // Add information about cached (not built) modules
  //   cached: true,
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
  //   context: "../src/",
  //   // `webpack --colors` equivalent
  //   colors: true,
  //   // Add errors
  //   errors: true,
  //   // Add details to errors (like resolving log)
  //   errorDetails: true,
  //   // Add the hash of the compilation
  //   hash: true,
  //   // Add built modules information
  //   modules: true,
  //   // Sort the modules by a field
  //   modulesSort: "field",
  //   // Add public path information
  //   publicPath: true,
  //   // Add information about the reasons why modules are included
  //   reasons: true,
  //   // Add the source code of modules
  //   source: true,
  //   // Add timing information
  //   timings: true,
  //   // Add webpack version information
  //   version: true,
  //   // Add warnings
  //   warnings: true
  // };
  profile: ENV !== 'production',
  cache: ENV !== 'production',
  devtool: ENV === 'production' ? 'cheap-source-map' : 'inline-source-map',
  performance: {
    hints: "warning",
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    // assetFilter: function(assetFilename) {
    //   return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    // }
  },
}
