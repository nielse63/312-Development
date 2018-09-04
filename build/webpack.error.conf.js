
const { setPath } = require('./build-config');

module.exports = {
  mode:  'production',
  entry: {
    error: setPath('src/error.js'),
  },
  output: {
    filename:   '[name].[chunkhash].js',
    path:       setPath('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias:      {
      vue$: 'vue/dist/vue.esm.js',
      '@':  setPath('src'),
    },
  },
  module: {
    rules: [
      {
        test:    /\.js$/,
        loader:  'babel-loader',
        include: [setPath('src')],
      },
    ],
  },
};
