
// webpack.config.js
const webpack           = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const PurifyPlugin      = require('purifycss-webpack-plugin');
const ImageminPlugin    = require('imagemin-webpack-plugin').default;
const OfflinePlugin     = require('offline-plugin');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config            = require('./config');
const read              = require('fs-readdir-recursive');
const precss            = require('precss');
const autoprefixer      = require('autoprefixer');

// load env file, if present
var dotenv = require('dotenv');
dotenv.load();
var envVars  = dotenv.config();
var envObject = {
	NODE_ENV : JSON.stringify(process.env.NODE_ENV)
};
if( envVars && Object.keys(envVars).length ) {
	for(var key in envVars) {
		var val = envVars[key];
		envObject[key] = JSON.stringify(val);
	}
}

var loaders;
var images = []
read('public/images').forEach(function(image) {
	images.push('../images/' + image);
});
images.push(':rest:')

var plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.DefinePlugin({
		'process.env': envObject
	}),
	new webpack.ProvidePlugin({
		$               : "jquery",
		jQuery          : "jquery",
		"window.jQuery" : "jquery"
	}),
];

if(process.env.NODE_ENV !== 'production') {
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
		caches        : {
			main : images
		},
		externals : images,
		ServiceWorker : {
			output: '../sw.js',
		},
		AppCache: false,
	})
]);

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		app  : './app-client.js',
		scss : './assets/styles/main.scss',
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
		}, {
			test: /\.scss$/,
			include: /assets/,
			exclude: /components/,
			loaders: [
				"style",
				"css?importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]!resolve-url!sass?sourceMap",
			]
		}, {
			test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
			loader: 'file?name=../fonts/[name].[ext]?[hash]'
		}, {
			test: /\.(jpg|png|gif|svg)$/i,
			exclude: /(node_modules|bower_components)/,
			loader: 'url?limit=1000&name=../images/[name].[ext]?[hash]'
		}, {
			test: /\.json$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'json'
		}]
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, "./assets/styles"),
		]
	},
	postcss: function() {
		return {
			defaults : [precss, autoprefixer],
			cleaner  : [autoprefixer({
				browsers: [
					'> 1%',
					'last 5 versions',
					'android 4',
					'opera 12',
					'ie 10'
				]
			})]
		}
	},
	plugins : plugins,
};
