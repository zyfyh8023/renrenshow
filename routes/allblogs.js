"use strict";
var articles = require('../models/article');
var experiences = require('../models/experience');
var checkState = require('./checkState');
var async = require('async');
// var url = require('url');


var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

/* GET home page. */
exports.artSee1 = function(req, res, next) {
    navTitle = "资源导航定制1";
    navDesc = "资源导航为童鞋们提供学习方向、学习途径、和业界最新消息、最新资料等。编程工具、" +
        "国外牛人、国内牛人、JS框架、UI框架、JS库、CSS库。每周更新及时。";

    // var urls=url.parse(req.url, true).query;
    var artTyp=1;

    checkState.myState(req, function(err, rs){
        if(err){
            res.redirect('/error');
        }else{
            if(rs.signed=='2' && rs.uName!=""){
                getBlogComs(rs.uName, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                        res.render('./userBlog2/userAllBlog', {
                            title: '博文查看',
                            resul: results,
                            uName:rs.uName,
                            navTitle: navTitle,
                            navDesc: navDesc,
                            allArticles:results[artTyp]
                        });
                    }
                });
            }else if(rs.signed=='3' && rs.uName!=""){
                getBlogComs(rs.uName, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                        res.render('./userBlog2/userAllBlog', {
                            title: '博文查看',
                            resul: results,
                            uName:rs.uName,
                            navTitle: navTitle,
                            navDesc: navDesc,
                            allArticles:results[artTyp]
                        });
                    }
                });
            }else if(rs.signed=='1' && rs.uName!=""){
                getBlogComs(rs.uName, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                        console.log(results);
                        res.render('./userBlog2/userAllBlog', {
                            title: '博文查看',
                            resul: results,
                            uName:rs.uName,
                            navTitle: navTitle,
                            navDesc: navDesc,
                            allArticles:results[artTyp]
                        });
                    }
                });
            }else{
                res.redirect('/login');
            }
        }
    });


};

/* GET home page. */
exports.expSee = function(req, res, next) {
    navTitle = "资源导航定制";
    navDesc = "资源导航为童鞋们提供学习方向、学习途径、和业界最新消息、最新资料等。编程工具、" +
        "国外牛人、国内牛人、JS框架、UI框架、JS库、CSS库。每周更新及时。";

    checkState.myState(req, function(err, rs){
        if(err){
            res.redirect('/error');
        }else{
            if(rs.signed=='2' && rs.uName!=""){
                getBlogComs(rs.uName, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                        res.render('./userBlog2/userAllBlog', {
                            title: '博文查看',
                            resul: results,
                            uName:rs.uName,
                            navTitle: navTitle,
                            navDesc: navDesc
                        });
                    }
                });
            }else if(rs.signed=='3' && rs.uName!=""){
                getBlogComs(rs.uName, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                        res.render('./userBlog2/userAllBlog', {
                            title: '博文查看',
                            resul: results,
                            uName:rs.uName,
                            navTitle: navTitle,
                            navDesc: navDesc
                        });
                    }
                });
            }else if(rs.signed=='1' && rs.uName!=""){
                getBlogComs(rs.uName, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                        res.render('./userBlog2/userAllBlog', {
                            title: '博文查看',
                            resul: results,
                            uName:rs.uName,
                            navTitle: navTitle,
                            navDesc: navDesc
                        });
                    }
                });
            }else{
                res.redirect('/login');
            }
        }
    });


};

function getBlogComs(uName, callFn) {
    async.series([
            function(callback) {
                articles.findAll({
                    articleTag:1,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                articles.findAll({
                    articleTag:2,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                articles.findAll({
                    articleTag:3,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                articles.findAll({
                    articleTag:4,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                experiences.findAll({
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