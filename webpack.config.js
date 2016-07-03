
// webpack.config.js
var webpack = require('webpack');

if(process.env.NODE_ENV === 'development'){
	var loaders = ['react-hot', 'babel', 'eslint-loader']
} else {
	var loaders = ['babel', 'eslint-loader']
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
			exclude: /(node_modules|bower_components)/,
		}]
	},
	plugins : [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	],
	// eslint: {
	// 	fix : true
	// }
};
