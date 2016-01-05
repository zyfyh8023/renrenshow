"use strict";

var uName, retCode, retDesc;

/* GET home page. */
exports.page = function(req, res, next) {
	uName = req.session.user.username;

	res.render('./userIndex/myindex', {
		uName: uName,
		title: '我的网站首页'
	});
};
