// webpack
//      --config build/webpack.release.js
//      --watch         实时发布
//      --p             压缩 
//      --deploy=test   发布到测试环境，默认选项
//      --deploy=online 发布到生产环境

var path            = require('path');
var config          = require('./webpack.config.js');
var DeployPlugin    = require('./deployPlugin');
var webpack         = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//  测试机资源存放路径
var REMOTE_PUBLIC_PATH = require('./config.json').path;

// 测试环境静态资源 domain
var testPublicPath      = 'http://52dachu.com/';
// 生产环境静态资源 domain
var onlinePublicPath    = '/';

var args = process.argv;
var online = args.indexOf('--deploy=online') > -1;

if (online) {
    // 设置静态资源 domain
    config.output.publicPath = onlinePublicPath;
    // 发布到版本库
    var backend = path.resolve(__dirname, '../../backend');
    // /Users/xiaoyan/working/guwenbao/backend/app/views/Ddtalk/Index.phtml
    // /Users/xiaoyan/working/guwenbao/backend/public/static/ddtalk
    config.output.path = backend;
    config.output.filename = path.join('public', config.output.filename);
    // 重新配置插件
    config.plugins = [
        config.plugins[0],
        new HtmlwebpackPlugin({
            filename: 'views/admin/index.html',
            chunks: ['app', 'lib'],
            template: path.join(__dirname, '../src/pages/app.html')
        }),
        new webpack.optimize.CommonsChunkPlugin('lib', 'static/js/lib.[hash].js'),
        new ExtractTextPlugin('static/css/[name].[hash].css'),
        new ReplaceText()
    ];
} else {
    // 设置静态资源 domain
    config.output.publicPath = testPublicPath;
    // 发布到测试环境
    config.plugins.push(new DeployPlugin([
        {
            reg: /html$/,
            to: REMOTE_PUBLIC_PATH + '/app/views/admin/index.html'
        },
        {
            reg: /(css|js)$/,
            to: REMOTE_PUBLIC_PATH + '/public'
        }
    ]));
}

var fs = require('fs');
function ReplaceText() {}
ReplaceText.prototype.apply = function(compiler) {
    compiler.plugin('done', function(stats) {
        var fileName = 'app/views/admin/index.html';
        var file = stats.compilation.assets[fileName];
        if (file) {
            var content = file.source();
            content = content.replace(/\/public\//g, '/');
            fs.writeFileSync(file.existsAt, content, 'utf-8');
        }
    });
}


module.exports = config;

