// config.json
// {
//     "user":     "",
//     "password": "",
//     "host":     "",
//     "path":     ""
// }

var FTPClient = require('ftp');
var config = require('./config.json');

var user = config.user;
var pass = config.password;
var host = config.host;

var ftp = new FTPClient();

// 关闭之后自动重连
ftp.on('close', function() {
    connect();
});

ftp.on('error', function() {});

connect();

function connect() {
    ftp.connect({ 
        user: user, 
        password: pass, 
        host: host, 
        keepalive: 10000000 
    });
}

function deploy(assets, callback) {
    var startTime = Date.now();
    assets.forEach(function(file) {
        ftp.put(file.source, file.remotePath, function(err) {
            var timming = Date.now() - startTime;
            if (err) {
                console.log('error ', err);
                console.log('upload fail -', file.remotePath);
            } else {
                console.log('upload success -', file.remotePath, timming + 'ms');
            }
        });
    });
}

module.exports = deploy; 








