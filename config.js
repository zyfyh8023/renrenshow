"use strict";

exports.debug = true;
exports.port = 3000;
exports.email = 'zouya@corp.netease.com';
exports.site_name = '';
exports.site_desc = '';
exports.session_secret = '';

exports.db = 'mongodb://localhost:27017/renrenxiuDB';

exports.dbSession =  { 
	cookieSecret: 'renrenshow', 
	db: 'renrenxiuDB', 
	host: 'localhost'
};