var path = require('path');
var exec = require('child_process').exec;
var utils = require('./utils');

var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var fullPath  = utils.fullPath;
var pickFiles = utils.pickFiles;

var ROOT_PATH = fullPath('../');
var DIST_PATH = ROOT_PATH + '/dist';
var DIST_JS = 'static/js';
var DIST_CSS = 'static/css';
var SRC_PATH = ROOT_PATH + '/src';
var CACHE_PATH = ROOT_PATH + '/cache';
var NODE_MODULES_PATH =  ROOT_PATH + '/node_modules';

var __DEV__ = !(process.env.NODE_ENV === 'production');
var HOST = utils.getIP();


// base
var alias = pickFiles({
	id: /(base\/[^\/]+).js$/,
	pattern: SRC_PATH + '/base/*.js'
});

// widgets
alias = Object.assign(alias, pickFiles({
	id: /(widgets\/[^\/]+)/,
	pattern: SRC_PATH + '/widgets/*/index.js'
}));

// components
alias = Object.assign(alias, pickFiles({
	id: /(components\/[^\/]+)/,
	pattern: SRC_PATH + '/components/*/index.js'
}));

// reducers
alias = Object.assign(alias, pickFiles({
	id: /(reducers\/[^\/]+).js/,
	pattern: SRC_PATH + '/js/reducers/*'
}));

// actions
alias = Object.assign(alias, pickFiles({
	id: /(actions\/[^\/]+).js/,
	pattern: SRC_PATH + '/js/actions/*'
}));


var loaders = [
	{
		test: /\.js$/,
		exclude: /node_modules/,
		include: SRC_PATH,
 			loaders: ['babel?cacheDirectory='+CACHE_PATH]
	},
	{
		test: /\.tpl$/,
		loader: 'html',
	},
	{
		test: /\.(?:jpg|gif|png|svg)$/,
		loaders: [
			'url?limit=8000&name=img/[hash].[ext]', 
			'image-webpack'
		]
	}
];

if (__DEV__) {
	loaders.push({
		test: /\.(scss|css)$/,
		loaders: ['style-loader', 'css-loader', 'sass-loader'] 
	});
} else {
	loaders.push({
		test: /\.(scss|css)$/,
		loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
	});
}


var plugins = [
	new webpack.DefinePlugin({
		__DEV__: __DEV__
	}),
	new HtmlwebpackPlugin({
		filename: 'index.html',
		chunks: ['app', 'lib'],
		template: SRC_PATH + '/pages/app.html',
	}),
	new webpack.optimize.CommonsChunkPlugin('lib', DIST_JS + '/lib.[hash].js')
];

if (__DEV__) {
	plugins.push(new ExtractTextPlugin(DIST_CSS + '/[name].[hash].css'));
}


module.exports = {
	context: SRC_PATH,
	entry: {
		app: [
			'./pages/app.js'
		],
		lib: [
			NODE_MODULES_PATH + '/redux',
			NODE_MODULES_PATH + '/react',
			NODE_MODULES_PATH + '/react-dom',
			NODE_MODULES_PATH + '/react-redux',
			NODE_MODULES_PATH + '/redux-thunk',
			NODE_MODULES_PATH + '/react-router',
		],
	},
	output: {
		path: DIST_PATH,
		filename: DIST_JS + '/[name].[hash].js'
	},
	module: {
		loaders: loaders,
	},
	resolve: {
		alias: alias
	},
	plugins: plugins
};


