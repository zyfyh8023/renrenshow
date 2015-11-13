"use strict";


exports.checkLogin=function(req, res, next){
  if(!req.session.user){
    return res.render('/login', {message: '用户未登录！'});    //这些无措处理，以及信息提示的待后期处理
  }
  next();
}

exports.checkNotLogin=function(req,res,next){
  if(req.session.user){
   return res.render('/', {message: '用户已经登录！'});    //这些无措处理，以及信息提示的待后期处理
  }
  next();
}