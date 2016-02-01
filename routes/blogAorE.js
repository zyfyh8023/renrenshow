"use strict";
var articles = require('../models/article');
var experiences = require('../models/experience');
var comment = require('../models/comment');
var url = require('url');
var async = require('async');

var retCode, retDesc, uName;

/* GET home page. */
exports.artSee = function(req, res, next) {
	var urls=url.parse(req.url, true).query,
		aid=urls.aid;
	getArtComs(aid, function(err, results){
		if(err){

		}else{
			console.log(results);
			res.render('blog_art', {
				title: '博文查看',
				resul: results.artObj,
				resul2: results.artComs,
			});
		}
	});
};

/* GET home page. */
exports.expSee = function(req, res, next) {
	res.render('blog_exper', {
		title: '面经查看'
	});
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
