"use strict";
var users = require('../models/users');

var fs = require('fs')
    , multiparty = require('multiparty');

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
    var uName=req.session.user.username;
    users.findByUname(uName,function(err, result){
        if(err){
            console.log('no this user:'+uName);
        }else{
            var tempUser=result[0];
            res.render('introduction', { title: '自我介绍',rs: tempUser});
        }
    });

};

exports.doPage=function(req, res, next) {
    var uName=req.session.user.username;
    //生成multiparty对象，并配置下载目标路径
    var form = new multiparty.Form({uploadDir: './public/avatar/'});
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);
            if(err){
                console.log('parse error: ' + err);
                res.end('1');
            } else {
                console.log('parse files: ' + filesTmp);
                var inputFile = files.inputFile[0];
                var uploadedPath = inputFile.path;
                var dstPath = './public/avatar/' + inputFile.originalFilename;
                var imgSize=inputFile.size;
                if (imgSize > 2*1024*1024) {
                    res.end('2');
                }
                var imgType=inputFile.headers['content-type'];
                if(imgType.split('/')[0]!='image'){
                    res.end('3');
                }
                //重命名为真实文件名
                if(!uName){
                    res.end('1');
                }
                var imgPath='./public/avatar/'+uName+'specialImg.jpg',
                    imgSrc='/avatar/'+uName+'specialImg.jpg';
                fs.rename(uploadedPath, imgPath, function(err) {
                    if(err){
                        console.log('rename error: ' + err);
                        res.end('4');
                    } else {
                        users.modify({"username":uName},{$set : {
                            uimg : imgSrc,
                            uinstrc : fields.majorinstr2[0]
                        }},function (err) {
                            if (err) {
                                res.end('1');
                            }else{
                              res.end('5');
                            }
                        });
                    }
                });
            }
    });

};

