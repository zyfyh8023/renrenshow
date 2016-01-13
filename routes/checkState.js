"use strict";
var url = require('url');
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

exports.myState = function(req, signed, uName, callback){
	var urls=url.parse(req.url, true).query;
	var modules={};

	signed=0; uName="";

	if(urls.pubId){
		setings.findByUname(urls.pubId, function(err, results) {
			if (err) {
				res.redirect('myError?retDesc=500');
			} else {
				if (results) {
					signed=3; uName=urls.pubId;
				} 
			}
		});
	}

	if(urls.priId && urls.vCode){
		privateSetings.findByUname(urls.priId, function(err, results) {
			if (err) {
				res.redirect('myError?retDesc=500');
			} else {
				if (results) {
					for(var i=0,k=results.priLinks.length; i<k; i++){
						if(results.priLinks[i].urlVcode==urls.vCode){
							modules=results.allModels[i];
							signed=2;
							uName=urls.priId;
						}
					}
				} 
			}
		});
	}

	if(req.session.user){
		uName = req.session.user.username;
		signed=1;
	}

	callback(signed, uName, modules);
}