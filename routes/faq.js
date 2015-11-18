"use strict";

var uName, retCode, retDesc;

/* GET home page. */
exports.page=function(req, res, next) {
	uName=req.session.user.username;

	res.render('faq', { 
		uName: uName,
		title: '功能介绍' 
	});
});


