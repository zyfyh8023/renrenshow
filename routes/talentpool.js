var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('talentpool', { title: '人才库' });
});

module.exports = router;
