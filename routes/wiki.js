var express = require('express');
var Router = express.Router();
var models = require("../models/");
module.exports = Router;

let Page = models.Page;
let User = models.User;

Router.get('/', function(req, res, next) {
    Page.findAll()
    .then(function(foundPages){
        res.render('index', {
            pages:foundPages
        });
    })
    .catch(next);
});

Router.post('/', function(req, res, next) {

    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
    });


    User.findOrCreate({where: {email: req.body.email, name: req.body.name}}).spread(function(user, boolean) {
        
    }); // [user, boolean]

    // .then((userArr) => {
    //     let user = userArr[0];
    // });
    //
    // .spread((user, wasCreated) => {
    //     res.send(user);
    // })


    page.save().then(function(savedPage){
        res.redirect(savedPage.route); // route virtual FTW
    }).catch(next);
});

Router.get('/add', function(req, res, next) {
    res.render('addpage')
});

Router.get("/:urlTitle", function(req, res, next) {

    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(function(foundPage){
        res.render('wikipage', {
            title: foundPage.title,
            content: foundPage.content
        });
    })
    .catch(next);


});
