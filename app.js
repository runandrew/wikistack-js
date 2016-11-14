var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var wikiRouter = require('./routes/wiki');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var env = nunjucks.configure('views', {noCache: true});
app.use(express.static('public'));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);


app.use('/wiki', wikiRouter);

 //file in with proper file

app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send(err);
})

var models = require('./models');

// ... other stuff

models.User.sync({})
.then(function () {
    return models.Page.sync({force: true })
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
