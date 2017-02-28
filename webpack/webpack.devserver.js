
import path from 'path'

module.exports = {
  devServer: {
    port: process.env.PORT || 9000,
    contentBase: path.join(__dirname, '../src'),
    historyApiFallback: true,
    compress: true,
  },
}
