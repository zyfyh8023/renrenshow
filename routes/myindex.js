"use strict";

var uName, retCode, retDesc;

/* GET home page. */
exports.page = function(req, res, next) {
	var signed;
	if(req.session.user){
		uName = req.session.user.username;
		signed=1;
	}else if(req.params.priId){
		uName=req.params.priId;
		signed=1;
	}else if(req.params.pubId){
		uName=req.params.pubId;
		signed=1;
	}else{
		signed=0;
	}
	
	if(signed){
		res.render('./userIndex/myindex', {
			uName: uName,
			title: '我的网站首页'
		});
	}else{
		res.redirect('/login');
	}
	
};
