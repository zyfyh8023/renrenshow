"use strict";
var url = require('url');
var async = require('async');
var users = require('../models/users');
var nodemailer = require("nodemailer");
var setings = require('../models/setting');
var privateSetings = require('../models/privateSeting');

exports.checkLogin = function(req, res, next) {
	if (!req.session.user) {
		return res.redirect('/login');
	}
	next();
}

exports.checkNotLogin = function(req, res, next) {
	if (req.session.user) {
		return res.redirect('/myindex');
	}
	next();
}

exports.loginState = function(req){
	var uName='';
	if(req.session.user){
		uName = req.session.user.username;
	}
	return uName;
}

exports.emailSend = function(typ, toEmails, emailSub, emailTxt, emailHtml, callback){
	// 开启一个 SMTP 连接池
	var smtpTransport = nodemailer.createTransport("SMTP",{
	  	host: "smtp.163.com", // 主机
	  	secureConnection: true, // 使用 SSL
	  	port: 465, // SMTP 端口
	  	auth: {
	    	user: "zyfyh8023@163.com", 
	    	pass: "8023zyfyh" 
	  	}
	});

	if(typ==1){
		// 设置邮件内容
		var mailOptions = {
		  	from: "人人秀网站<zyfyh8023@163.com>", // 发件地址
		  	to: toEmails, // 收件列表 "646039894@qq.com, zyfyh8023@163.com"
		  	subject: emailSub, // 标题 "邮件主题"
		  	text: emailTxt, // plaintext body  'Hello world'
		}
	}else{
		// 设置邮件内容
		var mailOptions = {
		  	from: "人人秀网站<zyfyh8023@163.com>", // 发件地址
		  	to: toEmails, // 收件列表 "646039894@qq.com, zyfyh8023@163.com"
		  	subject: emailSub, // 标题 "邮件主题"
		  	html: emailHtml // html 内容  "<a href='https://www.lmlc.com'><img src='https://www.lmlc.com/cdn/product/1454306939811.jpg'></a>"
		}
	}

	// 发送邮件
	smtpTransport.sendMail(mailOptions, function(error, response){
	  	if(error){
		    callback(error, null);
	  	}else{
	  		smtpTransport.close(); // 如果没用，关闭连接池
  		  	callback(null, response);
	  	}
	});
}

exports.myState = function(req, res, callbackFn){
	var urls=url.parse(req.url, true).query;
	var objs={};
	
	//首先判断是否登录
	if(req.session.user){
		objs={
			signed: 1,
			uName: req.session.user.username,
			modules: [],
			vCode: ''
		};
		callbackFn(objs);
	}else{  //没有登陆的情况
		if(req.params.uid){
			//检查用户名是否已经存在 
			users.findByUname(req.params.uid, function(err, result) {
			    if(err){
			    	res.redirect('/error');
			    }else{
			    	if(result){

			    		if(urls.vCode){
			    			privateSetings.findByUname(req.params.uid, function(err, results) {
			    				if (err) {
			    					res.redirect('/error');
			    				} else {
			    					if (results) {
			    						var sifn=0;
			    						for(var i=0,k=results.allModels.length; i<k; i++){
			    							if(results.allModels[i].status=='1' && results.allModels[i].vCode==urls.vCode){
			    								objs={
			    									signed: 2,
			    									uName: req.params.uid,
			    									modules: results.allModels[i].moduleCon,
			    									vCode: urls.vCode
			    								};
			    								sifn=1;
			    								break;
			    							}
			    						}
			    						if(sifn){
			    							callbackFn(objs);
			    						}else{ //用户输入的vCode过时，或者不正确的情况
			    							setings.findByUname(req.params.uid, function(err, results) {
			    								if(err){
			    									res.redirect('/error');
			    								}else{
		    										objs={
		    											signed: 3,
		    											uName: req.params.uid,
		    											modules: results.allModels,
		    											vCode:''
		    										};
		    										callbackFn(objs);
			    								}
			    							})
			    						}
			    					}else{ //存在vCode但是联合查找失败的情况，继续找单个条件的用户名
			    						setings.findByUname(req.params.uid, function(err, results) {
			    							if(err){
			    								res.redirect('/error');
			    							}else{
		    									objs={
		    										signed: 3,
		    										uName: req.params.uid,
		    										modules: results.allModels,
		    										vCode:''
		    									};
		    									callbackFn(objs);
			    							}
			    						})
			    					}
			    				}
			    			});
			    		}else{ //vCode不存在的情况
			    			setings.findByUname(req.params.uid, function(err, results) {
			    				if(err){
			    					res.redirect('/error');
			    				}else{ //seting表格是默认添加的，既然用户名已经存在了，所以seting查找必然可以找到
		    						objs={
		    							signed: 3,
		    							uName: req.params.uid,
		    							modules: results.allModels,
		    							vCode:''
		    						};
		    						callbackFn(objs);
			    				}
			    			})
			    		}
			    	}else{ //输入的用户名不存在的情况，跳转到首页或者登录页面
			    		res.redirect('/login');	
			    	}
			    }
			})
		}else{ //没有输入用户名的情况，跳转首页或者登录页面
			res.redirect('/login');
		}
	}
	
}
