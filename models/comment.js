var mongoose = require('mongoose');
var async = require('async');
var Schema = mongoose.Schema;

//定义Comment对象模型
var CommentSchema = new Schema({
    author: String,
    authorImg: String,
    CommentCont: String,
    CommentArt: String,
    CommentExp: String,
    artAuthor: String,
    CommentTag1: Number,
    CommentTag2: Number,
    CommentTag3: Number,
    cTime: {
        type: Date,
        default: Date.now
    },
});

//访问User对象模型
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');
exports.Comment = Comment;

//添加功能
exports.create = function(obj, callback) {
    var newComment = obj;
    newComment.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(author, callback) {
    Comment.find({
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
    Comment.find(object, function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

//条件查找所有结果集
exports.findAll2 = function(object, start, pageSize, callback) {
    Comment.find(object).skip(start).limit(pageSize).exex(function(err, datas) {
        if (err) {
            callback(err);
        } else {
            callback(null, datas);
        }
    });
}

//删除操作
exports.delete = function(object, callback) {
    Comment.remove(object, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions, updates, options, callback) {
    Comment.update(conditions, updates, options, function(err) {
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
                Comment.find({
                    author: uName,
                }, function(err, result) {
                    callback(err, result.length);
                });
            },
            function(callback) {
                Comment.find({
                    artAuthor: uName
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
    
    Comment.count(object,function(err, nums){
        if(err){
            callback(err, null, null);
        }else{
            var query = Comment.find(object).skip(skipstep).limit(pagenum).sort('-cTime');
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
