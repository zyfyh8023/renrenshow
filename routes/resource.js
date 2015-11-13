var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('resource', { title: '资源库' });
});

module.exports = router;
