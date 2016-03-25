"use strict";

var checkState = require('../checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page1 = function(req, res, next) {
	uName=checkState.loginState(req, res, false);

	res.render('navs_1', {
		title: '前端开发-助聘网',
		uName: uName,
		cssFils:['navs']
	});
};

/* GET home page. */
exports.page2 = function(req, res, next) {
	uName=checkState.loginState(req, res, false);

	res.render('navs_2', {
		title: '后端开发-助聘网',
		uName: uName,
		cssFils:['navs']
	});
};

/* GET home page. */
exports.page3 = function(req, res, next) {
	uName=checkState.loginState(req, res, false);

	res.render('navs_3', {
		title: '客户端-助聘网',
		uName: uName,
		cssFils:['navs']
	});
};

/* GET home page. */
exports.page4 = function(req, res, next) {
	uName=checkState.loginState(req, res, false);

	res.render('navs_4', {
		title: '数据库-助聘网',
		uName: uName,
		cssFils:['navs']
	});
};

/* GET home page. */
exports.page5 = function(req, res, next) {
	uName=checkState.loginState(req, res, false);

	res.render('navs_5', {
		title: '软件测试-助聘网',
		uName: uName,
		cssFils:['navs']
	});
};

/* GET home page. */
exports.page6 = function(req, res, next) {
	uName=checkState.loginState(req, res, false);

	res.render('navs_6', {
		title: '产品运营-助聘网',
		uName: uName,
		cssFils:['navs']
	});
};

/* GET home page. */
exports.page7 = function(req, res, next) {
	uName=checkState.loginState(req, res, false);

	res.render('navs_7', {
		title: 'UI设计-助聘网',
		uName: uName,
		cssFils:['navs']
	});
};