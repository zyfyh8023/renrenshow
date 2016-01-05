"use strict";

var retCode, retDesc;

/* GET home page. */
exports.page = function(req, res, next) {

	res.render('faq', {
		title: '功能介绍-人人秀'
	});
};
