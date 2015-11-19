"use strict";

var retCode, retDesc;

/* GET home page. */
exports.page=function(req, res, next) {

	res.render('allarticle', { 
		title: '博文汇总' 
	});
};

