"use strict";

var articles = require('../models/article');

var retDesc, retCode, uName;

/* GET createarticle page. */
exports.page=function(req, res, next) {
    res.render('createarticle', { title: '新建博文' });
};

/* POST createarticle page. */
exports.doPage=function(req, res, next) {
    uName = req.session.user.username;  
    var articleTitle = req.body.articleTitle.trim() || '',
        articleKeyword = req.body.articleKeyword.trim() || '',
        articleCont = req.body.articleCont.trim() || '',
        articleType = req.body.articleType.trim() || '',
        articleLink = req.body.articleLink.trim() || '',
        articleTag = req.body.tags || 0;

    var newArticle = new articles.Article({
        author: uName,
        articleTitle: articleTitle,
        articleKeyword: articleKeyword,
        articleCont: articleCont,
        articleType: articleType,
        articleTag: articleTag,
        articleLink: articleLink
    });

    articles.create(newArticle,function (err) {
        if(err){
                retDesc="保存失败,请稍后再试!";
                return res.send({retCode:400, retDesc:retDesc});
        }else{
            return res.send({retCode:200});
        }
    });
}