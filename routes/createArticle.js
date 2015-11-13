"use strict";

var articles = require('../models/article');

/* GET createarticle page. */
exports.page=function(req, res, next) {
  res.render('createarticle', { title: '新建博文' });
};

/* POST createarticle page. */
exports.doPage=function(req, res, next) {
    var author = req.session.user.username,    //session的时间问题
        articleTitle = req.body.articleTitle || '',
        articleKeyword = req.body.articleKeyword || '',
        articleAbstract = req.body.articleAbstract || '',
        articleCont = req.body.articleCont || '',
        articleImgs = req.body.articleImgs || '',
        articleType = req.body.articleType || '',
        articleLink = req.body.articleLink || '',
        articleTag = req.body.tags || 0;

    var newArticle = new articles.Article({
        author: author,
        articleTitle: articleTitle,
        articleKeyword: articleKeyword,
        articleAbstract: articleAbstract,
        articleCont: articleCont,
        articleImgs: articleImgs,
        articleType: articleType,
        articleTag: articleTag,
        articleLink: articleLink
    });

    articles.create(newArticle,function (err) {
        if (err) {
            errorTip="博文新建失败!";
            console.log(errorTip);
            res.redirect('myError');
        }else{
            console.log(newArticle);
            res.render('createArticle', { title: '新建博文' });
        }
    });

}