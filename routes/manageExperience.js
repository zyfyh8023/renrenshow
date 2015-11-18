"use strict";
var experiences = require('../models/experience');

var retCode, retDesc, uName, navTitle, navDesc;

/* GET ManageArticle page. */
exports.page=function(req, res, next) {
    uName=req.session.user.username;
    navTitle="面经管理中心";
    navDesc="个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参"+
            "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持"+
            "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

  	experiences.findAll({author:uName,experienceTag:1}, function (err, results) {
        if (err) {
            retDesc="系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            if(results){
                res.render('manageExperience', { 
                    title: '面经管理', 
                    uName: uName,
                    navTitle: navTitle,
                    navDesc: navDesc,
                    allArticles: results
                });
            }else{
                retDesc="用户的面经查找失败!";
                res.redirect('myError?retDesc='+retDesc);
            }
        }
  	});
};

/* GET ManageArticle page. */
exports.noPublicMJ=function(req, res, next) {
    uName=req.session.user.username;
    navTitle="未发表面经";
    navDesc="个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参"+
            "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持"+
            "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

    experiences.findAll({author:uName,experienceTag:2}, function (err, results) {
        if (err) {
            retDesc="系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            if(results){
                res.render('manageExperience', { 
                    title: '面经管理', 
                    uName: uName,
                    navTitle: navTitle,
                    navDesc: navDesc,
                    allArticles: results
                });
            }else{
                retDesc="用户的面经查找失败!";
                res.redirect('myError?retDesc='+retDesc); 
            }
        }
    });
};

/* GET ManageArticle page. */
exports.relatedMeMJ=function(req, res, next) {
    uName=req.session.user.username;
    navTitle="与我相关面经";
    navDesc="个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参"+
            "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持"+
            "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

    experiences.findAll({author:uName}, function (err, results) {
        if (err) {
            retDesc="系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            if(results){
                res.render('manageExperience', { 
                    title: '面经管理', 
                    uName: uName,
                    navTitle: navTitle,
                    navDesc: navDesc,
                    allArticles: results
                });
            }else{
                retDesc="用户的面经查找失败!";
                res.redirect('myError?retDesc='+retDesc);
            }
        }
    });
};