var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('myindex', { title: '个人主页' });
});

module.exports = router;
