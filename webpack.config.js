
// webpack.config.js
const webpack           = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const PurifyPlugin      = require('purifycss-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OfflinePlugin     = require('offline-plugin');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config            = require('./config');

var loaders;
var plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.ProvidePlugin({
		$               : "jquery",
		jQuery          : "jquery",
		"window.jQuery" : "jquery"
	}),
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
		new PurifyPlugin({
			basePath: __dirname,
		}),
		new OfflinePlugin({
			publicPath    : '/dist/',
			relativePaths : false,
			ServiceWorker : {
				output: '../sw.js',
			},
			AppCache: false,
		})
	]);
}

module.exports = {
	devtool: 'source-map',
	entry: {
		app  : './app-client.js',
		scss : './assets/styles/main.scss'
	},
	output: {
		path       : __dirname + '/public/dist',
		filename   : '[name].js?[hash]',
		publicPath : '/dist/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: loaders,
			exclude: /(node_modules|bower_components)/,
		// }, {
		// 	test: /\.scss$/,
		// 	loader: ExtractTextPlugin.extract(
		// 		'style',
		// 		'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]!sass'
		// 	)
		}, {
			test: /\.scss$/,
			loaders: [
				"style",
				"css?sourceMap&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]!sass",
				"sass?sourceMap"
			]
		}, {
			test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
			loader: 'file?name=../fonts/[name].[ext]?[hash]'
		}, {
			test: /\.(jpg|png|gif|svg)$/i,
			exclude: /(node_modules|bower_components)/,
			loader: 'url?limit=1000&name=../images/[hash].[ext]'
		}]
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, "./assets/styles"),
		]
	},
	plugins : plugins,
};

