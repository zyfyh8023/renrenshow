"use strict";

var crypto = require('crypto'); //crypto是Node.js 的一个核心模块，用它生成散列值来加密密码。
var users = require('../../models/users');
var checkState = require('../checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET login page. */
exports.page = function(req, res, next) {
	uName=checkState.loginState(req, res, false);

	res.render('login', {
		title: '登录-助聘网',
		uName: uName,
		cssFils:['login'],
		jsFils:['login']
	});
};

/* GET loginOut page. */
exports.loginOut = function(req, res, next) {
	req.session.user = null;
	return res.send({retCode: 200});
};

//POST login page
exports.doLogin = function(req, res, next) {
	//生成密码的散列值
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password.trim()).digest('hex'),
		username = req.body.username.trim();

	var newUser = new users.User({
		username: username,
		password: password
	});
	//检查用户是否存在
	users.findByUnameAndPwd(username, password, function(err, result) {
		if (err) {
			retDesc = '用户信息查找失败，请稍后再试！';
			return res.send({retCode: 400,retDesc: retDesc});
		} else {
			if (result) {
				req.session.user = newUser;
				return res.send({retCode: 200});
			} else {
				retDesc = '信息有误，请填写正确的信息！';
				return res.send({retCode: 400,retDesc: retDesc});
			}
		}
	});

};
