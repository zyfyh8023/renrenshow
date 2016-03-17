"use strict";
var comment = require('../../models/comment');
var articles = require('../../models/article');
var experiences = require('../../models/experience');
var users = require('../../models/users');
var async = require('async');

var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

exports.minePage = function(req, res, next){
    uName = req.session.user.username;
    navTitle = "我的评论";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    comment.findAllByCon({author:uName}, 10, 0, function(err, results, nums) {
        if (err) {
            res.redirect('/error');
        } else {
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
                        navTitle: navTitle,
                        navDesc: navDesc,
                        uName: uName,
                        signed: '1',
                        vCode: '',
                        modules: [],
                        title: '我的评论',
                        allNum: resu,
                        nums: nums,
                        allComments: results,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        comTyp:'author',
                        cssFils:['userBlog/manageComments'],
                        jsFils:['userBlog/manageComments']
                    });
                }
            });
        }
    });
}

exports.yoursPage = function(req, res, next){
    uName = req.session.user.username;
    navTitle = "评论我的";
    navDesc = "可以作为自己的个人文集，把自己的写的文章按照一定的时间顺序、目录或者标签发表到自己的博客上" +
        "这是博客最初的最基本的功能，就是发表个人网络日志。";

    comment.findAllByCon({artAuthor:uName}, 10, 0, function(err, results, nums) {
        if (err) {
            res.redirect('/error');
        } else {
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
                        navTitle: navTitle,
                        navDesc: navDesc,
                        uName: uName,
                        signed: '1',
                        vCode: '',
                        modules: [],
                        title: '评论我的',
                        allNum: resu,
                        nums: nums,
                        allComments: results,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        comTyp:'artAuthor',
                        cssFils:['userBlog/manageComments'],
                        jsFils:['userBlog/manageComments']
                    });
                }
            });
        }
    });
    
}

/* POST createarticle page. */
exports.doPage = function(req, res, next) {
    //拦截登录
    if(!req.session.user){
        return res.send({retCode: 401, retDesc: '需要先登录，才可以评论哦~'});
    }
    uName = req.session.user.username;
    var comCon = req.body.comCon.trim() || '',
        comArt = req.body.comArt.trim() || '',
        typ = req.body.typ.trim() || '',
        artAuthor = req.body.artAuthor.trim() || '';

    users.findByUname(uName, function(err, result) {
        if (err) {
           return res.send({retCode: 400, retDesc: '用户查找失败！'});
        } else {
            if (result) {
                var newComment;
                switch (typ){
                    case '1':
                        newComment = new comment.Comment({
                            author: uName,
                            authorImg:result.headimg,
                            CommentCont: comCon,
                            CommentArt: comArt,    //文章
                            artAuthor: artAuthor
                        });
                        break;
                    case '2':
                        newComment = new comment.Comment({
                            author: uName,
                            authorImg:result.headimg,
                            CommentCont: comCon,
                            CommentExp: comArt,   //面经
                            artAuthor: artAuthor
                        });
                        break;
                    case '3':
                        newComment = new comment.Comment({
                            author: uName,
                            authorImg:result.headimg,
                            CommentCont: comCon,
                            CommentResumeTyp:'3', //荣誉
                            CommentResumeVal: comArt,
                            artAuthor: artAuthor
                        });
                        break;
                    case '4':
                        newComment = new comment.Comment({
                            author: uName,
                            authorImg:result.headimg,
                            CommentCont: comCon,
                            CommentResumeTyp:'4',  //工作
                            CommentResumeVal: comArt,
                            artAuthor: artAuthor
                        });
                        break;
                    case '5':
                        newComment = new comment.Comment({
                            author: uName,
                            authorImg:result.headimg,
                            CommentCont: comCon,
                            CommentResumeTyp:'5',   //教育
                            CommentResumeVal: comArt,
                            artAuthor: artAuthor
                        });
                        break;
                    case '6':
                        newComment = new comment.Comment({
                            author: uName,
                            authorImg:result.headimg,
                            CommentCont: comCon,
                            CommentResumeTyp:'6',  //作品
                            CommentResumeVal: comArt,
                            artAuthor: artAuthor
                        });
                        break;
                    case '7':
                        newComment = new comment.Comment({
                            author: uName,
                            authorImg:result.headimg,
                            CommentCont: comCon,
                            CommentResumeTyp:'7',  //实习
                            CommentResumeVal: comArt,
                            artAuthor: artAuthor
                        });
                        break;
                    default:
                        return res.send({retCode: 400, retDesc: '评论失败，稍后再试!'});
                        break;
                }
               
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