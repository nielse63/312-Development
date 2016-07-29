
// webpack.config.js
const webpack           = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const PurifyPlugin      = require('purifycss-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ImageminPlugin      = require('imagemin-webpack-plugin').default;
const OfflinePlugin     = require('offline-plugin');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config            = require('./config');

var loaders;
const inDev = process.env.NODE_ENV === 'development';
var plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	// new webpack.DefinePlugin({
	// 	'process.env': {
	// 		NODE_ENV : '"' + process.env.NODE_ENV + '"'
	// 	}
	// }),
	new webpack.ProvidePlugin({
		$               : "jquery",
		jQuery          : "jquery",
		"window.jQuery" : "jquery"
	}),
];

if(inDev) {
	loaders = ['react-hot', 'babel'];
} else {
	loaders = ['babel'];
	plugins = plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new ImageminPlugin({
			disable: false,
			optipng: {
				optimizationLevel: 3
			},
			gifsicle: {
				optimizationLevel: 1
			},
			jpegtran: {
				progressive: false
			},
			svgo: {
			},
			pngquant: null,
			plugins: []
		}),
		new PurifyPlugin({
			basePath: __dirname,
		}),
	]);
}

plugins = plugins.concat([
	new OfflinePlugin({
		publicPath    : '/dist/',
		relativePaths : false,
		ServiceWorker : {
			output: '../sw.js',
		},
		AppCache: false,
	})
]);
// console.log(plugins);

module.exports = {
	devtool: 'eval-source-map',
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

