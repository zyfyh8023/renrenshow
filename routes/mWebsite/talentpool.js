"use strict";

var checkState = require('../checkState');
var users = require('../../models/users');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req, res, false);

	users.findAllByCon({},36,0,function(err, result, nums){
	    if(err){
	        res.redirect('/error');
	    }else{
	        var showpagetip, allpage;
	        allpage=Math.ceil(nums/36);
	        if(allpage>35){
	            showpagetip=35;
	        }else{
	            showpagetip=allpage;
	        }
			res.render('talentpool', {
				title: '人才库-人人秀',
				uName: uName,
				results: result ,
				nums: nums,
				showpagetip: showpagetip, 
				allpage: allpage,
				cssFils:['talentpool'],
				jsFils:['talentpool']
			});
		}
	});
	
};


exports.allUserPS = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=36,
        skipstep=curstep*pagenum,
        object={};
   
    users.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            console.log('err');
        }else{
            res.send({allArticles: results, nums: nums}); 
        }
    })
    
};


exports.userSearch = function(req, res){
    var curstep=req.body.val,
   		object={
   			// username:/fyh/,
   			username:{$in : [ "zyfyh8023@163.com", "zy@163.com" ] }
   		};

    users.findAll(object,function(err, results){
        if(err){
            console.log('err');
        }else{
            res.send(results); 
        }
    })
    
};