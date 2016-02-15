"use strict";
var experiences = require('../../models/experience');
var articles = require('../../models/article');
var comment = require('../../models/comment');
var async = require('async');

var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

/* GET ManageArticle page. */
exports.page = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "面经管理中心";
    navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
        "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
        "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

    experiences.findAllByCon({
            author: uName,
            experienceTag: 1
        },10,0,function(err, results, nums){
        if(err){
            res.redirect('/error');
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
                        res.redirect('/error');
                    } else {
                        res.render('./userBlog/manageExperience', {
                            title: '面经管理',
                            uName: uName,
                            navTitle: navTitle,
                            allNum: resu,
                            navDesc: navDesc,
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
            } else {
                res.redirect('/error');
            }
        }
    });
};

exports.pageSearch = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=10,
        skipstep=curstep*pagenum,
        experienceTag=req.body.experienceTag,
        uName=req.body.uName,
        object={};
    if(experienceTag == 11)
    {
        object={
            author: uName
        };
    }else{
        object={
            experienceTag: experienceTag,
            author: uName
        };
    }
    
    experiences.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            console.log('err');
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
    
    experiences.findAllByCon({
            author: uName,
            experienceTag: 2
        },10,0,function(err, results, nums){
        if(err){
            res.redirect('/error');
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
                        res.redirect('/error');
                    } else {
                        res.render('./userBlog/manageExperience', {
                            title: '面经管理',
                            uName: uName,
                            navTitle: navTitle,
                            allNum: resu,
                            navDesc: navDesc,
                            nums: nums,
                            allArticles: results,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            experienceTag:2,
                            cssFils:['userBlog/manageExperience'],
                            jsFils:['userBlog/manageExperience']
                        });
                    }
                });
            } else {
                res.redirect('/error');
            }
        }
    });
};

/* GET 删除. */
exports.delExper = function(req, res, next) {
    uName = req.session.user.username;
    var aid=req.body.aid;

    var obj={
            author: uName,
            _id: aid
        }

    experiences.delete(obj,function(err){
        if(err){
            retDesc = "系统出现故障，请稍后再试!";
            return res.send({retCode: 400,retDesc: retDesc}); 
        }else{
            return res.send({retCode: 200}); 
        }
    });
};

/* GET public. */
exports.pubExper = function(req, res, next) {
    uName = req.session.user.username;
    var aid=req.body.aid;

    var obj={
            author: uName,
            _id: aid
        }

    experiences.modify(obj,{
        experienceTag: 1
    }, function(err){
        if(err){
            retDesc = "系统出现故障，请稍后再试!";
            return res.send({retCode: 400,retDesc: retDesc}); 
        }else{
            return res.send({retCode: 200}); 
        }
    });
};

/* GET ManageArticle page. */
exports.relatedMeMJ = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "与我相关面经";
    navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
        "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
        "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

    experiences.findAllByCon({
            author: uName
        },10,0,function(err, results, nums){
        if(err){
            res.redirect('/error');
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
                        res.redirect('/error');
                    } else {
                        res.render('./userBlog/manageExperience', {
                            title: '面经管理',
                            uName: uName,
                            navTitle: navTitle,
                            allNum: resu,
                            navDesc: navDesc,
                            nums: nums,
                            allArticles: results,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            cssFils:['userBlog/manageExperience'],
                            jsFils:['userBlog/manageExperience']
                        });
                    }
                });
            } else {
                res.redirect('/error');
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
