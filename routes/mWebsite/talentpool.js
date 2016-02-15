"use strict";

var checkState = require('../checkState');
var users = require('../../models/users');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req);

	users.findAll({}, function(err, result) {
		if (err) {
			res.redirect('/error');
		}else{
			console.log(result);
			res.render('talentpool', {
				title: '人才库-人人秀',
				uName: uName,
				results: result ,
				cssFils:['talentpool']
			});
		}
	});
	
};
