"use strict";
var users = require('../models/users');

var retCode, retDesc, uName;

/* GET home page. */
exports.page = function(req, res, next) {

	if(req.session.user){
		uName = req.session.user.username;
	}else{
		uName = '';
	}

	users.findAll({}, function(err, result) {
		if (err) {
			res.redirect('/error');
		}else{
			console.log(result);
			res.render('talentpool', {
				title: '人才库-人人秀',
				uName: uName,
				results: result 
			});
		}
	});

	
};
