var express = require('express');
var app     = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.post('/admin/article', function(req, res) {
    res.send({});
});

app.delete('/admin/article', function(req, res) {
    res.send({});
});

app.put('/admin/article', function(req, res) {
    res.send({});
});

app.get('/admin/article', function(req, res) {
    res.send({});
});

// app.all('/', function(req, res) {
// });

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
































