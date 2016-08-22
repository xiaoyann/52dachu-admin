var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname, '../');
var DIST_PATH = ROOT_PATH + '/dist';
var SRC_PATH = ROOT_PATH + '/src';

var config = {
  context: SRC_PATH,
  entry: {
    app: './app/main.ts',
    vendor: './app/vendor.ts'
  },
  output: {
    path: DIST_PATH,
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [ 'ts', 'angular2-template-loader' ]
      }
    ]
  },  
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      filename: DIST_PATH + '/index.html',
      template: SRC_PATH + '/app/index.html'
    })
  ]
};

module.exports = config;
