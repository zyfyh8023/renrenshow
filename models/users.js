var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义User对象模型
var UserSchema = new Schema({
    username: { type:String, unique: true },
    password: String,
    uimg: String,
    uinstrc: String,
    create_date:{type:Date,default:Date.now},
    update_date:{type:Date,default:Date.now}
});

//访问User对象模型
mongoose.model('User', UserSchema);
var User = mongoose.model('User');   
exports.User=User;


//添加新的user
exports.createUser = function(userObj,callback) {
    var newUser = userObj;
    newUser.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(uName,callback) {
    User.findOne({username:uName},function(err,result){
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
}

//根据用户名查找   
exports.findByUnameAndPwd = function(uName,pwd,callback) {
    User.findOne({username:uName,password:pwd},function(err,result){
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
}

//条件查找所有的结果集
exports.findAll = function(object,callback) {
    User.find(object,function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
}

//分页条件查找所有的结果集
exports.findAllByCon = function(object,pagenum,skipstep,callback) {
var query = User.find(object).sort('create_date').skip(skipstep).limit(pagenum).sort('-create_date');
    query.exec(function(err, result) {
        if(err){
            callback(err);
        }else{
            User.count(object, function(error, allnum) {
                if(error){
                    callback(error);
                }else{
                    callback(null, result, allnum);
                }
            });
         }
    });
}

//删除操作
exports.delete = function(object,callback) {
    User.remove(object,function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions,updates,callback) {
    User.update(conditions,updates,function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    });
}