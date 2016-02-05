"use strict";
var users = require('../models/users');
var fs = require('fs'),
    multiparty = require('multiparty');

var retCode, retDesc, uName, navTitle, navDesc, cssFils, jsFils;

exports.page = function(req, res, next) {
    uName = req.session.user.username;
    navTitle = "个性自我介绍";
    navDesc = "自我介绍是向别人展示你自己的一个重要手段，也是日常工作中与陌生人建立关系、" +
        "打开局面的一种非常重要的手段，本文为大家带来关于有经验的保安队长自我介绍。";

    users.findByUname(uName, function(err, result) {
        if (err) {
            return res.send({ retCode: 400,retDesc: '用户查找失败！'});
        } else {
            res.render('./userIntroduc/introduction', {
                title: '自我介绍',
                uName: uName,
                navTitle: navTitle,
                navDesc: navDesc,
                rs: result,
                cssFils:['userIntroduc/introduction'],
                jsFils:['userIntroduc/introduction']
            });
        }
    });
    
};

exports.doPage = function(req, res, next) {
    uName = req.session.user.username;
    var form = new multiparty.Form({
        uploadDir: './public/upload/userimgs/'
    });
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            return res.send({retCode: 400,retDesc: err});
        } else {
            if(files.inputFile || fields.majorinstr2[0]){
                if(files.inputFile){
                    var inputFile = files.inputFile[0],
                        uploadedPath = inputFile.path,
                        dstPath = './public/upload/userimgs/' + inputFile.originalFilename,
                        imgSize = inputFile.size;
                    if (imgSize > 2 * 1024 * 1024) {
                        return res.send({retCode: 400,retDesc: '图片过大！'});
                    }
                    var imgType = inputFile.headers['content-type'];
                    if (imgType.split('/')[0] != 'image') {
                        return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
                    }
                    var imgPath = './public/upload/userimgs/' + uName + '_specialImg.jpg',
                        imgSrc = '/upload/userimgs/' + uName + '_specialImg.jpg';
                    fs.rename(uploadedPath, imgPath, function(err) {
                        if (err) {
                            return res.send({retCode: 400,retDesc: '重命名错误！'});
                        } else {
                            var newObj;
                            if(fields.majorinstr2[0]){
                                newObj={
                                    uimg: imgSrc,
                                    uinstrc: fields.majorinstr2[0]
                                };
                            }else{
                                newObj={
                                    uimg: imgSrc,
                                }
                            }
                            users.modify({"username": uName}, {
                                $set: newObj
                            }, function(err) {
                                if (err) {
                                    return res.send({retCode: 400,retDesc: err});
                                } else {
                                    return res.send({retCode: 200});
                                }
                            });
                        }
                    });
                }else{
                    users.modify({"username": uName}, {
                        $set: {
                            uinstrc: fields.majorinstr2[0]
                        }
                    }, function(err) {
                        if (err) {
                            return res.send({retCode: 400,retDesc: err});
                        } else {
                            return res.send({retCode: 200});
                        }
                    });
                }
            }
        }
    });
};
