"use strict";

var retCode, retDesc, uName;

/* GET home page. */
exports.page = function(req, res, next) {

	if(req.session.user){
		uName = req.session.user.username;
	}else{
		uName = '';
	}

	res.render('talentpool', {
		title: '人才库-人人秀',
		uName: uName
	});
};
