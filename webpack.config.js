
// webpack.config.js
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

var loaders;
// var eslintConfig = {
// 	fix : false
// };
var plugins = [
	new ExtractTextPlugin("../styles/[name].css"),
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: ! process.env.NODE_ENV === 'development'
		}
	}),
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		"window.jQuery": "jquery"
	}),
	new OfflinePlugin({
		publicPath: '/dist/',
		relativePaths: false,
		ServiceWorker: {
			output: '../sw.js',
		},

		AppCache: {
			directory: '../appcache/',
		}
	})
];

// var plugins;
if(process.env.NODE_ENV === 'development') {
	loaders = ['react-hot', 'babel']
} else {
	loaders = ['babel']
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
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]!sass')
		}]
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, "./components"),
			path.join(__dirname, "node_modules/support-for/sass"),
		],
	},
	plugins : plugins,
};

