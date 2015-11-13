"use strict";
var resume = require('../models/resume');
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

/* GET Seting page. */
exports.page=function(req, res, next) {
	var uName=req.session.user.username;
	resume.findByUname(uName,function(err,rs){
		if(err){
 			res.redirect('/');
		}else{
			console.log(rs[0]);
 			res.render('resume', { title: '我的简历',rs: rs[0]});
		}
	});
};

//baseInfo -change
exports.baseinfo=function(req, res, next) {
	var uName=req.session.user.username;
	var form = new multiparty.Form({uploadDir: './public/avatar/'});
	form.parse(req, function(err, fields, files) {
	    var filesTmp = JSON.stringify(files,null,2);
	        if(err){
	            res.end('1');
	        } else {
	            var inputFile = files.inputFile[0];
	            var uploadedPath = inputFile.path;
	            var dstPath = './public/avatar/' + inputFile.originalFilename;
	            var imgSize=inputFile.size;
	            if (imgSize > 2*1024*1024) { res.end('2'); }
	            var imgType=inputFile.headers['content-type'];
	            if(imgType.split('/')[0]!='image'){ res.end('3'); }
	            //重命名为真实文件名
	            if(!uName){ res.end('1'); }
	            var imgPath='./public/avatar/'+uName+'headImg.jpg',
	                imgSrc='/avatar/'+uName+'headImg.jpg';
	            fs.rename(uploadedPath, imgPath, function(err) {
	                if(err){ 
	                	res.end('4');
	                } else {
                        var newResume = new resume.Resume({
                      		baseInfo1:{
                      			uname: fields.uname[0],
                      			gender: fields.sex[0],
                      			age: fields.age[0],
                      			identity: fields.istatus[0],
                      			education: fields.ieducation[0],
                      			school: fields.ischool[0],
                      			major: fields.imajor[0]
                      		}
                      	});
                    	resume.modify({author:uName},{headimg:imgSrc, baseInfo1:newResume.baseInfo1},function(err){
                    		if(err){
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

//contactinfo
exports.contactinfo=function(req, res, next) {
	var uName=req.session.user.username;
	var newResume = new resume.Resume({
		contact2:{
			mPhone: req.body.mphone,
			phoneNum: req.body.phone,
			populationAddr: req.body.address,
			permanentAddr: req.body.identity,
			email: req.body.email,
			qqNum: req.body.qqnum
		}
	});
  	resume.modify({author:uName},{contact2:newResume.contact2},function(err){
		if(err){
			res.send(false);   //res.jsonp()   res.write()
 			res.end();
		}else{
			res.send(true);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};

//education -add
exports.education1=function(req, res, next) {
	var uName=req.session.user.username;
	resume.findByUname(uName,function(err,rs){
		if(err){
 			res.redirect('/');
		}else{
 			var resultFin=rs[0];
 			var schools3={
 				school: req.body.school,
 				educationtype: req.body.educationtype,
 				sdatetime: req.body.sdatetime,
 				edatetime: req.body.edatetime,
 				major: req.body.major,
 				majorinstr: req.body.majorinstr
 			};
 			resultFin.schools3.push(schools3);
		  	resume.modify({author:uName},{schools3:resultFin.schools3},function(err){
				if(err){
					res.send(false);   //res.jsonp()   res.write()
		 			res.end();
				}else{
					res.send(true);   //res.jsonp()   res.write()
		 			res.end();
				}
			});
		}
	});

};

//education -change
exports.education2=function(req, res, next) {
	var uName=req.session.user.username;
	var educationtypeA=req.body.educationtypeA;
	resume.findByUname(uName,function(err,rs){
		if(err){
 			res.redirect('/');
		}else{
 			var resultFin=rs[0];
 			for(var i=0, len=resultFin.schools3.length; i<len; i++){
 				if(resultFin.schools3[i].educationtype == educationtypeA){
 					resultFin.schools3[i].school=req.body.school;
 					resultFin.schools3[i].sdatetime=req.body.sdatetime;
 					resultFin.schools3[i].edatetime=req.body.edatetime;
 					resultFin.schools3[i].major=req.body.major;
 					resultFin.schools3[i].majorinstr=req.body.majorinstr;
 					break;
 				}
 			}
		  	resume.modify({author:uName},{schools3:resultFin.schools3},function(err){
				if(err){
					res.send(false);   //res.jsonp()   res.write()
		 			res.end();
				}else{
					res.send(true);   //res.jsonp()   res.write()
		 			res.end();
				}
			});
		}
	});
};

//education -changeType
exports.education4=function(req, res, next) {
    var educationtype=req.body.educationtype;
	var uName=req.session.user.username;
	
	resume.findByUname(uName,function(err,rs){
		if(err){
			res.redirect('/');
		}else{
			var resultFin=rs[0];
			var schoolInfo={};
			for(var i=0, len=resultFin.schools3.length; i<len; i++){
				if(resultFin.schools3[i].educationtype == educationtype){
					schoolInfo=resultFin.schools3[i];
					break;
				}
			}
			res.send(schoolInfo);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};

//education -del
exports.education3=function(req, res, next) {
    var educationtype=req.body.educationtype;
	var uName=req.session.user.username;

	resume.findByUname(uName,function(err,rs){
		if(err){
			res.redirect('/');
		}else{
			var resultFin=rs[0];
			for(var i=0, len=resultFin.schools3.length; i<len; i++){
				if(resultFin.schools3[i].educationtype == educationtype){
					resultFin.schools3.splice(i,1);
					break;
				}
			}
		  	resume.modify({author:uName},{schools3:resultFin.schools3},function(err){
				if(err){
					res.send(false);   //res.jsonp()   res.write()
		 			res.end();
				}else{
					res.send(true);   //res.jsonp()   res.write()
		 			res.end();
				}
			});
		}
	});
};

//repractice-add
exports.repractice1=function(req, res, next) {
	var uName=req.session.user.username;
	resume.findByUname(uName,function(err,rs){
		if(err){
 			res.redirect('/');
		}else{
 			var resultFin=rs[0];
 			var experience4={
 				practice: req.body.practice,
 				spracticetime: req.body.spracticetime,
 				epracticetime: req.body.epracticetime,
 				practiceposition: req.body.practiceposition,
 				practiceinstr: req.body.practiceinstr
 			};
 			resultFin.experience4.push(experience4);
		  	resume.modify({author:uName},{experience4:resultFin.experience4},function(err){
				if(err){
					res.send(false);   //res.jsonp()   res.write()
		 			res.end();
				}else{
					res.send(true);   //res.jsonp()   res.write()
		 			res.end();
				}
			});
		}
	});

};

//repractice -change
exports.repractice2=function(req, res, next) {
	var uName=req.session.user.username;
	var compChangeType=req.body.compChangeType;
	resume.findByUname(uName,function(err,rs){
		if(err){
 			res.redirect('/');
		}else{
 			var resultFin=rs[0];
 			for(var i=0, len=resultFin.experience4.length; i<len; i++){
 				if(resultFin.experience4[i].practice == compChangeType){
 					resultFin.experience4[i].spracticetime=req.body.spracticetime;
 					resultFin.experience4[i].epracticetime=req.body.epracticetime;
 					resultFin.experience4[i].practiceposition=req.body.practiceposition;
 					resultFin.experience4[i].practiceinstr=req.body.practiceinstr;
 					break;
 				}
 			}
		  	resume.modify({author:uName},{experience4:resultFin.experience4},function(err){
				if(err){
					res.send(false);   //res.jsonp()   res.write()
		 			res.end();
				}else{
					res.send(true);   //res.jsonp()   res.write()
		 			res.end();
				}
			});
		}
	});
};

//repractice -changeType
exports.repractice4=function(req, res, next) {
    var compChangeType=req.body.compChangeType;
	var uName=req.session.user.username;
	
	resume.findByUname(uName,function(err,rs){
		if(err){
			res.redirect('/');
		}else{
			var resultFin=rs[0];
			var repracticeInfo={};
			for(var i=0, len=resultFin.experience4.length; i<len; i++){
				if(resultFin.experience4[i].practice == compChangeType){
					repracticeInfo=resultFin.experience4[i];
					break;
				}
			}
			res.send(repracticeInfo);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};

//repractice -del
exports.repractice3=function(req, res, next) {
    var compType=req.body.compType;
	var uName=req.session.user.username;

	resume.findByUname(uName,function(err,rs){
		if(err){
			res.redirect('/');
		}else{
			var resultFin=rs[0];
			for(var i=0, len=resultFin.experience4.length; i<len; i++){
				if(resultFin.experience4[i].practice == compType){
					resultFin.experience4.splice(i,1);
					break;
				}
			}
		  	resume.modify({author:uName},{experience4:resultFin.experience4},function(err){
				if(err){
					res.send(false);   //res.jsonp()   res.write()
		 			res.end();
				}else{
					res.send(true);   //res.jsonp()   res.write()
		 			res.end();
				}
			});
		}
	});
};


//practice-add
exports.practice1=function(req, res, next) {
	var uName=req.session.user.username;
	resume.findByUname(uName,function(err,rs){
		if(err){
 			res.redirect('/');
		}else{
 			var resultFin=rs[0];
 			var work5={
 				practice: req.body.practice,
 				spracticetime: req.body.spracticetime,
 				epracticetime: req.body.epracticetime,
 				practiceposition: req.body.practiceposition,
 				practiceinstr: req.body.practiceinstr
 			};
 			resultFin.work5.push(work5);
		  	resume.modify({author:uName},{work5:resultFin.work5},function(err){
				if(err){
					res.send(false);   //res.jsonp()   res.write()
		 			res.end();
				}else{
					res.send(true);   //res.jsonp()   res.write()
		 			res.end();
				}
			});
		}
	});

};
//practice -change
exports.practice2=function(req, res, next) {
	var uName=req.session.user.username;
	var compChangeType=req.body.compChangeType;
	resume.findByUname(uName,function(err,rs){
		if(err){
 			res.redirect('/');
		}else{
 			var resultFin=rs[0];
 			for(var i=0, len=resultFin.work5.length; i<len; i++){
 				if(resultFin.work5[i].practice == compChangeType){
 					resultFin.work5[i].spracticetime=req.body.spracticetime;
 					resultFin.work5[i].epracticetime=req.body.epracticetime;
 					resultFin.work5[i].practiceposition=req.body.practiceposition;
 					resultFin.work5[i].practiceinstr=req.body.practiceinstr;
 					break;
 				}
 			}
		  	resume.modify({author:uName},{work5:resultFin.work5},function(err){
				if(err){
					res.send(false);   //res.jsonp()   res.write()
		 			res.end();
				}else{
					res.send(true);   //res.jsonp()   res.write()
		 			res.end();
				}
			});
		}
	});
};
//practice -changeType
exports.practice4=function(req, res, next) {
    var compChangeType=req.body.compChangeType;
	var uName=req.session.user.username;
	
	resume.findByUname(uName,function(err,rs){
		if(err){
			res.redirect('/');
		}else{
			var resultFin=rs[0];
			var practiceInfo={};
			for(var i=0, len=resultFin.work5.length; i<len; i++){
				if(resultFin.work5[i].practice == compChangeType){
					practiceInfo=resultFin.work5[i];
					break;
				}
			}
			res.send(practiceInfo);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};
//practice -del
exports.practice3=function(req, res, next) {
    var compType=req.body.compType;
	var uName=req.session.user.username;

	resume.findByUname(uName,function(err,rs){
		if(err){
			res.redirect('/');
		}else{
			var resultFin=rs[0];
			for(var i=0, len=resultFin.work5.length; i<len; i++){
				if(resultFin.work5[i].practice == compType){
					resultFin.work5.splice(i,1);
					break;
				}
			}
		  	resume.modify({author:uName},{work5:resultFin.work5},function(err){
				if(err){
					res.send(false);   //res.jsonp()   res.write()
		 			res.end();
				}else{
					res.send(true);   //res.jsonp()   res.write()
		 			res.end();
				}
			});
		}
	});
};

//荣誉证书
exports.certificate=function(req, res, next) {
    var certificatename=req.body.certificatename,
    	gettime=req.body.gettime,
    	cgrade=req.body.cgrade,
    	certificateinstr=req.body.certificateinstr,
    	cimages=req.body.cimages;
  	var uName=req.session.user.username;

  	console.log(certificatename+gettime+cgrade+certificateinstr+cimages);
	resume.findByUname(uName,function(err){
		if(err){
			res.send(false);   //res.jsonp()   res.write()
 			res.end();
		}else{
			res.send(true);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};

//我的作品
exports.works=function(req, res, next) {
    var workname=req.body.workname,
    	worktime=req.body.worktime,
    	workduty=req.body.workduty,
    	showink=req.body.showink,
    	codelink=req.body.codelink,
    	workdes=req.body.workdes,
    	workimg=req.body.workimg;
  	var uName=req.session.user.username;

  	console.log(workname+worktime+workduty+showink+codelink+workdes+workimg);
	resume.findByUname(uName,function(err){
		if(err){
			res.send(false);   //res.jsonp()   res.write()
 			res.end();
		}else{
			res.send(true);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};

//项目经历
exports.projects=function(req, res, next) {
    var pname=req.body.pname,
    	ptime=req.body.ptime,
    	paddt=req.body.paddt;
  	var uName=req.session.user.username;

  	console.log(pname+ptime+paddt);
	resume.findByUname(uName,function(err){
		if(err){
			res.send(false);   //res.jsonp()   res.write()
 			res.end();
		}else{
			res.send(true);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};

//实践经历
exports.undergo=function(req, res, next) {
    var undergoname=req.body.undergoname,
    	undergotype=req.body.undergotype,
    	undergotime=req.body.undergotime,
    	undergoinstr=req.body.undergoinstr;
  	var uName=req.session.user.username;

  	console.log(undergoname+undergotype+undergotime+undergoinstr);
	resume.findByUname(uName,function(err){
		if(err){
			res.send(false);   //res.jsonp()   res.write()
 			res.end();
		}else{
			res.send(true);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};

//核心技能
exports.paper=function(req, res, next) {
    var papername=req.body.papername,
    	papertype=req.body.papertype,
    	papertime=req.body.papertime,
    	paperinstr=req.body.paperinstr;
  	var uName=req.session.user.username;

  	console.log(papername+papertype+papertime+paperinstr);
	resume.findByUname(uName,function(err){
		if(err){
			res.send(false);   //res.jsonp()   res.write()
 			res.end();
		}else{
			res.send(true);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};

//核心技能
exports.desc=function(req, res, next) {
    var desCon=req.body.desCon;
  	var uName=req.session.user.username;

	resume.findByUname(uName,function(err){
		if(err){
			res.send(false);   //res.jsonp()   res.write()
 			res.end();
		}else{
			res.send(true);   //res.jsonp()   res.write()
 			res.end();
		}
	});
};
