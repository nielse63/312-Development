require('dotenv').config();
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
    compress:           true,
    https:              true,
    proxy:              {
      '/api': {
        target: process.env.API_HOST,
        secure: false,
        before(app) {
          require('./dev-server')(app); // eslint-disable-line global-require
        },
      },
    },
  },
});
