"use strict";
var articles = require('../../models/article');
var checkState = require('../checkState');
var url = require('url');

var retCode, retDesc, uName;

/* GET home page. */
exports.page = function(req, res, next) {
    var urls=url.parse(req.url, true).query,
        typ=parseInt(urls.typ);

    checkState.myState(req, function(err, rs){
        if(err){
            res.redirect('/error');
        }else{
            var obj={
                author: rs.uName,
                articleTag: 1,
                articleType: typ
            }
            articles.findAll(obj,function(err,result){
                if(err){
                    res.redirect('/error');
                }else{
                    if(rs.signed=='2' && rs.uName!=""){
                        res.render('./userBlog2/alluArts', {
                            title: 'TA的博文查看(特权)',
                            resul: result,
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules
                        });
                    }else if(rs.signed=='3' && rs.uName!=""){
                        res.render('./userBlog2/alluArts', {
                            title: 'TA的博文查看(普通)',
                            resul: result,
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules
                        });
                    }else if(rs.signed=='1' && rs.uName!=""){
                        res.render('./userBlog2/alluArts', {
                            title: '我的博文查看',
                            resul: result,
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode
                        });
                    }else{
                        res.redirect('/error');
                    }
                }
            });
        }
    });
	
};
