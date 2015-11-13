var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('allarticle', { title: '博文汇总' });
});

module.exports = router;
