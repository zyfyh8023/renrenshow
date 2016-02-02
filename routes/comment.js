"use strict";
var comment = require('../models/comment');
var articles = require('../models/article');
var experiences = require('../models/experience');
var users = require('../models/users');
var async = require('async');

var retCode, retDesc, uName, navTitle, navDesc;

exports.minePage = function(req, res, next){
    uName = req.session.user.username;
    navTitle = "优秀博文积累1";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    comment.findAllByCon({author:uName}, 10, 0, function(err, results, nums) {
        if (err) {
            res.redirect('/error');
        } else {
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
                        console.log(results);
                        res.render('./userBlog/manageComments', {
                            title: '评论管理',
                            uName: uName,
                            navTitle: navTitle,
                            allNum: resu,
                            navDesc: navDesc,
                            nums: nums,
                            allComments: results,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            comTyp:'author'
                        });
                    }
                });
            }else {
                res.redirect('/error');
            }
        }
    });
}

exports.yoursPage = function(req, res, next){
    uName = req.session.user.username;
    navTitle = "优秀博文积累1";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    comment.findAllByCon({artAuthor:uName}, 10, 0, function(err, results, nums) {
        if (err) {
            res.redirect('/error');
        } else {
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
                        console.log(results);
                        res.render('./userBlog/manageComments', {
                            title: '评论管理',
                            uName: uName,
                            navTitle: navTitle,
                            allNum: resu,
                            navDesc: navDesc,
                            nums: nums,
                            allComments: results,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            comTyp:'artAuthor'
                        });
                    }
                });
            }else {
                res.redirect('/error');
            }
        }
    });
    
}

/* POST createarticle page. */
exports.doPage = function(req, res, next) {
    uName = req.session.user.username;
    var comCon = req.body.comCon.trim() || '',
        comArt = req.body.comArt.trim() || '',
        artAuthor = req.body.artAuthor.trim() || '';

    users.findByUname(uName, function(err, result) {
        if (err) {
           return res.send({retCode: 400, retDesc: '用户查找失败！'});
        } else {
            if (result) {
                var newComment = new comment.Comment({
                    author: uName,
                    authorImg:result.headimg,
                    CommentCont: comCon,
                    CommentArt: comArt,
                    artAuthor: artAuthor
                });

                comment.create(newComment, function(err) {
                    if (err) {
                        return res.send({retCode: 400, retDesc: '保存失败,请稍后再试!'});
                    } else {
                        return res.send({retCode: 200});
                    }
                });
            }else{
                return res.send({retCode: 400,retDesc: '用户名查找出现故障，请稍后再试！'});
            }
        }
    });
    
}

exports.pageSearch = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=10,
        skipstep=curstep*pagenum,
        comTyp=req.body.comTyp,
        uName=req.body.uName,
        object={};
        if(comTyp=='author'){
            object={
                author: uName
            };
        }else{
            object={
                artAuthor: uName
            };
        }
        
    comment.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            console.log('err');
        }else{
            res.send({allComments: results, nums: nums}); 
        }
    })
    
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