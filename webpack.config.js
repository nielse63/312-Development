
// webpack.config.js
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

var loaders;
// var eslintConfig = {
// 	fix : false
// };
var plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	// new CompressionPlugin({
	// 	asset: "[path].gz.js",
	// 	algorithm: "gzip",
	// 	test: /\.js$/,
	// 	threshold: 10240,
	// 	minRatio: 0.8
	// }),
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		"window.jQuery": "jquery"
	})
];

// var plugins;
if(process.env.NODE_ENV === 'development') {
	loaders = ['react-hot', 'babel']
} else {
	loaders = ['babel']
	var options = {}
	if(process.argv.indexOf('--release') < 0) {
		options = {
			compress: {
				warnings: false
			}
		}
	}
	plugins.push(new webpack.optimize.UglifyJsPlugin(options));
	// eslintConfig.fix = true
}

module.exports = {
	devtool: 'eval',
	node: {
		net: "empty",
		tls: "empty",
		hiredis: "empty",
	},
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
	plugins : plugins,
	// eslint: eslintConfig
};

