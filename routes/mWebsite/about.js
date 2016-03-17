"use strict";

var checkState = require('../checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req, res, false);

	res.render('about', {
		title: '关于我们-人人秀',
		uName: uName,
		cssFils:['about'],
		jsFils:['about']
	});
};

/* send email */
exports.doPage = function(req, res, next) {
	//拦截登录
	if(!req.session.user){
		return res.send({retCode: 401,retDesc: '需要先登录，才可以评论哦~'});
	}

	var name = req.body.name,
		email = req.body.email,
		mes = req.body.mes;

	checkState.emailSend(1, email, req.session.user.username+'对人人秀网站的使用反馈'+name, mes, '', function(err, resu){
		if(err){
			return res.send({retCode: 400,retDesc: err});
		}else{
			return res.send({retCode: 200});
		}
	})

};