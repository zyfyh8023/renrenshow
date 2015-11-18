"use strict";

var uName, retCode, retDesc;

/* GET home page. */
exports.page=function(req, res, next) {
	uName=req.session.user.username;

	res.render('resource', { 
		uName: uName,
		title: '资源库' 
	});
});

