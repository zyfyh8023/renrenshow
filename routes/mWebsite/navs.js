"use strict";

var checkState = require('../checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req, res, false);

	res.render('navs', {
		title: '导航-人人秀',
		uName: uName,
		cssFils:['navs']
	});
};
