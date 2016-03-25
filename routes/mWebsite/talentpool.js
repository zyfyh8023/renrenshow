"use strict";

var checkState = require('../checkState');
var users = require('../../models/users');

var retCode, retDesc, uName, cssFils, jsFils;

var PAGE_NUM=10,
	PAGE_NUM_JIAN1=9;
/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req, res, false);

	users.findAllByCon({},PAGE_NUM,0,function(err, result, nums){
	    if(err){
	        res.redirect('/error');
	    }else{
	        var showpagetip, allpage;
	        allpage=Math.ceil(nums/PAGE_NUM);
	        if(allpage>PAGE_NUM_JIAN1){
	            showpagetip=PAGE_NUM_JIAN1;
	        }else{
	            showpagetip=allpage;
	        }
			res.render('talentpool', {
				title: '人才-助聘网',
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
    var pagenum=PAGE_NUM,
        worktime=req.body.worktime.trim(),
        education=req.body.education.trim(),
        val=req.body.iptVal.trim(),
        object={},
        curstep=0,
        skipstep=0;

    if(req.body.curstep!='xxx'){
    	curstep=req.body.curstep-1;
    	skipstep=curstep*pagenum;
    }

   	if(val){
   		object.username=eval("/"+val+"/i") ;
   	}

   	if(worktime!=''){
   		worktime=worktime.split(',');
   		object.workTime={$in : worktime };
   	}

   	if(education!=''){
   		education=education.split(',');
   		object.education={$in : education };
   	}

    users.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            res.redirect('/error');
        }else{
        	var showpagetip, allpage;
        	allpage=Math.ceil(nums/PAGE_NUM);
        	if(allpage>PAGE_NUM_JIAN1){
        	    showpagetip=PAGE_NUM_JIAN1;
        	}else{
        	    showpagetip=allpage;
        	}
          res.send({allArticles: results, nums: nums, allpage: allpage, showpagetip: showpagetip}); 
        }
    })
    
};