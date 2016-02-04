var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

//定义Experience对象模型
var ExperienceSchema = new Schema({
    author: String,
    experienceTitle: String,
    experienceCompany: String,
    experienceCont: String,
    experienceImgs: [],
    experienceTag: Number,
    cTime: {
        type: Date,
        default: Date.now
    },
    uTime: {
        type: Date,
        default: Date.now
    }
});

//访问User对象模型
mongoose.model('Experience', ExperienceSchema);
var Experience = mongoose.model('Experience');
exports.Experience = Experience;

//添加功能
exports.create = function(obj, callback) {
    var newExperience = obj;
    newExperience.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(author, callback) {
    Experience.find({
        author: author
    }, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//条件查找所有结果集
exports.findAll = function(object, callback) {
    Experience.find(object, function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

//删除操作
exports.delete = function(object, callback) {
    Experience.remove(object, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions, updates, options, callback) {
    Experience.update(conditions, updates, options, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//
exports.allNum = function(uName, callFn) {
    async.series([
            function(callback) {
                Experience.find({
                    author: uName,
                    experienceTag: 1
                }, function(err, result) {
                    callback(err, result.length);
                });
            },
            function(callback) {
                Experience.find({
                    author: uName,
                    experienceTag: 2
                }, function(err, result) {
                    callback(err, result.length);
                });
            },
            function(callback) {
                Experience.find({
                    author: uName
                }, function(err, result) {
                    callback(err, result.length);
                });
            }
        ],
        function(error, result) {
            if (error) {
                callFn(err, null);
            } else {
                callFn(null, result);
            }
        }
    );
}

//分页条件查找所有结果集
exports.findAllByCon = function(object,pagenum,skipstep,callback) {
    
    Experience.count(object,function(err, nums){
        if(err){
            callback(err, null, null);
        }else{
            var query = Experience.find(object).skip(skipstep).limit(pagenum).sort('-cTime');
            query.exec(function(err, result) {
                if(err){
                    callback(err, null, null);
                }else{
                    callback(null, result, nums);
                }
            });
        }
    });
    
}
