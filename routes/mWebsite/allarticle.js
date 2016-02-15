"use strict";

var checkState = require('../checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req);

	res.render('allarticle', {
		title: '博文汇总-人人秀',
		uName: uName
	});
};
