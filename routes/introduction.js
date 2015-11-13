"use strict";
var users = require('../models/users');
var fs = require('fs'),
    multiparty = require('multiparty');

var retCode, retDesc, uName;

function getDate(date) {
    var Y = date.getFullYear();
    var M = date.getMonth()+1;
    if (M < 10) M = '0' + M;
    var D = date.getDate();
    if (D < 10) D = '0' + D;
    var h = date.getHours();
    if (h < 10) h = '0' + h;
    var m = date.getMinutes();
    if (m < 10) m = '0' + m;
    var s = date.getSeconds();
    if (s < 10) s = '0' + s;
    return (Y+'-'+M+'-'+D+' '+h+':'+m+':'+s);
}

exports.page=function(req, res, next) {
    uName=req.session.user.username;
    users.findByUname(uName,function(err, result){
        if(err){
            retDesc="用户查找失败！";
            return res.send({retCode:400, retDesc:retDesc});
        }else{
            res.render('introduction', { title: '自我介绍',rs: result});
        }
    });
};

exports.doPage=function(req, res, next) {
    uName=req.session.user.username;
    //生成multiparty对象，并配置下载目标路径
    var form = new multiparty.Form({uploadDir: './public/avatar/'});
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);
        if(err){
            retDesc ='parse error: ' + err;
            return res.send({retCode:400,retDesc:retDesc});
        } else {
            var inputFile = files.inputFile[0],
                uploadedPath = inputFile.path,
                dstPath = './public/avatar/' + inputFile.originalFilename,
                imgSize = inputFile.size;
            if (imgSize > 2*1024*1024) {
                retDesc = '图片过大！';
                return res.send({retCode:400,retDesc:retDesc});
            }
            var imgType=inputFile.headers['content-type'];
            if(imgType.split('/')[0] !='image'){
                retDesc ='只允许上传图片哦~';
                return res.send({retCode:400,retDesc:retDesc});
            }
            //重命名为真实文件名
            var imgPath ='./public/avatar/'+uName+'specialImg.jpg',
                imgSrc ='/avatar/'+uName+'specialImg.jpg';
            fs.rename(uploadedPath, imgPath, function(err) {
                if(err){
                    retDesc ='重命名错误！';
                    return res.send({retCode:400,retDesc:retDesc});
                }else {
                    users.modify({"username":uName},{$set : {
                        uimg : imgSrc,
                        uinstrc : fields.majorinstr2[0]
                    }},function (err) {
                        if (err) {
                            retDesc = err;
                            return res.send({retCode:400,retDesc:retDesc});
                        }else{
                          return res.send({retCode:200});
                        }
                    });
                }
            });
        }
    });
};

