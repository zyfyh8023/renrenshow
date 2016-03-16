"use strict";
var articles = require('../../models/article');
var checkState = require('../checkState');
var url = require('url');

var retCode, retDesc, uName;

/* GET home page. */
exports.page = function(req, res, next) {
    var urls=url.parse(req.url, true).query,
        typ=parseInt(urls.typ);

    checkState.myState(req, res, function(rs){
        var obj={
            author: rs.uName,
            articleTag: 1,
            articleType: typ
        }
        articles.findAll(obj,function(err,result){
            if(err){
                res.redirect('/error');
            }else{
                if(rs.signed=='1'){
                    res.render('./userBlog2/alluArts', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: '我的博文查看',
                        resul: result
                    });
                }else if(rs.signed=='2'){
                    res.render('./userBlog2/alluArts', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: 'TA的博文查看(特权)',
                        resul: result
                    });
                }else{
                    res.render('./userBlog2/alluArts', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: 'TA的博文查看(普通)',
                        resul: result
                    });
                }
            }
        });
    });
	
};
