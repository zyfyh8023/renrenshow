"use strict";
var articles = require('../models/article');

/* GET ManageArticle page. */
exports.page=function(req, res, next) {
  	var errorTip,
    uName=req.session.user.username;
  	articles.findAll({author:uName,articleTag:0}, function (err, results) {
        if (err) {
            errorTip="用户的博文查找失败!";
            console.log(errorTip);
            res.redirect('myError');
        }else{
            res.render('managearticle', { title: '博文管理', allArticles: results});
        }
  	});
};

/* GET noPublicBW page. */
exports.noPublicBW=function(req, res, next) {
    var errorTip,
    uName=req.session.user.username;
    articles.findAll({author:uName,articleTag:1}, function (err, results) {
        if (err) {
            errorTip="用户的博文查找失败!";
            console.log(errorTip);
            res.redirect('myError');
        }else{
            res.render('managearticle', { title: '博文管理', allArticles: results});
        }
    });
};

/* GET relatedMeBW page. */
exports.relatedMeBW=function(req, res, next) {
    var errorTip,
    uName=req.session.user.username;
    articles.findAll({author:uName,articleTag:2}, function (err, results) {
        if (err) {
            errorTip="用户的博文查找失败!";
            console.log(errorTip);
            res.redirect('myError');
        }else{
            res.render('managearticle', { title: '博文管理', allArticles: results});
        }
    });
};
