
// webpack.config.js
const webpack           = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const OfflinePlugin     = require('offline-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const AssetsPlugin      = require('assets-webpack-plugin');
const path              = require('path');
const fs                = require('fs');

var loaders;

// plugins
var plugins = [
	new ExtractTextPlugin("../styles/[name].css"),
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.ProvidePlugin({
		$               : "jquery",
		jQuery          : "jquery",
		"window.jQuery" : "jquery"
	}),
	// new AssetsPlugin({
	// 	filename : 'public/assets.json'
	// }),
	new OfflinePlugin({
		publicPath              : '/dist/',
		relativePaths           : false,
		// caches                  : caches,
		// externals               : externals,
		// safeToUseOptionalCaches : true,
		ServiceWorker           : {
			output : '../sw.js',
		},
		AppCache: false,
	})
];

if(process.env.NODE_ENV === 'development') {
	loaders = ['react-hot', 'babel'];
} else {
	loaders = ['babel'];
	plugins = plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
	]);
}

module.exports = {
	devtool: 'eval',
	node: {
		net     : "empty",
		tls     : "empty",
		hiredis : "empty",
	},
	entry: {
		ui  : './assets/scripts/app.js',
		app : './app-client.js'
	},
	output: {
		path       : __dirname + '/public/dist',
		filename   : '[name].bundle.js',
		publicPath : '/dist/'
		// path          : __dirname + '/public/dist',
		// filename      : '[name].[hash].js',
		// publicPath    : '/dist/',
		// chunkFilename : "[id].[hash].bundle.js"
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

