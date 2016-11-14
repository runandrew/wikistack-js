var express = require('express');

var Router = express.Router();

module.exports = Router;


Router.get('/', function(req, res, next) {
  res.redirect('/');
});

Router.post('/', function(req, res, next) {
  res.send('got to POST /wiki/');
});

Router.get('/add', function(req, res, next) {
  res.render('addpage')
});

