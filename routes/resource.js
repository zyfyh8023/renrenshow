"use strict";

var retCode, retDesc;

/* GET home page. */
exports.page = function(req, res, next) {

	res.render('resource', {
		title: '资源库-人人秀'
	});
};
