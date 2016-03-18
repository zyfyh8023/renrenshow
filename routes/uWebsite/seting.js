"use strict";
var setings = require('../../models/setting');

var uName, retCode, retDesc, navTitle, navDesc, cssFils, jsFils;

/* GET Seting page. */
exports.page = function(req, res, next) {
	//初始化列表
	uName = req.session.user.username;
	navTitle = "个人设置中心";
	navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
		"与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
		"设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

	setings.findByUname(uName, function(err, results) {
		if (err) {
			res.redirect('/error');
		} else {
			res.render('./userSet/seting', {
				navTitle: navTitle,
				navDesc: navDesc,
				uName: uName,
				signed: '1',
				vCode: '',
				modules: [],
				title: '个人设置',
				results: results,
				cssFils:['userSet/seting'],
				jsFils:['userSet/seting']
			});
		}
	});
};

exports.doPage = function(req, res, next) {
	//确定更改
	uName = req.session.user.username;
	var setObj = JSON.parse(req.body.uNameSet);
	setObj[3]['sunModels'][0]['sunYesNo']='2';   //避免违规的修改
	setObj[3]['sunModels'][1]['sunYesNo']='2';	 //避免违规的修改
	setings.modify({author: uName}, {
		allModels: setObj
	}, function(err) {
		if (err) {
			return res.send({retCode: 400,retDesc: '保存失败,请稍后再试!'});
		} else {
			return res.send({retCode: 200});
		}
	});
}

exports.createInit = function(uNames,callback) {
	var newSet = new setings.Setting({
		author: uNames,
		allModels: [{
			modelNam: "个性简介",
			sunModels: [{
				sunNam: "公开",
				sunYesNo: 1
			}, {
				sunNam: "不公开",
				sunYesNo: 0
			}]
		}, {
			modelNam: "个人简历",
			sunModels: [{
				sunNam: "基本信息",
				sunYesNo: 0
			}, {
				sunNam: "联系方式",
				sunYesNo: 0
			}, {
				sunNam: "教育经历",
				sunYesNo: 1
			}, {
				sunNam: "实习经历",
				sunYesNo: 1
			}, {
				sunNam: "工作经历",
				sunYesNo: 1
			}, {
				sunNam: "荣誉奖励",
				sunYesNo: 1
			}, {
				sunNam: "个人作品",
				sunYesNo: 1
			}, {
				sunNam: "项目经历",
				sunYesNo: 1
			}, {
				sunNam: "实践经历",
				sunYesNo: 1
			}, {
				sunNam: "论文专利",
				sunYesNo: 1
			}, {
				sunNam: "核心技能",
				sunYesNo: 1
			}]
		}, {
			modelNam: "资源导航",
			sunModels: [{
				sunNam: "公开",
				sunYesNo: 1
			}, {
				sunNam: "不公开",
				sunYesNo: 0
			}]
		}, {
			modelNam: "博文面经",
			sunModels: [{
				sunNam: "技术博文",
				sunYesNo: 2
			}, {
				sunNam: "行业远瞻",
				sunYesNo: 2
			}, {
				sunNam: "生活日志",
				sunYesNo: 0
			}, {
				sunNam: "面试经验",
				sunYesNo: 1
			}, {
				sunNam: "随便写写",
				sunYesNo: 1
			}]
		}]
	});

	setings.create(newSet, function(err) {
		if (err) {
			callback(0);
		} else {
			callback(1);
		}
	});
}
