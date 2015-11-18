var express = require('express');
var router = express.Router();

var uName, retCode, retDesc;

/* GET home page. */
router.get('/', function(req, res, next) {
	uName=req.session.user.username;

	res.render('index', { 
		uName: uName,
		title: '首页' 
	});
});

module.exports = router;
