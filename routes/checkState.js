"use strict";
var url = require('url');
var async = require('async');
var setings = require('../models/setting');
var privateSetings = require('../models/privateSeting');

exports.checkLogin = function(req, res, next) {
	if (!req.session.user) {
		return res.redirect('/login');
	}
	next();
}

exports.checkNotLogin = function(req, res, next) {
	if (req.session.user) {
		return res.redirect('/myindex');
	}
	next();
}

exports.myState = function(req, callbackFn){
	var urls=url.parse(req.url, true).query;

	var signed=0, uName="", modules=[], objs={};

	async.series(
		[	
			function(callback) {
            	if(req.session.user){
					uName = req.session.user.username;
					signed=1;
					objs={
						signed: signed,
						uName: uName,
						modules: modules
					};
				}
				callback(null, objs);
            },
            function(callback) {
            	if(urls.pubId){
					setings.findByUname(urls.pubId, function(err, results) {
						if (err) {
							callback(err, null);
						} else {
							if (results) {
								signed=3; 
								uName=urls.pubId;
								modules=results.allModels;
								objs={
									signed: signed,
									uName: uName,
									modules: modules
								};
							} 
							callback(null, objs);
						}
					});
				}else{
					callback(null, objs);
				}
            },
            function(callback) {
            	if(urls.priId && urls.vCode){
					privateSetings.findByUname(urls.priId, function(err, results) {
						if (err) {
							callback(err, null);
						} else {
							if (results) {
								for(var i=0,k=results.allModels.length; i<k; i++){
									if(results.allModels[i].status=='1' && results.allModels[i].vCode==urls.vCode){
										modules=results.allModels[i].moduleCon;
										signed=2;
										uName=urls.priId;
										objs={
											signed: signed,
											uName: uName,
											modules: modules
										};
										break;
									}
								}
							}
							callback(null, objs);
						}
					});
				}else{
					callback(null, objs);
				}
            }
        ],
        function(err2, signed2) {
            if (err2) {
                callbackFn(err2, null);
            } else {
                callbackFn(null, signed2[2]);
            }
        }
    );
	
}
