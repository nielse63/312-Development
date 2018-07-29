
const merge = require('webpack-merge');
const { PORT, stats } = require('./build-config');
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
  mode:   'development',
  output: {
    filename: '[name].js',
  },
  devtool:   '#cheap-module-eval-source-map',
  devServer: {
    stats,
    historyApiFallback: true,
    noInfo:             true,
    inline:             true,
    hot:                true,
    port:               PORT,
    proxy:              {
      '/api': {
        target: process.env.API_HOST,
      },
    },
  },
});
