"use strict";

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
