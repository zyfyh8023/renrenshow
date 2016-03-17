"use strict";

var checkState = require('../checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req, res, false);

	res.render('index', {
		title: '首页-人人秀',
		uName: uName,
		cssFils:['index'],
		jsFils:['index']
	});
};