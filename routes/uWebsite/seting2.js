"use strict";
var setings = require('../../models/setting');
var checkState = require('../checkState');

var uName, retCode, retDesc, navTitle, navDesc, cssFils, jsFils;

/* GET Seting page. */
exports.page = function(req, res, next) {
	//初始化列表
	navTitle = "个人设置中心";
	navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
		"与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
		"设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

	checkState.myState(req, res, function(rs) {
	    if (rs.signed == '1') {
	    	res.redirect('/error');
	    }else if(rs.signed == '2'){
	    	setings.findByUname(rs.uName, function(err, results) {
	    		if (err) {
	    			res.redirect('/error');
	    		} else {
	    			res.render('./userSet2/seting', {
	    				navTitle: navTitle,
	    				navDesc: navDesc,
	    				uName: rs.uName,
	    				signed: rs.signed,
	    				vCode: rs.vCode,
	    				modules: rs.modules,
	    				title: 'TA的个人设置(特权)',
	    				results: results,
	    				cssFils:['userSet/seting']
	    			});
	    		}
	    	});
	    }else{
	    	setings.findByUname(rs.uName, function(err, results) {
	    		if (err) {
	    			res.redirect('/error');
	    		} else {
	    			res.render('./userSet2/seting', {
	    				navTitle: navTitle,
	    				navDesc: navDesc,
	    				uName: rs.uName,
	    				signed: rs.signed,
	    				vCode: rs.vCode,
	    				modules: rs.modules,
	    				title: 'TA的个人设置(普通)',
	    				results: results,
	    				cssFils:['userSet/seting']
	    			});
	    		}
	    	});
	    }
	});

};


/* GET Seting page. */
exports.apply = function(req, res, next) {
	//初始化列表
	navTitle = "特权申请";
	navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
		"与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
		"设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

	checkState.myState(req, res, function(rs) {
	    if (rs.signed == '1') {
	    	res.redirect('/error');
	    }else if(rs.signed == '2'){
			res.render('./userSet2/setApply', {
				navTitle: navTitle,
				navDesc: navDesc,
				uName: rs.uName,
				signed: rs.signed,
				vCode: rs.vCode,
				modules: rs.modules,
				title: '个人设置',
				cssFils:['userSet/seting'],
				jsFils:['userSet/setApply']
			});
	    }else{
	    	res.render('./userSet2/setApply', {
	    		navTitle: navTitle,
	    		navDesc: navDesc,
	    		uName: rs.uName,
	    		signed: rs.signed,
	    		vCode: rs.vCode,
	    		modules: rs.modules,
	    		title: '个人设置',
	    		cssFils:['userSet/seting'],
	    		jsFils:['userSet2/setApply']
	    	});
	    }
	});

};


/* send email */
exports.doApply = function(req, res, next) {
	//拦截登录
	if(!req.session.user){
		return res.send({retCode: 401,retDesc: '需要先登录，才可以评论哦~'});
	}

	var applyemail = req.body.applyemail,
		applyname = req.body.applyname,
		applylink = req.body.applylink,
		uName = req.body.uName,
		applymes = req.body.applymes;

	var temp='名称：'+applyname+
			'；联系邮箱：'+applyemail+
			'；联系方式：'+applylink+
			'；网站账号：'+req.session.user.username+
			'；申请理由：'+applymes;

	checkState.emailSend(1, uName, applyname+'向您申请访问人人秀网站的特权', temp, '', function(err, resu){
		if(err){
			return res.send({retCode: 400,retDesc: err});
		}else{
			return res.send({retCode: 200});
		}
	})

};