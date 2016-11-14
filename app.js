var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var wikiRouter = require('./routes/wiki');
app.use('/wiki', wikiRouter);

var env = nunjucks.configure('views', {noCache: true});
app.use(express.static('public')); //file in with proper file

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

var models = require('./models');

// ... other stuff

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

