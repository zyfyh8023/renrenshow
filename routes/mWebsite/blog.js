"use strict";

var checkState = require('../checkState');
var articles = require('../../models/article');
var async = require('async');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	uName=checkState.loginState(req, res, false);

	getBlogComs(function(err, resul){
		if(err){
			res.redirect('/error');
		}else{
			var artsnum1=resul[0].length>0 ? (resul[0].length>=20 ? 20 : resul[0].length) : 0;
            var artsnum2=resul[1].length>0 ? (resul[1].length>=20 ? 20 : resul[1].length) : 0;
			res.render('blog', {
				title: '博文-人人秀',
				uName: uName,
				cssFils:['resource'],
				arts1: resul[0],
                arts2: resul[1],
				artsnum1: artsnum1,
                artsnum2: artsnum2
			});
		}
	})

};


function getBlogComs(callFn) {
    async.series([
            function(callback) {
                articles.findAll({
                    articleTag:1,
                    articleType: '1'
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                articles.findAll({
                    articleTag:1,
                    articleType: '2'
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