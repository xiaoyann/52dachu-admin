var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

app.use(bodyParser.json());

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
  var articles = require('./articles');
  var pageSize = 6;
  var count = articles.length;
  var totalPages = Math.ceil(count / 6);
  var currentPage = req.query.page || 1;

  if (currentPage <= 0) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  var startIndex  = (currentPage - 1) * pageSize
  var endIndex  = startIndex + 6;
  var list = articles.slice(startIndex, endIndex);

  res.send({
    errno: 0,
    errmsg:  '',
    data: {
      count: count,
      pageSize: pageSize,
      totalPages: totalPages,
      currentPage: currentPage,
      articles: list,
    }
  });
});

// app.all('/', function(req, res) {
// });

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
































