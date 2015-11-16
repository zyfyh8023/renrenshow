"use strict";
var experiences = require('../models/experience');

var retCode, retDesc, uName;

/* GET ManageArticle page. */
exports.page=function(req, res, next) {
    uName=req.session.user.username;
  	experiences.findAll({author:uName,experienceTag:1}, function (err, results) {
        if (err) {
            retDesc="系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            if(results){
                res.render('manageExperience', { title: '面经管理', allArticles: results});
            }else{
                retDesc="用户的面经查找失败!";
                res.redirect('myError?retDesc='+retDesc);
            }
        }
  	});
};

/* GET ManageArticle page. */
exports.noPublicMJ=function(req, res, next) {
    uName=req.session.user.username;
    experiences.findAll({author:uName,experienceTag:2}, function (err, results) {
        if (err) {
            retDesc="系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            if(results){
                res.render('manageExperience', { title: '面经管理', allArticles: results});
            }else{
                retDesc="用户的面经查找失败!";
                res.redirect('myError?retDesc='+retDesc); 
            }
        }
    });
};

/* GET ManageArticle page. */
exports.relatedMeMJ=function(req, res, next) {
    uName=req.session.user.username;
    experiences.findAll({author:uName}, function (err, results) {
        if (err) {
            retDesc="系统出现故障，请稍后再试!";
            res.redirect('myError?retDesc='+retDesc);
        }else{
            if(results){
                res.render('manageExperience', { title: '面经管理', allArticles: results});
            }else{
                retDesc="用户的面经查找失败!";
                res.redirect('myError?retDesc='+retDesc);
            }
        }
    });
};