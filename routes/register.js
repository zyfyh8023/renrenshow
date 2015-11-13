"use strict";

var crypto = require('crypto');  
var users = require('../models/users');

var retDesc, uName, retCode;

//GET register page. 
exports.page=function(req, res, next){
	res.render('register', { title: '注册' });
}

//POST register page 
exports.doRegister= function (req, res, next) {
    var username = req.body.username.trim() || '',
        password = req.body.password.trim() || '',
        repassword = req.body.repassword.trim() || '';
  
    //检验用户两次输入的密码是否一致
    if(repassword != password){ 
        retDesc='两次输入的密码不一致！';
        return res.send({retCode:400, retDesc:retDesc});
    }

    //加密
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    var newUser = new users.User({
        username: username,
        password: password
    });

    //检查用户名是否已经存在 
    users.findByUname(username,function(err, result){
        if(err){
            retDesc='用户名查找出现故障，请稍后再试！';
            return res.send({retCode:400, retDesc:retDesc});   
        }else{
            if(result){
                retDesc='用户名已存在，请更换其它的用户名吧！';
                return res.send({retCode:400, retDesc:retDesc});   
            }else{
                //如果不存在则新增用户
                users.create(username,password,function (err) {
                    if (err) {
                        retDesc='信息保存出现故障，请稍后再试！';
                        return res.send({retCode:400, retDesc:retDesc});   
                    }else{
                        return res.send({retCode:200});    
                    }
                });
            }
        }
    });

};

// http://www.tuicool.com/articles/YRrYvqm
// http://www.cnblogs.com/yupeng/p/3482271.html