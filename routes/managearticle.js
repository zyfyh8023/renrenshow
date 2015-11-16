"use strict";
var articles = require('../models/article');

var retCode, retDesc, uName, navTitle, navDesc;

/* GET ManageArticle page. */
exports.page=function(req, res, next) {
    uName=req.session.user.username;
    navTitle="优秀博文积累";
    navDesc="可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上"+
            "这是博客最初的最基本的功能，就是发表个人网络日志。";
  	articles.findAll({author:uName,articleTag:1}, function (err, results) {
        if (err) {
            retDesc="系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            if(results){
                res.render('managearticle', { 
                    title: '博文管理', 
                    navTitle: navTitle,
                    navDesc: navDesc,
                    allArticles: results});
            }else{
                retDesc="用户的博文查找失败!";
                res.redirect('myError?retDesc='+retDesc);
            }
        }
  	});
};

/* GET noPublicBW page. */
exports.noPublicBW=function(req, res, next) {
    uName=req.session.user.username;
    articles.findAll({author:uName,articleTag:2}, function (err, results) {
        if (err) {
            retDesc="系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            if(results){
                res.render('managearticle', { title: '博文管理', allArticles: results});
            }else{
                retDesc="用户的博文查找失败!";
                res.redirect('myError?retDesc='+retDesc);
            }
        }
    });
};

/* GET relatedMeBW page. */
exports.relatedMeBW=function(req, res, next) {
    uName=req.session.user.username;
    articles.findAll({author:uName}, function (err, results) {
        if (err) {
            retDesc="系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            if(results){
                res.render('managearticle', { title: '博文管理', allArticles: results});
            }else{
                retDesc="用户的博文查找失败!";
                res.redirect('myError?retDesc='+retDesc);
            }
        }
    });
};
