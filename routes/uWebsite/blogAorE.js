"use strict";
var articles = require('../../models/article');
var experiences = require('../../models/experience');
var comment = require('../../models/comment');
var checkState = require('../checkState');
var url = require('url');
var async = require('async');

var retCode, retDesc, uName;

/* GET home page. */
exports.artSee = function(req, res, next) {
	var urls=url.parse(req.url, true).query,
		aid=urls.aid;

    checkState.myState(req, res, function(rs){
        getArtComs(aid, function(err, results){
            if(err){
                res.redirect('/error');
            }else{
                if(rs.signed=='1'){
                    res.render('./userBlog2/blog_art', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: '我的博文查看',
                        resul: results.artObj,
                        resul2: results.artComs
                    });
                }else if(rs.signed=='2'){
                   if(results.artObj.articleType=='91'){
                        checkState.yesOrNo(res, rs, 3, 4, 1, function(){
                            res.render('./userBlog2/blog_art', {
                                uName: rs.uName,
                                signed: rs.signed,
                                vCode: rs.vCode,
                                modules: rs.modules,
                                title: 'TA的博文查看(特权)',
                                resul: results.artObj,
                                resul2: results.artComs
                            });
                        })
                   }else if(results.artObj.articleType=='21'){
                        checkState.yesOrNo(res, rs, 3, 2, 1, function(){
                            res.render('./userBlog2/blog_art', {
                                uName: rs.uName,
                                signed: rs.signed,
                                vCode: rs.vCode,
                                modules: rs.modules,
                                title: 'TA的博文查看(特权)',
                                resul: results.artObj,
                                resul2: results.artComs
                            });
                        })
                   }else{
                        res.render('./userBlog2/blog_art', {
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules,
                            title: 'TA的博文查看(特权)',
                            resul: results.artObj,
                            resul2: results.artComs
                        });
                   }
                }else{
                    if(results.artObj.articleType=='91'){
                        checkState.yesOrNo(res, rs, 3, 4, 1, function(){
                            res.render('./userBlog2/blog_art', {
                                uName: rs.uName,
                                signed: rs.signed,
                                vCode: rs.vCode,
                                modules: rs.modules,
                                title: 'TA的博文查看(普通)',
                                resul: results.artObj,
                                resul2: results.artComs
                            });
                        })
                    }else if(results.artObj.articleType=='21'){
                        checkState.yesOrNo(res, rs, 3, 2, 1, function(){
                            res.render('./userBlog2/blog_art', {
                                uName: rs.uName,
                                signed: rs.signed,
                                vCode: rs.vCode,
                                modules: rs.modules,
                                title: 'TA的博文查看(普通)',
                                resul: results.artObj,
                                resul2: results.artComs
                            });
                        })
                    }else{
                        res.render('./userBlog2/blog_art', {
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules,
                            title: 'TA的博文查看(普通)',
                            resul: results.artObj,
                            resul2: results.artComs
                        });
                    }
                }
            }
        }); 
    });
	
};

/* GET home page. */
exports.expSee = function(req, res, next) {
    var urls=url.parse(req.url, true).query,
        aid=urls.aid;

    checkState.myState(req, res, function(rs){
        if(rs.signed=='1'){
            getExpComs(aid, function(err, results){
                if(err){
                    res.redirect('/error');
                }else{
                    res.render('./userBlog2/blog_exper', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: '我的面经查看',
                        resul: results.artObj,
                        resul2: results.artComs
                    });
                }
            });
        }else if(rs.signed=='2'){
            checkState.yesOrNo(res, rs, 3, 3, 1, function(){
                getExpComs(aid, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                        res.render('./userBlog2/blog_exper', {
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules,
                            title: 'TA的面经查看(特权)',
                            resul: results.artObj,
                            resul2: results.artComs
                        });
                    }
                });  
            })
        }else{
            getExpComs(aid, function(err, results){
                if(err){
                    res.redirect('/error');
                }else{
                    res.render('./userBlog2/blog_exper', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: 'TA的面经查看(普通)',
                        resul: results.artObj,
                        resul2: results.artComs
                    });
                }
            });
        }
    })


};


function getArtComs(aid, callFn) {
    async.waterfall([
        function(callback){
            articles.findAll({_id: aid}, function(err, resul1){
            	if(err){
            		callback(err,null);
            	}else{
            		callback(null,resul1[0]);
            	}
            });
        },
        function(data,callback){
    		comment.findAll({'CommentArt':aid}, function(err, resul2) {
    		    if (err) {
    		        callback(err,null);
    		    } else {
    		        if (resul2) {
    		        	var data2={
    		        		artObj:data,
    		        		artComs: resul2
    		        	}
    		            callback(null,data2);
    		        } else {
    		        	callback('no data',null);
    		        }
    		    }
    		});
        }],
        function(error,result){
            if(error){
                callFn(error, null);
            }
            else{
                callFn(null, result);
            }
        }
    );
}


function getExpComs(aid, callFn) {
    async.waterfall([
        function(callback){
            experiences.findAll({_id: aid}, function(err, resul1){
                if(err){
                    callback(err,null);
                }else{
                    callback(null,resul1[0]);
                }
            });
        },
        function(data,callback){
            comment.findAll({'CommentExp':aid}, function(err, resul2) {
                if (err) {
                    callback(err,null);
                } else {
                    if (resul2) {
                        var data2={
                            artObj:data,
                            artComs: resul2
                        }
                        callback(null,data2);
                    } else {
                        callback('no data',null);
                    }
                }
            });
        }],
        function(error,result){
            if(error){
                callFn(error, null);
            }
            else{
                callFn(null, result);
            }
        }
    );
}