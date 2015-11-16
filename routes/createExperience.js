"use strict";

var experiences = require('../models/experience');

var retCode, retDesc, uName;

/* GET createExperience page. */
exports.page=function(req, res, next) {
    res.render('createExperience', { title: '写面经' });
};

/* POST createExperience page. */
exports.doPage=function(req, res, next) {
 	  uName = req.session.user.username;    //session的时间问题
    var experienceTitle = req.body.experienceTitle.trim() || '',
        experienceCompany = req.body.experienceCompany.trim() || '',
        experienceTag = req.body.tags || 0,
        experienceLink = req.body.experienceLink.trim() || '',
        experienceCont = req.body.experienceCont.trim() || '';

    var newExperience = new experiences.Experience({
        author: uName,
        experienceTitle: experienceTitle,
        experienceCompany: experienceCompany,
        experienceTag: experienceTag,
        experienceLink: experienceLink,
        experienceCont: experienceCont
    });

    //如果不存在则新增用户
    experiences.create(newExperience,function (err) {
        if(err){
            retDesc="保存失败,请稍后再试!";
            return res.send({retCode:400, retDesc:retDesc});
        }else{
            return res.send({retCode:200});
        }
    });

}