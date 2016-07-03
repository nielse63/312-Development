// webpack.config.js
// var path = require('path');
var webpack = require('webpack');
if(process.env.NODE_ENV === 'development'){
  var loaders = ['react-hot','babel']
} else {
  var loaders = ['babel']
}
module.exports = {
  devtool: 'eval',
  entry: {
  	ui  : './assets/scripts/app.js',
	app : './app-client.js'
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: loaders,
      // include: path.join(__dirname, 'app'),
      exclude: /(node_modules|bower_components)/,
      // exclude: /node_modules/
    }]
  },
  plugins : [
  new webpack.ProvidePlugin({
  	$: "jquery",
  	jQuery: "jquery",
  	"window.jQuery": "jquery"
  })
  ]
  // externals: {
  //       // require("jquery") is external and available
  //       //  on the global var jQuery
  //       "jquery": "jQuery"
  //   }
};
