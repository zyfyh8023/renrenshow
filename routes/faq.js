var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('faq', { title: '功能介绍' });
});

module.exports = router;
