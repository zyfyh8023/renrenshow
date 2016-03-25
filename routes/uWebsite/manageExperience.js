"use strict";
var experiences = require('../../models/experience');
var articles = require('../../models/article');
var comment = require('../../models/comment');
var async = require('async');

var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

var PAGE_NUM=10;
var PAGE_NUM_JIAN1=9;
/* GET ManageArticle page. */
exports.page = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "已发表面经";
    navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
        "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
        "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

    experiences.findAllByCon({author: uName, experienceTag: 1},PAGE_NUM,0,function(err, results, nums){
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
                    res.render('./userBlog/manageExperience', {
                        navTitle: navTitle,
                        navDesc: navDesc,
                        uName: uName,
                        signed: '1',
                        vCode: '',
                        modules: [],
                        title: '已发表面经',
                        allNum: resu,
                        nums: nums,
                        allArticles: results,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        experienceTag:1,
                        cssFils:['userBlog/manageExperience'],
                        jsFils:['userBlog/manageExperience']
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
        experienceTag=req.body.experienceTag,
        uName=req.body.uName,
        object={};
    if(experienceTag == 111)
    {
        object={author: uName};
    }else{
        object={experienceTag: experienceTag,author: uName};
    }
    
    experiences.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            res.redirect('/error');
        }else{
            res.send({allArticles: results, nums: nums}); 
        }
    })
    
};

/* GET ManageArticle page. */
exports.noPublicMJ = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "未发表面经";
    navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
        "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
        "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";
    
    experiences.findAllByCon({author: uName,experienceTag: 0},PAGE_NUM,0,function(err, results, nums){
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
                    res.render('./userBlog/manageExperience', {
                        navTitle: navTitle,
                        navDesc: navDesc,
                        uName: uName,
                        signed: '1',
                        vCode: '',
                        modules: [],
                        title: '未发表面经',
                        allNum: resu,
                        nums: nums,
                        allArticles: results,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        experienceTag:0,
                        cssFils:['userBlog/manageExperience'],
                        jsFils:['userBlog/manageExperience']
                    });
                }
            });
        }
    });
};

/* 删除. */
exports.delExper = function(req, res, next) {
    uName = req.session.user.username;
    var aid=req.body.aid;
    var obj={author: uName,_id: aid}

    experiences.delete(obj,function(err){
        if(err){
            return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试!'}); 
        }else{
            return res.send({retCode: 200}); 
        }
    });
};

/* 发布 */
exports.pubExper = function(req, res, next) {
    uName = req.session.user.username;
    var aid=req.body.aid;
    var obj={author: uName,_id: aid}

    experiences.modify(obj,{experienceTag: 1}, function(err){
        if(err){
            return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试!'}); 
        }else{
            return res.send({retCode: 200}); 
        }
    });
};

/* GET ManageArticle page. */
exports.relatedMeMJ = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "所有面经";
    navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
        "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
        "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

    experiences.findAllByCon({author: uName},PAGE_NUM,0,function(err, results, nums){
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
                    res.render('./userBlog/manageExperience', {
                        navTitle: navTitle,
                        navDesc: navDesc,
                        uName: uName,
                        signed: '1',
                        vCode: '',
                        modules: [],
                        title: '所有面经',
                        allNum: resu,
                        nums: nums,
                        allArticles: results,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        cssFils:['userBlog/manageExperience'],
                        jsFils:['userBlog/manageExperience']
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
