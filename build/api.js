// 生成 API 配置文件

var fs = require('fs');
var path = require('path');
var utils = require('./utils');

// 本机内网 IP 
var IP = utils.getIP();
var args = process.argv.slice(2);
var type = args[0] || 'normal';
var dist = path.resolve(__dirname, '../src/base/api.js');

// 各个环境域名设置
var domains = {};
// 默认不加具体域名
domains.normal  = '/';
// 本地模拟接口域名
domains.local   = 'http://' + IP + ':3000';
// 测试环境域名
domains.test    = 'http://52dachu.com';
// 线上环境域名
domains.online  = 'http://52dachu.com';
// 接口前缀
var prefix = '';

// API 配置
var apis = {
    // 登录 post
    "admin_login": "/admin/login",
    // 退出登录 get
    "admin_logout": "/admin/logout",
    // 添加文章 post 
    // 删除文章 delete
    // 更新文章 put 
    // 文章列表 get
    "admin_article": "/admin/article",
    // 添加分类 post 
    // 删除分类 delete
    // 更新分类 put 
    // 分类列表 get
    "admin_category": "/admin/category",
    // 添加标签 post
    // 删除标签 delete
    // 更新标签 put
    // 标签列表 get
    "admin_tag": "/admin/tag"
};

if (!domains[type]) {
    console.log('\nerror: unknown type ', '`'+type+'`', '\n');
    console.log('Please pass one of: ', Object.keys(domains).join(', '), '\n');
    process.exit(1);
}

var list = ['// API配置'];
var domain = domains[type];
for (var name in apis) {
    var url = join(domain, prefix, apis[name]);
    list.push(template(name, url));
}
fs.writeFileSync(dist, list.join('\n'));
console.log(list.join('\n'));

function join() {
    return [].slice.call(arguments, 0).map(function(item) {
        return item ? '/' + item.replace(/^\/+|\/+$/g, '') : '';
    }).join('').slice(1);
}

function template(name, url) {
    return "export const " + name + " = '" + url + "';";
}

