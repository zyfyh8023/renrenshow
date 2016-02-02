"use strict";
var nodemailer = require("nodemailer");

var retCode, retDesc, uName;

/* GET home page. */
exports.doPage = function(req, res, next) {

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

	// 设置邮件内容
	var mailOptions = {
	  	from: "人人秀网站<zyfyh8023@163.com>", // 发件地址
	  	to: "646039894@qq.com, zyfyh8023@163.com", // 收件列表
	  	subject: "邮件主题", // 标题
	  	// text: 'Hello world 🐴', // plaintext body
	  	html: "<a href='https://www.lmlc.com'><img src='https://www.lmlc.com/cdn/product/1454306939811.jpg'></a>" // html 内容
	}

	// 发送邮件
	smtpTransport.sendMail(mailOptions, function(error, response){
	  	if(error){
		    console.log(error);
	  	}else{
	  		smtpTransport.close(); // 如果没用，关闭连接池
  		  	res.render('demo7', {
  			  	title: 'demo7',
  			  	uName: ''
  		  	});
	  	}
	});

};
