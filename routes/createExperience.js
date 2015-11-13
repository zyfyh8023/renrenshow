"use strict";

var experiences = require('../models/experience');

/* GET createExperience page. */
exports.page=function(req, res, next) {
  res.render('createExperience', { title: '写面经' });
};

/* POST createExperience page. */
exports.doPage=function(req, res, next) {
 	var author = req.session.user.username,    //session的时间问题
        experienceTitle = req.body.experienceTitle || '',
        experienceCompany = req.body.experienceCompany || '',
        experienceTag = req.body.tags || 0,
        experienceLink = req.body.experienceLink || '',
        experienceCont = req.body.experienceCont || '';

    var newExperience = new experiences.Experience({
        author: author,
        experienceTitle: experienceTitle,
        experienceCompany: experienceCompany,
        experienceTag: experienceTag,
        experienceLink: experienceLink,
        experienceCont: experienceCont
    });

     //如果不存在则新增用户
     experiences.create(newExperience,function (err) {
        if (err) {
                errorTip="面经新建失败!";
                console.log(errorTip);
                res.redirect('myError');
           }else{
            console.log(newExperience);
             res.render('createExperience', { title: '写面经' });
         }
    });

}