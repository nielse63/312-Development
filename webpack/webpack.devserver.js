
import path from 'path'

module.exports = {
  devServer: {
    port: process.env.PORT || 9000,
    // host: 'localhost',
    // colors: true,
    // publicPath: '/',
    // contentBase: 'src',
    contentBase: path.join(__dirname, '../src'),
    historyApiFallback: true,
    // open: true,
    compress: true
  },
}
