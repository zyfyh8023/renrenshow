"use strict";

var retDesc, retCode;
//  GET myError page. 
exports.page = function(req, res, next) {
	retDesc = req.query.retDesc;

	res.render('myError', {
		title: '错误页面',
		retDesc: retDesc
	});
}
