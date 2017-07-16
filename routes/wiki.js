var router = require('express').Router();
var Page = require('../models/Page');
var User = require('../models/User');

router.get('/', function(req, res, next) {
  Page.findAll()
  .then( (pages) => res.render('../views/index', {pages: pages}))
  .catch(next);
});

router.post('/', function(req, res, next) {
    User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    .then(function (values) {

      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });

      return page.save().then(function (page) {
        return page.setAuthor(user);
      });

    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('../views/addPage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then( (pageInstance) => {
    pageInstance.save()
  })
  .then(function(savedPage){
    res.redirect(savedPage.route); // route virtual FTW
  })
  .catch(next);
});

module.exports = router;
