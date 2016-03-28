"use strict";

var experiences = require('../../models/experience');
var checkState = require('../checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req, res, false);

	var obj={
	    experienceTag: '1'
	}
	experiences.findAllByCon(obj,10,0,function(err, results, nums){
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
			res.render('exps', {
				title: '面经-助聘网',
				uName: uName,
				nums: nums,
				showpagetip: showpagetip, 
				allpage: allpage,
				resul: results,
				jsFils:['exps']
			});
		}
	})
};



exports.allexpPS = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=10,
        skipstep=curstep*pagenum,
        object={};
   
        object={
            experienceTag: '1'
        };
    
    experiences.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            res.redirect('/error');
        }else{
            res.send({allArticles: results, nums: nums}); 
        }
    })
    
};