"use strict";

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	if(req.session.user){
		uName = req.session.user.username;
	}else{
		uName = '';
	}

	res.render('resource', {
		title: '资源库-人人秀',
		uName: uName,
		cssFils:['resource']
	});
};
