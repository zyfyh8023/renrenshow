"use strict";
var experiences = require('../../models/experience');
var checkState = require('../checkState');

var retCode, retDesc, uName;

/* GET home page. */
exports.page = function(req, res, next) {

    checkState.myState(req, function(err, rs){
        if(err){
            res.redirect('/error');
        }else{
            var obj={
                author: rs.uName,
                experienceTag: 1
            }
            experiences.findAll(obj,function(err,result){
                if(err){
                    res.redirect('/error');
                }else{
                    if(rs.signed=='2' && rs.uName!=""){
                        res.render('./userBlog2/alluExps', {
                            title: 'TA的博文查看(特权)',
                            resul: result,
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules
                        });
                    }else if(rs.signed=='3' && rs.uName!=""){
                        res.render('./userBlog2/alluExps', {
                            title: 'TA的博文查看(普通)',
                            resul: result,
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules
                        });
                    }else if(rs.signed=='1' && rs.uName!=""){
                        res.render('./userBlog2/alluExps', {
                            title: '我的博文查看',
                            resul: result,
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode
                        });
                    }else{
                        res.redirect('/error');
                    }
                }
            });
        }
    });
    
};
