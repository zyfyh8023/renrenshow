"use strict";

var checkState = require('../checkState');
var articles = require('../../models/article');
var url = require('url');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req, res, false);

	var urls=url.parse(req.url, true).query,
	    typ=parseInt(urls.typ);

	    var obj={
		        articleTag: 1,
		        articleType: typ
	    	}
	    articles.findAllByCon(obj,10,0,function(err, results, nums){
	        if(err){
	            res.redirect('/error');
	        }else{
	            var showpagetip, allpage;
	            allpage=Math.ceil(nums/10);
	            if(allpage>9){
	                showpagetip=9;
	            }else{
	                showpagetip=allpage;
	            }
	            console.log(results);
	            res.render('allarticle', {
	            	title: '博文汇总-人人秀',
	            	nums: nums,
	            	showpagetip: showpagetip, 
	            	allpage: allpage,
	            	uName: uName,
	            	resul: results,
	            	typ: urls.typ,
	            	jsFils:['allarticle']
	            });
	        }
	    });

	
};


exports.allartPS = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=10,
        skipstep=curstep*pagenum,
        articleTag='1',
        typ=req.body.typ,
        object={};
   
        object={
            articleTag: articleTag,
            articleType: typ
        };
    
    articles.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            console.log('err');
        }else{
            res.send({allArticles: results, nums: nums}); 
        }
    })
    
};