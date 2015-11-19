"use strict";

var retCode, retDesc;

/* GET home page. */
exports.page=function(req, res, next) {

	res.render('article', { 
		title: '博文查看' 
	});
};

