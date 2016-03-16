"use strict";
var experiences = require('../../models/experience');
var checkState = require('../checkState');

var retCode, retDesc, uName;

/* GET home page. */
exports.page = function(req, res, next) {

    checkState.myState(req, res, function(rs){
        var obj={
            author: rs.uName,
            experienceTag: 1
        }
        experiences.findAll(obj,function(err,result){
            if(err){
                res.redirect('/error');
            }else{
                if(rs.signed=='1'){
                    res.render('./userBlog2/alluExps', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: '我的博文查看',
                        resul: result
                    });
                }else if(rs.signed=='2'){
                    res.render('./userBlog2/alluExps', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: 'TA的博文查看(特权)',
                        resul: result
                    });
                }else{
                    res.render('./userBlog2/alluExps', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: 'TA的博文查看(普通)',
                        resul: result
                    });
                }
            }
        });
    });
    
};
