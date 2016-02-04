var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

//定义Article对象模型
var ArticleSchema = new Schema({
    author: String,
    articleTitle: String,
    articleKeyword: String,
    articleAbstract: String,
    articleCont: String,
    articleImgs: [],
    articleType: Number,
    articleTag: Number,
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
mongoose.model('Article', ArticleSchema);
var Article = mongoose.model('Article');
exports.Article = Article;

//添加功能
exports.create = function(obj, callback) {
    var newArticle = obj;
    newArticle.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(author, callback) {
    Article.find({
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
    Article.find(object, function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

//条件查找所有结果集
exports.findAll2 = function(object, start, pageSize, callback) {
    Article.find(object).skip(start).limit(pageSize).exex(function(err, datas) {
        if (err) {
            callback(err);
        } else {
            callback(null, datas);
        }
    });
}

//删除操作
exports.delete = function(object, callback) {
    Article.remove(object, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions, updates, options, callback) {
    Article.update(conditions, updates, options, function(err) {
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
                Article.find({
                    author: uName,
                    articleTag: 1
                }, function(err, result) {
                    callback(err, result.length);
                });
            },
            function(callback) {
                Article.find({
                    author: uName,
                    articleTag: 2
                }, function(err, result) {
                    callback(err, result.length);
                });
            },
            function(callback) {
                Article.find({
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
    
    Article.count(object,function(err, nums){
        if(err){
            callback(err, null, null);
        }else{
            var query = Article.find(object).skip(skipstep).limit(pagenum).sort('-cTime');
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
