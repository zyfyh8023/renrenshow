"use strict";
var articles = require('../../models/article');
var experiences = require('../../models/experience');
var checkState = require('../checkState');
var async = require('async');
var url = require('url');


var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

/* GET home page. */
exports.artSee = function(req, res, next) {
    navTitle = "博客文章";
    navDesc = "资源导航为童鞋们提供学习方向、学习途径、和业界最新消息、最新资料等。编程工具、" +
        "国外牛人、国内牛人、JS框架、UI框架、JS库、CSS库。每周更新及时。";
    var urls=url.parse(req.url, true).query;
    var artTyp=parseInt(urls.typ);
    
    checkState.myState(req, res, function(rs){

        if(rs.signed=='2'){
            getBlogComs(rs.uName, function(err, results){
                if(err){
                    res.redirect('/error');
                }else{
                    if(results){
                        var showpagetip, allpage;
                        allpage=Math.ceil(results[artTyp].length/10);
                        if(allpage>9){
                            showpagetip=9;
                        }else{
                            showpagetip=allpage;
                        }
                        res.render('./userBlog2/userAllBlog1', {
                            navTitle: navTitle,
                            navDesc: navDesc,
                            uName:rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules,
                            title: 'TA的博客文章(特权)',
                            resul: results,
                            allArticles:results[artTyp],
                            nums: results[artTyp].length,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            artTyp:artTyp+1,
                            jsFils:['userBlog2/userAllBlog1']
                        });
                    }else{
                        res.redirect('/error');
                    }
                }
            });
        }else if(rs.signed=='3'){
            getBlogComs(rs.uName, function(err, results){
                if(err){
                    res.redirect('/error');
                }else{
                    if(results){
                        var showpagetip, allpage;
                        allpage=Math.ceil(results[artTyp].length/10);
                        if(allpage>9){
                            showpagetip=9;
                        }else{
                            showpagetip=allpage;
                        }
                        res.render('./userBlog2/userAllBlog1', {
                            navTitle: navTitle,
                            navDesc: navDesc,
                            uName:rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules,
                            title: 'TA的博客文章(普通)',
                            resul: results,
                            allArticles:results[artTyp],
                            nums: results[artTyp].length,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            artTyp:artTyp+1,
                            jsFils:['userBlog2/userAllBlog1']
                        });
                    }else{
                        res.redirect('/error');
                    }
                }
            });
        }else{
            res.redirect('/error');
        }
    });

};

/* GET home page. */
exports.expSee = function(req, res, next) {
    navTitle = "面试经验";
    navDesc = "资源导航为童鞋们提供学习方向、学习途径、和业界最新消息、最新资料等。编程工具、" +
        "国外牛人、国内牛人、JS框架、UI框架、JS库、CSS库。每周更新及时。";

    checkState.myState(req, res, function(rs){
        if(rs.signed=='2'){
            getBlogComs(rs.uName, function(err, results){
                if(err){
                    res.redirect('/error');
                }else{
                    if(results){
                        var showpagetip, allpage;
                        allpage=Math.ceil(results[4].length/10);
                        if(allpage>9){
                            showpagetip=9;
                        }else{
                            showpagetip=allpage;
                        }
                        res.render('./userBlog2/userAllBlog2', {
                            navTitle: navTitle,
                            navDesc: navDesc,
                            uName:rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules,
                            title: 'TA的面试经验(特权)',
                            resul: results,
                            allArticles:results[4],
                            nums: results[4].length,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            jsFils:['userBlog2/userAllBlog2']
                        });
                    }else{
                        res.redirect('/error');  
                    }
                }
            });
        }else if(rs.signed=='3'){
            getBlogComs(rs.uName, function(err, results){
                if(err){
                    res.redirect('/error');
                }else{
                    if(results){
                        var showpagetip, allpage;
                        allpage=Math.ceil(results[4].length/10);
                        if(allpage>9){
                            showpagetip=9;
                        }else{
                            showpagetip=allpage;
                        }
                        res.render('./userBlog2/userAllBlog2', {
                            navTitle: navTitle,
                            navDesc: navDesc,
                            uName:rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules,
                            title: 'TA的面试经验(普通)',
                            resul: results,
                            allArticles:results[4],
                            nums: results[4].length,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            jsFils:['userBlog2/userAllBlog2']
                        });
                    }else{
                        res.redirect('/error');  
                    }
                }
            });
        }else{
            res.redirect('/error');
        }
    });

};


exports.pageSearchArt = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=10,
        skipstep=curstep*pagenum,
        artTyp=req.body.artTyp,
        uName=req.body.uName,
        object={};

    artTyp=parseInt(artTyp);
    if(artTyp>=1 && artTyp<=4){
        if(artTyp==1){
            object.articleType={$in: ['01','02','03','04','05','06']};
        }else if(artTyp==2){
            object.articleType='11';
        }else if(artTyp==3){
            object.articleType='21';
        }else{
            object.articleType='91';
        }
        
        object.articleTag=1;
        object.author=uName;
        articles.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
            if(err){
                return res.send({retCode: 400,retDesc: '信息查找失败！'});
            }else{
                res.send({allArticles: results, nums: nums}); 
            }
        })
    }else{
        return res.send({retCode: 400,retDesc: '信息查找失败！'});
    }
    
};


exports.pageSearchExp = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=10,
        skipstep=curstep*pagenum,
        uName=req.body.uName,
        object={};

        object={
            experienceTag:1,
            author:uName
        };
        experiences.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
            if(err){
               return res.send({retCode: 400,retDesc: '信息查找失败！'});
            }else{
                res.send({allArticles: results, nums: nums}); 
            }
        })
    
};


function getBlogComs(uName, callFn) {
    async.series([
            function(callback) {
                articles.findAll({
                    articleType:{$in : ['01', '02', '03', '04', '05', '06']},
                    articleTag:1,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                articles.findAll({
                    articleType:'11',
                    articleTag:1,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                articles.findAll({
                    articleType:'21',
                    articleTag:1,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                articles.findAll({
                    articleType:'91',
                    articleTag:1,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                experiences.findAll({
                    experienceTag: 1,
                    author:uName
                }, function(err, results) {
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