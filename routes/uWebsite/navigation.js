"use strict";
var navigations = require('../../models/navigation');
var checkState = require('../checkState');

var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

/* GET navigation page. */
exports.page = function(req, res, next) {
	navTitle = "资源导航定制";
	navDesc = "资源导航为童鞋们提供学习方向、学习途径、和业界最新消息、最新资料等。编程工具、" +
		"国外牛人、国内牛人、JS框架、UI框架、JS库、CSS库。每周更新及时。";

	checkState.myState(req, function(err, rs){
	    if(err){
	        res.redirect('/error');
	    }else{
	        if(rs.signed=='2' && rs.uName!=""){   
	            navigations.findByUname(rs.uName, function(err, results) {
	                if (err) {
	                    res.redirect('/error');
	                } else {
	                    res.render('./userNav/navigation', {
	                        uName: rs.uName,
	                        navTitle: navTitle,
	                        navDesc: navDesc,
	                        signed: rs.signed,
	                        vCode: rs.vCode,
	                        modules: rs.modules,
	                        title: 'TA的资源导航(特权)',
	                        allNavgition: results,
	                        cssFils:['userNav/navigation'],
	                        jsFils:['userNav/navigation']
	                    });
	                }
	            })
	        }else if(rs.signed=='3' && rs.uName!=""){    
	            navigations.findByUname(rs.uName, function(err, results) {
	                if (err) {
	                    res.redirect('/error');
	                } else {
	                    res.render('./userNav/navigation', {
	                        uName: rs.uName,
	                        navTitle: navTitle,
	                        navDesc: navDesc,
	                        signed: rs.signed,
	                        vCode: rs.vCode,
	                        modules: rs.modules,
	                        title: 'TA的资源导航(普通)',
	                        allNavgition: results,
	                        cssFils:['userNav/navigation'],
	                        jsFils:['userNav/navigation']
	                    });
	                }
	            })
	        }else if(rs.signed=='1' && rs.uName!=""){   
	        	navigations.findByUname(rs.uName, function(err, results) {
	        	    if (err) {
	        	        res.redirect('/error');
	        	    } else {
	        	        res.render('./userNav/navigation', {
	        	            uName: rs.uName,
	        	            navTitle: navTitle,
	        	            navDesc: navDesc,
	        	            signed: rs.signed,
	        	            vCode: rs.vCode,
	        	            title: '我的资源导航',
	        	            allNavgition: results,
	        	            cssFils:['userNav/navigation'],
	        	            jsFils:['userNav/navigation']
	        	        });
	        	    }
	        	})
	        }else{    //错误页面
	             res.redirect('/login');
	        }
	    }
	});
}

//删除大标题
exports.listDel = function(req, res, next) {
	uName = req.session.user.username;
	var _id = req.body._id;
	navigations.findByUname(uName, function(err, results) {
		if (err) {
			return res.send({retCode: 400,retDesc: '用户数据查找出现问题'});
		} else {
			if (results) {
				for (var k = 0; k < results.models.length; k++) {
					if (results.models[k]._id == _id) {
						results.models.splice(k, 1);
						navigations.modify({author: uName}, {
							models: results.models
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '用户数据更新出现问题'});
							} else {
								return res.send({retCode: 200});
							}
						});
						break;
					}
				}
			} else {
				return res.send({retCode: 400,retDesc: '未找到相关数据！'});
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
			return res.send({retCode: 400,retDesc: '用户数据查找出现问题'});
		} else {
			var newModel = {
				modelsName: modelName,
				modelsuns: [],
				maoName: Date.now()
			};
			if (results) {
				results.models.push(newModel);
				navigations.modify({author: uName}, {
					models: results.models
				}, function(err) {
					if (err) {
						return res.send({retCode: 400,retDesc: '添加失败'});
					} else {
						return res.send({retCode: 200});
					}
				});
			} else {
				var newNavigation = new navigations.Navigation({
					author: uName,
					models: []
				});
				newNavigation.models.push(newModel);
				navigations.create(newNavigation, function(err) {
					if (err) {
						return res.send({retCode: 400,retDesc: '添加失败'});
					} else {
						return res.send({retCode: 200});
					}
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
			return res.send({retCode: 400,retDesc: '用户名查找出现问题！'});
		} else {
			if (result) {
				for (var k = 0; k < result.models.length; k++) {
					if (result.models[k]._id == moduleParent) {
						var newModelSun = {
							sunName: moduleName,
							sunDesc: moduleInfo,
							sunUrl: moduleLink
						};
						result.models[k].modelsuns.push(newModelSun);
						navigations.modify({author: uName}, {
							models: result.models
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '系统出现错误，请稍后再试！'});
							} else {
								return res.send({retCode: 200});
							}
						});
						break;
					}
				}
			} else {
				return res.send({retCode: 400,retDesc: '没有找到数据！'});
			}
		}
	});
}

//删除小链接元素
exports.listDel2 = function(req, res, next) {
	uName = req.session.user.username;
	var moduleName = req.body.moduleName,
		moduleParent = req.body.moduleParent;

	navigations.findByUname(uName, function(err, results) {
		if (err) {
			return res.send({retCode: 400,retDesc: '用户数据查找出现问题'});
		} else {
			if (results) {
				for (var k = 0; k < results.models.length; k++) {
					if (results.models[k]._id == moduleParent) {
						for(var h = 0; h < results.models[k].modelsuns.length; h++){
							if(results.models[k].modelsuns[h]._id == moduleName){
								results.models[k].modelsuns.splice(h, 1);
								navigations.modify({author: uName}, {
									models: results.models
								}, function(err) {
									if (err) {
										return res.send({retCode: 400,retDesc: '用户数据更新出现问题'});
									} else {
										return res.send({retCode: 200});
									}
								});
								break;
							}
						}
						break;
					}
				}
			} else {
				return res.send({retCode: 400,retDesc: '数据未初始化'});
			}
		}
	});
}
