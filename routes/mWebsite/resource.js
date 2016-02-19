"use strict";

var checkState = require('../checkState');
var articles = require('../../models/article');
var experiences = require('../../models/experience');
var async = require('async');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req);

	getBlogComs(function(err, resul){
		if(err){
			res.redirect('/error');
		}else{
			var artsnum=resul[0].length>0 ? (resul[0].length>=8 ? 8 : resul[0].length) : 0;
			var expsnum=resul[1].length>0 ? (resul[1].length>=8 ? 8 : resul[1].length) : 0;
			res.render('resource', {
				title: '资源库-人人秀',
				uName: uName,
				cssFils:['resource'],
				arts: resul[0],
				artsnum: artsnum,
				exps: resul[1],
				expsnum: expsnum
			});
		}
	})
	
};


function getBlogComs(callFn) {
    async.series([
            function(callback) {
                articles.findAll({
                    articleTag:1,
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                experiences.findAll({
                    experienceTag: 1,
                }, function(err, results) {
                    callback(err, results);
                });
            }
        ],
        function(error, result) {
            if (error) {
                callFn(error, null);
            } else {
                callFn(null, result);
            }
        }
    );
}