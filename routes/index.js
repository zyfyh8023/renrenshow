var express = require('express');
var router = express.Router();

var retCode, retDesc;

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('index', {
		title: '首页-人人秀'
	});
});

module.exports = router;
