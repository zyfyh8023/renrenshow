"use strict";
var formidable = require('formidable'),
    fs = require('fs'),
    AVATAR_UPLOAD_FOLDER = '/avatar/';

/* GET pageResume page. */
exports.page = function(req, res, next) {
    res.render('pageResume', {
        title: 'pageResume'
    });
};

/* POST pageResume page. */
exports.doPage = function(req, res, next) {
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024; //文件大小
    form.on("progress", function(bytesRecieved, bytesExpected) {
        var pval = Math.ceil((bytesRecieved / bytesExpected) * 100); //更新进度
    });

    form.parse(req, function(err, fields, files) {
        // if (err) {
        //   res.locals.error = err;
        //   res.render('index', { title: "11111" });
        //   return;   
        // }  

        // var extName = '';  //后缀名
        // switch (files.fulAvatar.type) {
        //   case 'image/pjpeg':
        //     extName = 'jpg';
        //     break;
        //   case 'image/jpeg':
        //     extName = 'jpg';
        //     break;     
        //   case 'image/png':
        //     extName = 'png';
        //     break;
        //   case 'image/x-png':
        //     extName = 'png';
        //     break;     
        // }
        // console.log(extName);
        // console.log(extName.length);
        //  if(extName.length == 0){
        //     res.locals.error = '只支持png和jpg格式图片';
        //     res.render('index', { title: "2222" });
        //     return;          
        // }
        // var avatarName = Math.random() + '.' + extName;
        // var newPath = form.uploadDir + avatarName;
        //    fs.renameSync(files.fulAvatar.path, newPath);  //重命名\
    });

    res.locals.success = '上传成功';
    res.render('index', {
        title: "3333"
    });

};
