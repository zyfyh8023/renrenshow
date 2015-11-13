var mongoose = require('mongoose');
var dburl = require("../config").db;//数据库地址

var Schema = mongoose.Schema;

exports.connect = function(callback) {
    mongoose.connect(dburl);
}

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}

exports.setup = function(callback) { callback(null); }