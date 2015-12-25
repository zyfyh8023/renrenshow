"use strict";

var articles = require('../models/article');
var experiences = require('../models/experience');
var async = require('async');

var retDesc, retCode, uName, navTitle, navDesc;

/* GET createarticle page. */
exports.page=function(req, res, next) {
    uName=req.session.user.username;
    navTitle="个人设置中心";
    navDesc="个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参"+
            "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持"+
            "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

    getArtExpNum(uName, function(err, resu){
        if(err){
            retDesc="数据查找失败!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            res.render('./userBlog/createarticle', { 
                title: '新建博文', 
                uName: uName,
                navTitle: navTitle,
                allNum: resu,
                navDesc: navDesc
            });
        }
    });
};

/* POST createarticle page. */
exports.doPage=function(req, res, next) {
    uName = req.session.user.username;  
    var articleTitle = req.body.articleTitle.trim() || '',
        articleKeyword = req.body.articleKeyword.trim() || '',
        articleCont = req.body.articleCont.trim() || '',
        articleType = req.body.articleType.trim() || '',
        articleLink = req.body.articleLink.trim() || '',
        articleTag = req.body.tags || 0;

    var newArticle = new articles.Article({
        author: uName,
        articleTitle: articleTitle,
        articleKeyword: articleKeyword,
        articleCont: articleCont,
        articleType: articleType,
        articleTag: articleTag,
        articleLink: articleLink
    });

    articles.create(newArticle,function (err) {
        if(err){
                retDesc="保存失败,请稍后再试!";
                return res.send({retCode:400, retDesc:retDesc});
        }else{
            return res.send({retCode:200});
        }
    });
}

function getArtExpNum(uName, callFn) {
    async.series([
            function(callback){
                articles.allNum(uName, function (err, results) {
                    callback(err,results);
                });
            },
            function(callback){
                experiences.allNum(uName, function (err, results) {
                    callback(err,results);
                });
            }
        ],
        function(error,result) {
            if(error) {
                callFn(error, null);
            }else {
                callFn(null, result);
            }
        }
    );
}