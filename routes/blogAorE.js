"use strict";
var articles = require('../models/article');
var experiences = require('../models/experience');
var url = require('url');

var retCode, retDesc, uName;

/* GET home page. */
exports.artSee = function(req, res, next) {
	var urls=url.parse(req.url, true).query,
		aid=urls.aid;

	articles.findAll({
		_id: aid
	}, function(err, resul){
		if(err){

		}else{
			if(resul){
				console.log(resul);
				res.render('blog_art', {
					title: '博文查看',
					resul: resul[0]
				});
			}else{

			}
		}
	})

};

/* GET home page. */
exports.expSee = function(req, res, next) {

	res.render('blog_exper', {
		title: '面经查看'
	});
};
