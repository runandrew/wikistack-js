var express = require('express');
var Router = express.Router();
var models = require("../models/");
module.exports = Router;

let Page = models.Page;
let User = models.User;

Router.get('/', function(req, res, next) {
  res.redirect('/');
});

Router.post('/', function(req, res, next) {

    var page = Page.build({
      title: req.body.title,
    //   urlTitle: ,
      content: req.body.content,
      status: req.body.status
    });



    page.save()
    .then(function(page, options) {
        res.json(page);
    })
    .catch(next);
});

Router.get('/add', function(req, res, next) {
  res.render('addpage')
});

Router.get("/:urlTitle", function(req, res, next) {
    res.send('hit dynamic route at ' + req.params.urlTitle);
});
