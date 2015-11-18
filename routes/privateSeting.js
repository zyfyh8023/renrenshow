"use strict";
var privateSetings = require('../models/privateSeting');

var retDesc, retCode, uName, navTitle, navDesc;

/* GET Seting page. */
exports.page=function(req, res, next) {
	//初始化列表
      uName=req.session.user.username;  
      navTitle="私人设置中心";
      navDesc="个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参"+
              "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持"+
              "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";
              
	privateSetings.findByUname(uName,function(err,results){
		if(err){
			retDesc="私人设置的数据加载失败!";
                  res.redirect('myError?retDesc='+retDesc);
		}else{
                  if(results){
                        res.render('privateSeting', { 
                              title: '私人设置',
                              uName: uName,
                              navTitle: navTitle,
                              navDesc: navDesc,
                              results: results
                        });
                  }else{
                        retDesc="没有数据，数据未初始化!";
                        res.redirect('myError?retDesc='+retDesc);
                  }
		}
	});
};

exports.doPage=function(req, res, next){
      //确定更改
      uName=req.session.user.username;  
      var setObj=JSON.parse(req.body.uNameSet);
	privateSetings.modify({author:uName},{allModels:setObj},function(err){
		if(err){
                 retDesc="保存失败,请稍后再试!";
                 return res.send({retCode:400, retDesc:retDesc});
            }else{
                 return res.send({retCode:200});
            }
	});
}

exports.createInit=function(req, res, next){
      uName=req.body.uName;
	var newSet = new privateSetings.privateSetting({
            author: uName,
            allModels: [
            {
            	modelNam:"个性简介",
            	sunModels:[
            		{
            			sunNam:"公开",
            			sunYesNo:1
            		},
            		{
            			sunNam:"不公开",
            			sunYesNo:0
            		}
            	]
            },
            {
            	modelNam:"个人简历",
            	sunModels:[
            		{
            			sunNam:"基本信息",
            			sunYesNo:1
            		},
            		{
            			sunNam:"联系方式",
            			sunYesNo:0
            		},
            		{
            			sunNam:"教育背景",
            			sunYesNo:1
            		},
            		{
            			sunNam:"实习工作",
            			sunYesNo:0
            		},
            		{
            			sunNam:"作品模块",
            			sunYesNo:1
            		},
            		{
            			sunNam:"证书荣誉",
            			sunYesNo:1
            		},
            		{
            			sunNam:"论文专利",
            			sunYesNo:0
            		},
            		{
            			sunNam:"校园社会活动",
            			sunYesNo:1
            		},
            		{
            			sunNam:"补充模块",
            			sunYesNo:0
            		}
            	]
            },
            {
            	modelNam:"资源导航",
            	sunModels:[
            		{
            			sunNam:"前端资源导航",
            			sunYesNo:1
            		},
            		{
            			sunNam:"后端资源导航",
            			sunYesNo:1
            		},
            		{
            			sunNam:"IOS资源导航",
            			sunYesNo:0
            		},
            		{
            			sunNam:"安卓资源导航",
            			sunYesNo:1
            		}
            	]
            },
            {
            	modelNam:"博文面经",
            	sunModels:[
            		{
            			sunNam:"技术博文",
            			sunYesNo:1
            		},
            		{
            			sunNam:"行业远瞻",
            			sunYesNo:0
            		},
            		{
            			sunNam:"乱七八糟",
            			sunYesNo:1
            		},
            		{
            			sunNam:"面试经验",
            			sunYesNo:0
            		}
            	]
            },
             {
            	modelNam:"公开时间",
            	sunModels:[
            		{
            			sunNam:"一天",
            			sunYesNo:0
            		},
            		{
            			sunNam:"一周",
            			sunYesNo:0
            		},
            		{
            			sunNam:"一个月",
            			sunYesNo:0
            		},
            		{
            			sunNam:"一年",
            			sunYesNo:0
            		},
            		{
            			sunNam:"永远",
            			sunYesNo:1
            		}
            	]
            }]
      });
	   
	privateSetings.create(newSet,function(err){
		if(err){
                  retDesc="保存失败,请稍后再试!";
                  return res.send({retCode:400, retDesc:retDesc});
            }else{
                  return res.send({retCode:200});
            }
	});
}