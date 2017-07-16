var router = require('express').Router();
var Page = require('../models/Page');

router.get('/', function(req, res, next) {
  Page.findAll()
  .then( (pages) => res.render('../views/index', {pages: pages}))
  .catch(next);
});

router.post('/', function(req, res, next) {
  res.json(req.body);
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
