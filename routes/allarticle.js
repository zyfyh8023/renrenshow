"use strict";

var uName, retCode, retDesc;

/* GET home page. */
exports.page=function(req, res, next) {
	uName=req.session.user.username;

	res.render('allarticle', { 
		uName: uName,
		title: '博文汇总' 
	});
});

