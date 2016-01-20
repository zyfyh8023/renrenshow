"use strict";
var navigations = require('../models/navigation');

var retCode, retDesc, uName, navTitle, navDesc;

/* GET navigation page. */
exports.page = function(req, res, next) {
	uName = req.session.user.username;
	
	navTitle = "私人资源导航定制";
	navDesc = "资源导航为童鞋们提供学习方向、学习途径、和业界最新消息、最新资料等。编程工具、" +
		"国外牛人、国内牛人、JS框架、UI框架、JS库、CSS库。每周更新及时。";

	navigations.findByUname(uName, function(err, results) {
		if (err) {
			res.redirect('/error');
		} else {
			if (results) {
				for (var k = 0; k < results.models.length; k++) {
					for (var s = 0; s < results.models[k].modelsuns.length; s++) {
						results.models[k].modelsuns.sort(getSortFun('asc', 'sunSque'));
					}
					results.models.sort(getSortFun('asc', 'sque'));
				}
				res.render('./userNav/navigation', {
					title: '资源导航',
					uName: uName,
					navTitle: navTitle,
					navDesc: navDesc,
					allNavgition: results
				});
			} else {
				res.redirect('/error');
			}
		}
	});
}

function getSortFun(order, sortBy) {
	var ordAlpah = (order == 'asc') ? '>' : '<';
	var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
	return sortFun;
}

//删除大标题
exports.listDel = function(req, res, next) {
	uName = req.session.user.username;
	var modelName = req.body.navName;
	navigations.findByUname(uName, function(err, results) {
		if (err) {
			retDesc = '用户数据查找出现问题';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			if (results) {
				for (var k = 0; k < results.models.length; k++) {
					if (results.models[k].modelsName == modelName) {
						results.models.splice(k, 1);
						navigations.modify({
							author: uName
						}, {
							models: results.models
						}, function(err) {
							if (err) {
								retDesc = '用户数据更新出现问题';
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
				}
			} else {
				retDesc = '数据未初始化';
				return res.send({
					retCode: 400,
					retDesc: retDesc
				});
			}
		}
	});
}

//添加大标题
exports.listAdd = function(req, res, next) {
	uName = req.session.user.username;
	var modelName = req.body.navName;
	navigations.findByUname(uName, function(err, results) {
		if (err) {
			retDesc = '用户数据查找出现问题';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			if (results) {
				for (var k = 0; k < results.models.length; k++) {
					if (results.models[k].modelsName == modelName) {
						retDesc = '已存在该分类';
						return res.send({
							retCode: 400,
							retDesc: retDesc
						});
					}
				}
				var newModel = {
					modelsName: modelName,
					sque: k + 1,
					modelsuns: [],
					maoName: Date.now()
				};
				results.models.push(newModel);
				navigations.modify({
					author: uName
				}, {
					models: results.models
				}, function(err) {
					if (err) {
						retDesc = '添加失败';
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
				retDesc = '数据未初始化';
				return res.send({
					retCode: 400,
					retDesc: retDesc
				});
			}
		}
	});
}

//添加小链接元素
exports.listAdd2 = function(req, res, next) {
	uName = req.session.user.username;
	var moduleName = req.body.moduleName,
		moduleInfo = req.body.moduleInfo,
		moduleLink = req.body.moduleLink,
		moduleParent = req.body.moduleParent;

	navigations.findByUname(uName, function(err, result) {
		if (err) {
			retDesc = '用户名查找出现问题！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			if (result) {
				for (var k = 0; k < result.models.length; k++) {
					if (result.models[k].modelsName == moduleParent) {
						var newSunSque = result.models[k].modelsuns.length + 1;
						var newModelSun = {
							sunName: moduleName,
							sunDesc: moduleInfo,
							sunSque: newSunSque,
							sunUrl: moduleLink
						};
						result.models[k].modelsuns.push(newModelSun);
						navigations.modify({
							author: uName
						}, {
							models: result.models
						}, function(err) {
							if (err) {
								retDesc = '系统出现错误，请稍后再试！';
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
				}
			} else {
				retDesc = '没有找到数据！';
				return res.send({
					retCode: 400,
					retDesc: retDesc
				});
			}
		}
	});
}

//删除小标题
exports.listDel2 = function(req, res, next) {
	uName = req.session.user.username;
	var moduleName = req.body.moduleName,
		moduleParent = req.body.moduleParent;

	navigations.findByUname(uName, function(err, results) {
		if (err) {
			retDesc = '用户数据查找出现问题';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			if (results) {
				for (var k = 0; k < results.models.length; k++) {
					if (results.models[k].modelsName == moduleParent) {

						for(var h = 0; h < results.models[k].modelsuns.length; h++){
							if(results.models[k].modelsuns[h].sunName == moduleName){
								results.models[k].modelsuns.splice(h, 1);
								navigations.modify({
									author: uName
								}, {
									models: results.models
								}, function(err) {
									if (err) {
										retDesc = '用户数据更新出现问题';
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
						}

					}
				}
			} else {
				retDesc = '数据未初始化';
				return res.send({
					retCode: 400,
					retDesc: retDesc
				});
			}
		}
	});
}

exports.listInit = function(uNames,callback) {
	var newNavigation = new navigations.Navigation({
		author: uNames,
	});
	navigations.create(newNavigation, function(err) {
		if (err) {
			callback(0);
		} else {
			callback(1);
		}
	});
}
