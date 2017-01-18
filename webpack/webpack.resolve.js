
import path from 'path'

module.exports = {
  resolve: {
    extensions: ['', '.js', '.json', '.scss'],
    modulesDirectories: [
      path.resolve(__dirname, '../src/lib'),
      path.resolve(__dirname, '../node_modules'),
      'node_modules',
    ],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      style: path.resolve(__dirname, '../src/style'),
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'react-router': 'preact-compat',
    },
  }
}
