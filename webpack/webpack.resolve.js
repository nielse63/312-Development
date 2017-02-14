
import path from 'path'

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.scss'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      style: path.resolve(__dirname, '../src/style'),
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
}
