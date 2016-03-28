"use strict";
var articles = require('../../models/article');
var experiences = require('../../models/experience');
var comment = require('../../models/comment');
var async = require('async');

var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

var PAGE_NUM=10;
var PAGE_NUM_JIAN1=9;
/* GET ManageArticle page. */
exports.page = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "已发表博文";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    articles.findAllByCon({author: uName,articleTag: 1},PAGE_NUM,0,function(err, results, nums){
        if(err){
            res.redirect('/error');
        }else{
            var showpagetip, allpage;
            allpage=Math.ceil(nums/PAGE_NUM);
            if(allpage>PAGE_NUM_JIAN1){
                showpagetip=PAGE_NUM_JIAN1;
            }else{
                showpagetip=allpage;
            }
             getArtExpNum(uName, function(err, resu) {
                if (err) {
                    res.redirect('/error');
                } else {
                    // console.log(results);
                    res.render('./userBlog/managearticle', {
                        navTitle: navTitle,
                        navDesc: navDesc,
                        uName: uName,
                        signed: '1',
                        vCode: '',
                        modules: [],
                        title: '已发表博文',
                        allNum: resu,
                        nums: nums,
                        allArticles: results,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        articleTag:1,
                        cssFils:['userBlog/managearticle'],
                        jsFils:['userBlog/managearticle']
                    });
                }
            });
        }
    });
    
};

exports.pageSearch = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=PAGE_NUM,
        skipstep=curstep*pagenum,
        articleTag=req.body.articleTag,
        uName=req.body.uName,
        object={};
    if(articleTag == 111)
    {
        object={author: uName};
    }else{
        object={articleTag: articleTag,author: uName};
    }
    
    articles.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            res.redirect('/error');
        }else{
            res.send({allArticles: results, nums: nums}); 
        }
    })
    
};

/* GET noPublicBW page. */
exports.noPublicBW = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "未发表博文";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    articles.findAllByCon({author: uName,articleTag: 0},PAGE_NUM,0,function(err, results, nums){
        if(err){
            res.redirect('/error');
        }else{
            var showpagetip, allpage;
            allpage=Math.ceil(nums/PAGE_NUM);
            if(allpage>PAGE_NUM_JIAN1){
                showpagetip=PAGE_NUM_JIAN1;
            }else{
                showpagetip=allpage;
            }
             getArtExpNum(uName, function(err, resu) {
                if (err) {
                    res.redirect('/error');
                } else {
                    res.render('./userBlog/managearticle', {
                        navTitle: navTitle,
                        navDesc: navDesc,
                        uName: uName,
                        signed: '1',
                        vCode: '',
                        modules: [],
                        title: '未发表博文',
                        allNum: resu,
                        nums: nums,
                        allArticles: results,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        articleTag:0,
                        cssFils:['userBlog/managearticle'],
                        jsFils:['userBlog/managearticle']
                    });
                }
            });
        }
    });
};

/* 删除. */
exports.delArticle = function(req, res, next) {
    uName = req.session.user.username;
    var aid=req.body.aid;

    var obj={author: uName,_id: aid}

    articles.delete(obj,function(err){
        if(err){
            retDesc = "系统出现故障，请稍后再试!";
            return res.send({retCode: 400,retDesc: retDesc}); 
        }else{
            return res.send({retCode: 200}); 
        }
    });
};

/* 发布 */
exports.pubArticle = function(req, res, next) {
    uName = req.session.user.username;
    var aid=req.body.aid;

    var obj={author: uName,_id: aid}

    articles.modify(obj,{articleTag: 1}, function(err){
        if(err){
            retDesc = "系统出现故障，请稍后再试!";
            return res.send({retCode: 400,retDesc: retDesc}); 
        }else{
            return res.send({retCode: 200}); 
        }
    });
};

/* GET relatedMeBW page. */
exports.relatedMeBW = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "所有博文";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    articles.findAllByCon({author: uName},PAGE_NUM,0,function(err, results, nums){
        if(err){
            res.redirect('/error');
        }else{
            var showpagetip, allpage;
            allpage=Math.ceil(nums/PAGE_NUM);
            if(allpage>PAGE_NUM_JIAN1){
                showpagetip=PAGE_NUM_JIAN1;
            }else{
                showpagetip=allpage;
            }
             getArtExpNum(uName, function(err, resu) {
                if (err) {
                    res.redirect('/error');
                } else {
                    res.render('./userBlog/managearticle', {
                        navTitle: navTitle,
                        navDesc: navDesc,
                        uName: uName,
                        signed: '1',
                        vCode: '',
                        modules: [],
                        title: '所有博文',
                        allNum: resu,
                        nums: nums,
                        allArticles: results,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        cssFils:['userBlog/managearticle'],
                        jsFils:['userBlog/managearticle']
                    });
                }
            });
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
            },
            function(callback) {
                comment.allNum(uName, function(err, results) {
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
