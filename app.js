var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var express = require('express');
var router = express.Router();
var app = express();
var models = require('./models');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

express.static('public');

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);


models.User.sync({})
.then( () => models.Page.sync({}))
.then( () => {
  app.listen(3000, () => {
    console.log("Server listening at port 3000");
  })
})
.catch(console.error);
