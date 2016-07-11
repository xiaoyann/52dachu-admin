// webpack-dev-server --config build/webpack.dev.js 
//      --hot           使用热替换
//      --deploy        发布到测试机，只发布 HTML 模板文件，css, js 等资源使用本地服务的，
//                      这样就可以在访问测试机时也可以照常使用热替换、自动刷新功能。
    

var path            =   require('path');
var utils           =   require('./utils');
var webpack         =   require('webpack');
var DeployPlugin    =   require('./deployPlugin');
var config          =   require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');

var port = 8080;
var host = utils.getIP();

// 本地环境静态资源 domain
var localPublicPath = 'http://' + host + ':' + port + '/';
//  测试机资源存放路径
var REMOTE_PUBLIC_PATH = require('./config.json').path;

var args = process.argv;
var hot = args.indexOf('--hot') > -1;
var deploy = args.indexOf('--deploy') > -1;

// 静态资源加上 domain
config.output.publicPath = localPublicPath; 

config.entry.app.unshift('webpack-dev-server/client?' + localPublicPath);

// 开启热替换相关设置
if (hot === true) {
    config.entry.app.unshift('webpack/hot/only-dev-server');
    config.module.loaders[0].loaders.unshift('react-hot');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

// 是否发布到测试环境
if (deploy === true) {
    config.plugins.push(new DeployPlugin([{
        reg: /html$/,
        to: path.join(REMOTE_PUBLIC_PATH, '/views/admin')
    }]));
}

new WebpackDevServer(webpack(config), {
    hot: hot,
    inline: true,
    historyApiFallback: true,
    publicPath: '/',
    compress: true,
    stats: {
      chunks: false,
      children: false,
      colors: true
    }
}).listen(port, host, function() {
  console.log(localPublicPath);
});



