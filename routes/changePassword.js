"use strict";

var crypto = require('crypto');
var users = require('../models/users');

var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

/* GET changePassword page. */
exports.page = function(req, res, next) {
	uName = req.session.user.username;
	navTitle = "个人设置中心";
	navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
		"与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
		"设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

	res.render('./userSet/changePassword', {
		uName: uName,
		navTitle: navTitle,
		navDesc: navDesc,
		title: '密码修改',
		cssFils:['userSet/changePassword'],
		jsFils:['userSet/changePassword']
	});
};

//POST changePassword page
exports.doPage = function(req, res, next) {
	uName = req.session.user.username;
	var oldpassword = req.body.oldpassword || '',
		newpassword = req.body.newpassword || '',
		newpassword2 = req.body.newpassword2 || '';
		
	if (oldpassword == "" || newpassword == "" || newpassword2 == "") {
		retDesc = "原始密码、新密码输入框均不能为空！";
		return res.send({
			retCode: 400,
			retDesc: retDesc
		});
	}
	if (newpassword != newpassword2) {
		retDesc = "新密码和确认密码不一致！";
		return res.send({
			retCode: 400,
			retDesc: retDesc
		});
	}
	//生成密码的散列值
	var md5 = crypto.createHash('md5');
	oldpassword = md5.update(oldpassword).digest('hex');
	users.findByUname(uName, function(err, result) {
		if (err) {
			retDesc = "数据查找失败";
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			if (result) {
				if (result.password == oldpassword) {
					var md52 = crypto.createHash('md5');
					newpassword = md52.update(newpassword).digest('hex');
					users.modify({
						"username": uName
					}, {
						$set: {
							password: newpassword
						}
					}, function(err) {
						if (err) {
							retDesc = "密码修改出现错误，请稍后再试！";
							return res.send({
								retCode: 400,
								retDesc: retDesc
							});
						} else {
							return res.send({
								retCode: 200
							});
						}
					});
				} else {
					retDesc = "原始密码输入错误";
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				}
			} else {
				retDesc = "该用户不存在！";
				return res.send({
					retCode: 400,
					retDesc: retDesc
				});
			}
		}
	});
};
