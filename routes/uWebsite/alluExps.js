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

        experiences.findAllByCon(obj,10,0,function(err, results, nums){
            if(err){
                res.redirect('/error');
            }else{
                var showpagetip, allpage;
                allpage=Math.ceil(nums/10);
                if(allpage>9){
                    showpagetip=9;
                }else{
                    showpagetip=allpage;
                }

                if(rs.signed=='1'){
                    res.render('./userBlog2/alluExps', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: '我的面经查看',
                        nums: nums,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        resul: results,
                        jsFils:['userBlog2/allExps']
                    });
                }else if(rs.signed=='2'){
                    checkState.yesOrNo(res, rs, 3, 3, 1, function(){
                        res.render('./userBlog2/alluExps', {
                            uName: rs.uName,
                            signed: rs.signed,
                            vCode: rs.vCode,
                            modules: rs.modules,
                            title: 'TA的面经查看(特权)',
                            nums: nums,
                            showpagetip: showpagetip, 
                            allpage: allpage,
                            resul: results,
                            jsFils:['userBlog2/allExps']
                        });
                    })
                }else{
                    res.render('./userBlog2/alluExps', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: 'TA的面经查看(普通)',
                        nums: nums,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        resul: results,
                        jsFils:['userBlog2/allExps']
                    });
                }
            }
        });
    });
    
};


exports.allexpPS = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=10,
        skipstep=curstep*pagenum,
        uName=req.body.uName,
        object={};
   
        object={
            experienceTag: '1',
            author: uName
        };
    
    experiences.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            console.log('err');
        }else{
            res.send({allArticles: results, nums: nums}); 
        }
    })
    
};