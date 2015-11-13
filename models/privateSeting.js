var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Setting对象模型
var privateSetingSchema = new Schema({
    author: { type:String, unique: true },
    allModels:[
        {
            modelNam:String,
            sunModels:[
                {
                    sunNam:String,
                    sunYesNo:Number
                }
            ]
        }
    ],
    cTime: { type: Date, default: Date.now },  
    uTime: { type: Date, default: Date.now }
});

//访问User对象模型
mongoose.model('privateSetting', privateSetingSchema);
var privateSetting = mongoose.model('privateSetting');   //作用是什么？   下面所有的new User 既是如此
exports.privateSetting=privateSetting;

//添加功能
exports.create = function(obj,callback) {
    var newprivateSetting = obj;
    newprivateSetting.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(author,callback) {
    privateSetting.findOne({author:author},function(err,result){
        if(err){
            callback(err,null);
        }else
        {
            console.log(result);
            callback(null,result);
        }
    });
}

//条件查找所有   结果集
exports.findAll = function(object,callback) {
    privateSetting.find(object,function(err,result){
        if(err){
            callback(err);
        }else
        {
            callback(null,result);
        }
    });
}

//删除操作
exports.delete = function(object,callback) {
    privateSetting.remove(object,function(err){
        if(err){
            callback(err);
        }else
        {
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions,updates,options,callback) {
    privateSetting.update(conditions,updates,options,function(err){
        if(err){
            callback(err);
        }else
        {
            callback(null);
        }
    });
}