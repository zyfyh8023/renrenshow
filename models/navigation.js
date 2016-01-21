var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Navigation对象模型
var NavigationSchema = new Schema({
    author: {
        type: String,
        unique: true
    },
    models: [
        {
            modelsName: String,
            maoName: String,
            createTime: {
                type: Date,
                default: Date.now
            },
            updateTime: {
                type: Date,
                default: Date.now
            },
            modelsuns: [
                {
                    sunDesc: String,
                    sunName: String,
                    sunUrl: String
                }
            ]
        }
    ]
});

//访问User对象模型
mongoose.model('Navigation', NavigationSchema);
var Navigation = mongoose.model('Navigation');
exports.Navigation = Navigation;

//添加功能
exports.create = function(obj, callback) {
    var newNavigation = obj;
    newNavigation.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(author, callback) {
    Navigation.findOne({
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
    Navigation.find(object, function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

//删除操作
exports.delete = function(object, callback) {
    Navigation.remove(object, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions, updates, options, callback) {
    Navigation.update(conditions, updates, options, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}
