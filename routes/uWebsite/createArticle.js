"use strict";
var comment = require('../../models/comment');
var articles = require('../../models/article');
var experiences = require('../../models/experience');
var async = require('async');

var retDesc, retCode, uName, navTitle, navDesc, cssFils, jsFils;

/* GET createarticle page. */
exports.page = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "个人设置中心";
    navDesc = "个人中心是一个全面的信息中心，在这里能够看到与个人相关的所有待办工作和参" +
        "与的项目的动态，方便对工作的全局掌握。个人中心是系统个性化的设置入口，支持" +
        "设置与个人相关的个性化配置，帮助用户更好的制定一个符合自己使用习惯的系统环境。";

    getArtExpNum(uName, function(err, resu) {
        if (err) {
            res.redirect('/error');
        } else {
            res.render('./userBlog/createarticle', {
                navTitle: navTitle,
                navDesc: navDesc,
                uName: uName,
                signed: '1',
                vCode: '',
                modules: [],
                title: '新建博文',
                allNum: resu,
                cssFils:['userBlog/createarticle'],
                jsFils:['userBlog/createarticle']
            });
        }
    });
};

/* POST createarticle page. */
exports.doPage = function(req, res, next) {
    uName = req.session.user.username;
    var articleTitle = req.body.articleTitle.trim() || '',
        articleKeyword = req.body.articleKeyword.trim() || '',
        articleAbstract = req.body.articleAbstract.trim() || '',
        articleCont = req.body.articleCont.trim() || '',
        articleType = req.body.articleType.trim() || '',
        articleTag = req.body.tags || 0,
        articleImgs = req.body.articleImgs;

    var newArticle = new articles.Article({
        author: uName,
        articleTitle: articleTitle,
        articleKeyword: articleKeyword,
        articleAbstract: articleAbstract,
        articleCont: articleCont,
        articleType: articleType,
        articleTag: articleTag,
        articleImgs: articleImgs
    });
    articles.create(newArticle, function(err) {
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
