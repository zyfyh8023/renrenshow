"use strict";

var articles = require('../models/article');
var comment = require('../models/comment');
var experiences = require('../models/experience');
var async = require('async');

var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

/* GET createExperience page. */
exports.page = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "写面经";
    navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
        "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
        "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

    getArtExpNum(uName, function(err, resu) {
        if (err) {
            res.redirect('/error');
        } else {
            res.render('./userBlog/createExperience', {
                title: '写面经',
                uName: uName,
                navTitle: navTitle,
                allNum: resu,
                navDesc: navDesc,
                cssFils:['userBlog/createExperience'],
                jsFils:['userBlog/createExperience']
            });
        }
    });
};

/* POST createExperience page. */
exports.doPage = function(req, res, next) {
    uName = req.session.user.username; //session的时间问题
    var experienceTitle = req.body.experienceTitle.trim() || '',
        experienceCompany = req.body.experienceCompany.trim() || '',
        experienceTag = req.body.tags || 0,
        experienceCont = req.body.experienceCont.trim() || '',
        experienceImgs = req.body.experienceImgs;


    var newExperience = new experiences.Experience({
        author: uName,
        experienceTitle: experienceTitle,
        experienceCompany: experienceCompany,
        experienceTag: experienceTag,
        experienceCont: experienceCont,
        experienceImgs: experienceImgs
    });

    //如果不存在则新增用户
    experiences.create(newExperience, function(err) {
        if (err) {
            retDesc = "保存失败,请稍后再试!";
            return res.send({
                retCode: 400,
                retDesc: retDesc
            });
        } else {
            return res.send({
                retCode: 200
            });
        }
    });

}

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
