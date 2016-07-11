//************************************
// deploy 插件，临时这样用，有空再完成
//************************************

var path = require('path');
var deploy = require('./deploy');


function DeployPlugin(options) {
    this.options = options;
}

DeployPlugin.prototype.apply = function(compiler) {
    var options = this.options;
    compiler.plugin('emit', function(compilation, callback) {
        var files = [];
        var assets = compilation.assets;
        for (var name in assets) {
            options.map(function(cfg) {
                if (cfg.reg.test(name)) {
                    files.push({
                        localPath: name,
                        remotePath: path.extname(cfg.to) ? cfg.to : path.join(cfg.to, name),
                        source: new Buffer(assets[name].source(), 'utf-8')
                    });
                }
            });
        }

        deploy(files);

        callback();
    });
};

module.exports = DeployPlugin;




