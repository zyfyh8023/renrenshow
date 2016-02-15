"use strict";
var url = require('url');
var async = require('async');
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

exports.myState = function(req, callbackFn){
	var urls=url.parse(req.url, true).query;
	var signed=0, uName="", modules=[], objs={};

	async.series(
		[	
			function(callback) {
            	if(req.session.user){
					uName = req.session.user.username;
					signed=1;
					objs={
						signed: signed,
						uName: uName,
						modules: modules,
						vCode: '000000'
					};
				}
				callback(null, objs);
            },
            function(callback) {
            	if(urls.pubId){
					setings.findByUname(urls.pubId, function(err, results) {
						if (err) {
							callback(err, null);
						} else {
							if (results) {
								signed=3; 
								uName=urls.pubId;
								modules=results.allModels;
								objs={
									signed: signed,
									uName: uName,
									modules: modules,
									vCode: '000000'
								};
							} 
							callback(null, objs);
						}
					});
				}else{
					callback(null, objs);
				}
            },
            function(callback) {
            	if(urls.priId && urls.vCode){
					privateSetings.findByUname(urls.priId, function(err, results) {
						if (err) {
							callback(err, null);
						} else {
							if (results) {
								for(var i=0,k=results.allModels.length; i<k; i++){
									if(results.allModels[i].status=='1' && results.allModels[i].vCode==urls.vCode){
										modules=results.allModels[i].moduleCon;
										signed=2;
										uName=urls.priId;
										objs={
											signed: signed,
											uName: uName,
											modules: modules,
											vCode: urls.vCode
										};
										break;
									}
								}
							}
							callback(null, objs);
						}
					});
				}else{
					callback(null, objs);
				}
            }
        ],
        function(err2, signed2) {
            if (err2) {
                callbackFn(err2, null);
            } else {
                callbackFn(null, signed2[2]);
            }
        }
    );
	
}
