"use strict";

var retDesc, retCode, uName;
 //  GET myError page. 
exports.page=function(req, res, next){
	retDesc = req.query.retDesc;
	uName=req.session.user.username;

	res.render('myError', { 
		title: '错误页面',
		uName: uName,
		retDesc:retDesc
	});
}