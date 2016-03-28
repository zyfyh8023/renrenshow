"use strict";
var articles = require('../../models/article');
var checkState = require('../checkState');
var url = require('url');

var retCode, retDesc, uName;

/* GET home page. */
exports.page = function(req, res, next) {
    var urls=url.parse(req.url, true).query,
        typ=parseInt(urls.typ),
        obj={};

    if(typ=='1'){
        obj.articleType={$in: ['01','02','03','04','05','06']};
    }else if(typ=='2'){
        obj.articleType='11';
    }else if(typ=='3'){
        obj.articleType='21';
    }else if(typ=='4'){
        obj.articleType='91';
    }else{
        res.redirect('/error');
    }

    checkState.myState(req, res, function(rs){

        obj.author=rs.uName;
        obj.articleTag=1;
        articles.findAllByCon(obj,10,0,function(err, results, nums){
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
                    res.render('./userBlog2/alluArts', {
                        uName: rs.uName,
                        signed: rs.signed,
                        vCode: rs.vCode,
                        modules: rs.modules,
                        title: '我的博文查看',
                        nums: nums,
                        showpagetip: showpagetip, 
                        allpage: allpage,
                        resul: results,
                        typ: typ,
                        jsFils:['userBlog2/allArts']
                    });
                }else if(rs.signed=='2'){
                    if(typ=='3'){
                        checkState.yesOrNo(res, rs, 3, 2, 1, function(){
                            res.render('./userBlog2/alluArts', {
                                uName: rs.uName,
                                signed: rs.signed,
                                vCode: rs.vCode,
                                modules: rs.modules,
                                title: 'TA的博文查看(特权)',
                                nums: nums,
                                showpagetip: showpagetip, 
                                allpage: allpage,
                                resul: results,
                                typ: typ,
                                jsFils:['userBlog2/allArts']
                            });
                        })
                    }
                    if(typ=='4'){
                        checkState.yesOrNo(res, rs, 3, 4, 1, function(){
                            res.render('./userBlog2/alluArts', {
                                uName: rs.uName,
                                signed: rs.signed,
                                vCode: rs.vCode,
                                modules: rs.modules,
                                title: 'TA的博文查看(特权)',
                                nums: nums,
                                showpagetip: showpagetip, 
                                allpage: allpage,
                                resul: results,
                                typ: typ,
                                jsFils:['userBlog2/allArts']
                            });
                        })
                    }
                }else{
                    if(typ=='3'){
                        checkState.yesOrNo(res, rs, 3, 2, 1, function(){
                            res.render('./userBlog2/alluArts', {
                                uName: rs.uName,
                                signed: rs.signed,
                                vCode: rs.vCode,
                                modules: rs.modules,
                                title: 'TA的博文查看(普通)',
                                nums: nums,
                                showpagetip: showpagetip, 
                                allpage: allpage,
                                resul: results,
                                typ: typ,
                                jsFils:['userBlog2/allArts']
                            });
                        })
                    }
                    if(typ=='4'){
                        checkState.yesOrNo(res, rs, 3, 4, 1, function(){
                            res.render('./userBlog2/alluArts', {
                                uName: rs.uName,
                                signed: rs.signed,
                                vCode: rs.vCode,
                                modules: rs.modules,
                                title: 'TA的博文查看(普通)',
                                nums: nums,
                                showpagetip: showpagetip, 
                                allpage: allpage,
                                resul: results,
                                typ: typ,
                                jsFils:['userBlog2/allArts']
                            });
                        })
                    }
                }
            }
        });
	});

};


exports.allartPS = function(req, res){
    var curstep=req.body.curstep-1,
        pagenum=10,
        skipstep=curstep*pagenum,
        articleTag='1',
        typ=req.body.typ,
        uName=req.body.uName,
        object={};
    
    if(typ=='1'){
        object.articleType={$in: ['01','02','03','04','05','06']};
    }else if(typ=='2'){
        object.articleType='11';
    }else if(typ=='3'){
        object.articleType='21';
    }else if(typ=='4'){
        object.articleType='91';
    }else{
        res.redirect('/error');
    }
    object.articleTag=articleTag;
    object.author=uName;
    
    articles.findAllByCon(object,pagenum,skipstep,function(err, results, nums){
        if(err){
            console.log('err');
        }else{
            res.send({allArticles: results, nums: nums}); 
        }
    })
    
};
