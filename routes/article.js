"use strict";

var uName, retCode, retDesc;

/* GET home page. */
exports.page=function(req, res, next) {
	uName=req.session.user.username;

	res.render('article', { 
		uName: uName,
		title: '博文查看' 
	});
});

