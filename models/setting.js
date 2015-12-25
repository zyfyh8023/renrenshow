var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Setting对象模型
var SettingSchema = new Schema({
    author: {
        type: String,
        unique: true
    },
    allModels: [{
        modelNam: String,
        sunModels: [{
            sunNam: String,
            sunYesNo: Number
        }]
    }],
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
mongoose.model('Setting', SettingSchema);
var Setting = mongoose.model('Setting');
exports.Setting = Setting;

//添加功能
exports.create = function(obj, callback) {
    var newSetting = obj;
    newSetting.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(author, callback) {
    Setting.findOne({
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
    Setting.find(object, function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

//删除操作
exports.delete = function(object, callback) {
    Setting.remove(object, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions, updates, options, callback) {
    Setting.update(conditions, updates, options, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}
