"use strict";
var comment = require('../models/comment');
var users = require('../models/users');
var async = require('async');

var retCode, retDesc, uName;

/* POST createarticle page. */
exports.doPage = function(req, res, next) {
    uName = req.session.user.username;
    if(!uName){
    	return res.send({retCode: 400, retDesc: '先登录，才可评论！'});
    }else{
        var comCon = req.body.comCon.trim() || '',
            comArt = req.body.comArt.trim() || '',
            artAuthor = req.body.artAuthor.trim() || '';

        users.findByUname(uName, function(err, result) {
            if (err) {
               return res.send({retCode: 400, retDesc: '用户查找失败！'});
            } else {
                if (result) {
                    console.log(result.headimg);
                    var newComment = new comment.Comment({
                        author: uName,
                        authorImg:result.headimg,
                        CommentCont: comCon,
                        CommentArt: comArt,
                        artAuthor: artAuthor
                    });

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
    
}


