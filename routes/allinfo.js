"use strict";

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	if(req.session.user){
		uName = req.session.user.username;
	}else{
		uName = '';
	}

	res.render('allinfo', {
		title: '信息汇总',
		uName: uName
	});
};