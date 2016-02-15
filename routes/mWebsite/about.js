"use strict";

var checkState = require('../checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req);

	res.render('about', {
		title: '关于我们-人人秀',
		uName: uName,
		cssFils:['about'],
		jsFils:['about']
	});
};

/* send email */
exports.doPage = function(req, res, next) {

	var name = req.body.name,
		email = req.body.email,
		mes = req.body.mes;

	checkState.emailSend(1, email, name+'对人人秀网站的使用反馈', mes, '', function(err, resu){
		if(err){
			return res.send({retCode: 400,retDesc: err});
		}else{
			return res.send({retCode: 200});
		}
	})

};