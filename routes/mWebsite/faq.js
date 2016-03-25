"use strict";

var checkState = require('../checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req, res, false);

	res.render('faq', {
		title: '功能介绍-助聘网',
		uName: uName,
		cssFils:['faq']
	});
};
