
// webpack.config.js
const webpack = require('webpack');

var loaders;
var eslintConfig = {
	fix : false
};
var plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.DedupePlugin(),
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
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}));
	eslintConfig.fix = true
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
	plugins : plugins,
	eslint: eslintConfig
};

