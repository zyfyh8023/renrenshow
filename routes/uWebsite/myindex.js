"use strict";
var checkState = require('../checkState');
var resume = require('../../models/resume');
var article = require('../../models/article');
var experience = require('../../models/experience');
var async = require('async');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	checkState.myState(req, function(err, rs){
		//   http://localhost:3000/myindex?pubId=zf@163.com
		//   http://localhost:3000/myindex?priId=zf@163.com&vCode=1455439672628
		if(err){
			res.redirect('/error');
		}else{
			console.log(rs.modules);
			if(rs.signed=='2' && rs.uName!=""){   
                getindexCon(rs.uName, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                        var num0=results[0].Certificate6.length>0 ? (results[0].Certificate6.length>=4 ? 4 : results[0].Certificate6.length) : 0;
                        var num1=results[1].length>0 ? (results[1].length>=6 ? 6 : results[1].length) : 0;
                        var num2=results[2].length>0 ? (results[2].length>=6 ? 6 : results[2].length) : 0;
                        var num3=results[3].length>0 ? (results[3].length>=3 ? 3 : results[3].length) : 0;
                        var num4=results[4].length>0 ? (results[4].length>=3 ? 3 : results[4].length) : 0;
                        var num5=results[5].length>0 ? (results[5].length>=3 ? 3 : results[5].length) : 0;
                        res.render('./userIndex/myindex', {
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            title: 'TA的网站首页(特权)',
                            cssFils:['userIndex/myindex'],
                            jsFils:['userIndex/myindex'],
                            comArt4: results[5],
                            num5: num5,
                            comArt3: results[4],
                            num4: num4,
                            comArt2: results[3],
                            num3: num3,
                            comArt1: results[2],
                            num2: num2,
                            comExps: results[1],
                            num1: num1,
                            comAwards: results[0].Certificate6,
                            num0: num0,
                            modules: rs.modules
                        });
                    }
                });
			}else if(rs.signed=='3' && rs.uName!=""){    
				getindexCon(rs.uName, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                        var num0=results[0].Certificate6.length>0 ? (results[0].Certificate6.length>=4 ? 4 : results[0].Certificate6.length) : 0;
                        var num1=results[1].length>0 ? (results[1].length>=6 ? 6 : results[1].length) : 0;
                        var num2=results[2].length>0 ? (results[2].length>=6 ? 6 : results[2].length) : 0;
                        var num3=results[3].length>0 ? (results[3].length>=3 ? 3 : results[3].length) : 0;
                        var num4=results[4].length>0 ? (results[4].length>=3 ? 3 : results[4].length) : 0;
                        var num5=results[5].length>0 ? (results[5].length>=3 ? 3 : results[5].length) : 0;
                        res.render('./userIndex/myindex', {
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            title: 'TA的网站首页(普通)',
                            cssFils:['userIndex/myindex'],
                            jsFils:['userIndex/myindex'],
                            comArt4: results[5],
                            num5: num5,
                            comArt3: results[4],
                            num4: num4,
                            comArt2: results[3],
                            num3: num3,
                            comArt1: results[2],
                            num2: num2,
                            comExps: results[1],
                            num1: num1,
                            comAwards: results[0].Certificate6,
                            num0: num0,
                            modules: rs.modules
                        });
                    }
                });
			}else if(rs.signed=='1' && rs.uName!=""){   
				getindexCon(rs.uName, function(err, results){
                    if(err){
                        res.redirect('/error');
                    }else{
                    	var num0=results[0].Certificate6.length>0 ? (results[0].Certificate6.length>=4 ? 4 : results[0].Certificate6.length) : 0;
                    	var num1=results[1].length>0 ? (results[1].length>=6 ? 6 : results[1].length) : 0;
                    	var num2=results[2].length>0 ? (results[2].length>=6 ? 6 : results[2].length) : 0;
                    	var num3=results[3].length>0 ? (results[3].length>=3 ? 3 : results[3].length) : 0;
                    	var num4=results[4].length>0 ? (results[4].length>=3 ? 3 : results[4].length) : 0;
                        var num5=results[5].length>0 ? (results[5].length>=3 ? 3 : results[5].length) : 0;
                    	res.render('./userIndex/myindex', {
                    		uName: rs.uName,
                    		signed: rs.signed,
                    		vCode: rs.vCode,
                    		title: '我的网站首页',
                    		cssFils:['userIndex/myindex'],
                    		jsFils:['userIndex/myindex'],
                            comArt4: results[5],
                            num5: num5,
                    		comArt3: results[4],
                    		num4: num4,
                    		comArt2: results[3],
                    		num3: num3,
                            comArt1: results[2],
                            num2: num2,
                    		comExps: results[1],
                    		num1: num1,
                    		comAwards: results[0].Certificate6,
                    		num0: num0
                    	});
                    }
                });
			}else{    //错误页面
				 res.redirect('/error');
			}
		}
		
	});

};


function getindexCon(uName, callFn) {
    async.series([
            function(callback) {
                resume.findByUname(uName, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                experience.findAll({
                    experienceTag:1,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                article.findAll({
                    articleType:4,
                    articleTag:1,
                    author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                article.findAll({
                	articleType:1,
                   	articleTag:1,
                   	author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                article.findAll({
                	articleType:2,
                   	articleTag:1,
                   	author:uName
                }, function(err, results) {
                    callback(err, results);
                });
            },
            function(callback) {
                article.findAll({
                    articleType:3,
                    articleTag:1,
                    author:uName
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