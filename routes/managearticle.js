"use strict";
var articles = require('../models/article');
var experiences = require('../models/experience');
var async = require('async');

var retCode, retDesc, uName, navTitle, navDesc;

/* GET ManageArticle page. */
exports.page = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "优秀博文积累1";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    articles.findAllByCon({
            author: uName,
            articleTag: 1
        },10,0,function(err, results, nums){
        if(err){
            retDesc = "系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc=' + retDesc);
        }else{
            if (results) {
                var showpagetip, allpage;
                allpage=Math.ceil(nums/10);
                if(allpage>9){
                    showpagetip=9;
                }else{
                    showpagetip=allpage;
                }
                 getArtExpNum(uName, function(err, resu) {
                    if (err) {
                        retDesc = "数据查找失败!";
                        res.redirect('myError?retDesc=' + retDesc);
                    } else {
                        console.log(results);
                        res.render('./userBlog/managearticle', {
                            title: '博文管理',
                            uName: uName,
                            navTitle: navTitle,
                            allNum: resu,
                            navDesc: navDesc,
                            nums: nums,
                            allArticles: results,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            articleTag:1
                        });
                    }
                });
            } else {
                retDesc = "用户的博文查找失败!";
                res.redirect('myError?retDesc=' + retDesc);
            }
        }
    });
    
};

exports.pageSearch = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=10,
        skipstep=curstep*pagenum,
        articleTag=req.body.articleTag,
        uName=req.body.uName,
        object={};
    if(articleTag == 11)
    {
        object={
            author: uName
        };
    }else{
        object={
            articleTag: articleTag,
            author: uName
        };
    }
    
    articles.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            console.log('err');
        }else{
            res.send({allArticles: results, nums: nums}); 
        }
    })
    
};

/* GET noPublicBW page. */
exports.noPublicBW = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "优秀博文积累2";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    articles.findAllByCon({
            author: uName,
            articleTag: 2
        },10,0,function(err, results, nums){
        if(err){
            retDesc = "系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc=' + retDesc);
        }else{
            if (results) {
                var showpagetip, allpage;
                allpage=Math.ceil(nums/10);
                if(allpage>9){
                    showpagetip=9;
                }else{
                    showpagetip=allpage;
                }
                 getArtExpNum(uName, function(err, resu) {
                    if (err) {
                        retDesc = "数据查找失败!";
                        res.redirect('myError?retDesc=' + retDesc);
                    } else {
                        res.render('./userBlog/managearticle', {
                            title: '博文管理',
                            uName: uName,
                            navTitle: navTitle,
                            allNum: resu,
                            navDesc: navDesc,
                            nums: nums,
                            allArticles: results,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            articleTag:2
                        });
                    }
                });
            } else {
                retDesc = "用户的博文查找失败!";
                res.redirect('myError?retDesc=' + retDesc);
            }
        }
    });
    
};

/* GET relatedMeBW page. */
exports.relatedMeBW = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "优秀博文积累3";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    articles.findAllByCon({
            author: uName
        },10,0,function(err, results, nums){
        if(err){
            retDesc = "系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc=' + retDesc);
        }else{
            if (results) {
                var showpagetip, allpage;
                allpage=Math.ceil(nums/10);
                if(allpage>9){
                    showpagetip=9;
                }else{
                    showpagetip=allpage;
                }
                 getArtExpNum(uName, function(err, resu) {
                    if (err) {
                        retDesc = "数据查找失败!";
                        res.redirect('myError?retDesc=' + retDesc);
                    } else {
                        res.render('./userBlog/managearticle', {
                            title: '博文管理',
                            uName: uName,
                            navTitle: navTitle,
                            allNum: resu,
                            navDesc: navDesc,
                            nums: nums,
                            allArticles: results,
                            showpagetip: showpagetip, 
                            allpage: allpage
                        });
                    }
                });
            } else {
                retDesc = "用户的博文查找失败!";
                res.redirect('myError?retDesc=' + retDesc);
            }
        }
    });
    
};

function getArtExpNum(uName, callFn) {
    async.series([
            function(callback) {
                articles.allNum(uName, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                experiences.allNum(uName, function(err, results) {
                    callback(err, results);
                });
            }
        ],
        function(error, result) {
            if (error) {
                callFn(error, null);
            } else {
                callFn(null, result);
            }
        }
    );
}
