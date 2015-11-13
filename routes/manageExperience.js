"use strict";
var experiences = require('../models/experience');

/* GET ManageArticle page. */
exports.page=function(req, res, next) {
  	var errorTip,
    uName=req.session.user.username;
  	experiences.findAll({author:uName,experienceTag:0}, function (err, results) {
        if (err) {
            errorTip="用户的面经查找失败!";
            console.log(errorTip);
            res.redirect('myError');
        }else{
            res.render('manageExperience', { title: '面经管理', allArticles: results});
        }
  	});
};

/* GET ManageArticle page. */
exports.noPublicMJ=function(req, res, next) {
    var errorTip,
    uName=req.session.user.username;
    experiences.findAll({author:uName,experienceTag:1}, function (err, results) {
        if (err) {
            errorTip="用户的面经查找失败!";
            console.log(errorTip);
            res.redirect('myError');
        }else{
            res.render('manageExperience', { title: '面经管理', allArticles: results});
        }
    });
};

/* GET ManageArticle page. */
exports.relatedMeMJ=function(req, res, next) {
    var errorTip,
    uName=req.session.user.username;
    experiences.findAll({author:uName,experienceTag:2}, function (err, results) {
        if (err) {
            errorTip="用户的面经查找失败!";
            console.log(errorTip);
            res.redirect('myError');
        }else{
            res.render('manageExperience', { title: '面经管理', allArticles: results});
        }
    });
};