"use strict";
var privateSetings = require('../models/privateSeting');

var retDesc, retCode, uName, navTitle, navDesc;

/* GET Seting page. */
exports.page = function(req, res, next) {
	//初始化列表
	uName = req.session.user.username;
	navTitle = "私人设置中心";
	navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
		"与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
		"设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

	privateSetings.findByUname(uName, function(err, results) {
		if (err) {
			res.redirect('/error');
		} else {
			res.render('./userSet/privateSeting', {
				title: '私人设置',
				uName: uName,
				navTitle: navTitle,
				navDesc: navDesc,
				results: results
			});
		}
	});
};

exports.doPage = function(req, res, next) {
	//确定更改
	uName = req.session.user.username;
	var setObj = JSON.parse(req.body.uNameSet),
		setName = req.body.setName;
	privateSetings.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息查找失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var setpri={
				moduleDesc:setName,
				moduleCon:setObj,
				vCode: Date.now()
			};
			rs.allModels.push(setpri);
			privateSetings.modify({
				author: uName
			}, {
				allModels: rs.allModels
			}, function(err) {
				if (err) {
					retDesc = "保存失败,请稍后再试!";
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
		}
	});
};

exports.del = function(req, res, next) {
	uName = req.session.user.username;
	var ids = req.body.ids;

	privateSetings.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息查找失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			rs.allModels.splice(ids,1);
			privateSetings.modify({
				author: uName
			}, {
				allModels: rs.allModels
			}, function(err) {
				if (err) {
					retDesc = "保存失败,请稍后再试!";
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
		}
	});
};

exports.see = function(req, res, next) {
	uName = req.session.user.username;
	var ids = req.body.ids;

	privateSetings.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息查找失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			return res.send({
				retCode: 200,
				retData:rs.allModels[ids]
			});
		}
	});
};

exports.upd = function(req, res, next) {
	uName = req.session.user.username;
	var ids = req.body.ids;
	var setObj = JSON.parse(req.body.uNameSet);

	privateSetings.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息查找失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			rs.allModels[ids].moduleCon=setObj;
			privateSetings.modify({
				author: uName
			}, {
				allModels: rs.allModels
			}, function(err) {
				if (err) {
					retDesc = "保存失败,请稍后再试!";
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
		}
	});
};

exports.chg = function(req, res, next) {
	uName = req.session.user.username;
	var ids = req.body.ids;

	privateSetings.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息查找失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			if(rs.allModels[ids].status=='1'){
				rs.allModels[ids].status='0';
			}else{
				rs.allModels[ids].status='1';
			}
			privateSetings.modify({
				author: uName
			}, {
				allModels: rs.allModels
			}, function(err) {
				if (err) {
					retDesc = "保存失败,请稍后再试!";
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
		}
	});
};

exports.createInit = function(uNames,callback) {
	var newSet = new privateSetings.privateSetting({
		author: uNames,
	});

	privateSetings.create(newSet, function(err) {
		if (err) {
			callback(0);
		} else {
			callback(1);
		}
	});
}
