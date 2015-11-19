"use strict";

var retCode, retDesc;

/* GET home page. */
exports.page=function(req, res, next) {

	res.render('talentpool', { 
		title: '人才库' 
	});
};