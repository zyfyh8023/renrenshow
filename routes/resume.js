"use strict";
var resume = require('../models/resume');
var users = require('../models/users');

var fs = require('fs'),
	multiparty = require('multiparty'),
	gm = require('gm'),
	imageMagick = gm.subClass({ imageMagick : true });

var retCode, retDesc, uName, allres;

/* GET Seting page. */
exports.page = function(req, res, next) {
	uName = req.session.user.username;
	resume.findByUname(uName, function(err, rs) {
		if (err) {
			res.redirect('/error');
		} else {
			if (rs) {
				users.findByUname(uName, function(err, resu) {
					if (err) {
						res.redirect('/error');
					}else{
						console.log(rs);
						allres=rs;
						res.render('./userResume/resume', {
							title: '我的简历',
							uName: uName,
							rs: rs,
							headImg: resu.headimg
						});
					}
				});
			} else {
				res.redirect('/error');
			}
		}
	});
};

exports.allinfo = function(req, res, next) {
	return res.send({allinfo: allres});
};

/* baseInfo -add and update */
exports.baseinfo = function(req, res, next) {
	uName = req.session.user.username;
	var form = new multiparty.Form({
		uploadDir: './public/upload/userimgs/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试！'});
		} else {
			if(files.inputFile1){
				var inputFile1 = files.inputFile1[0];
				var uploadedPath = inputFile1.path;
				var dstPath = './public/upload/userimgs/' + inputFile1.originalFilename;
				var imgSize = inputFile1.size;
				if (imgSize > 2 * 1024 * 1024) {
					return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
				}
				var imgType = inputFile1.headers['content-type'];
				console.log(imgType);
				if (imgType.split('/')[0] != 'image') {
					return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
				}
				var imgPath = './public/upload/userimgs/' + uName + '_headImg.jpg',
					imgPath2 = './public/upload/userimgs/' + uName + '_headImg_2.jpg',
					imgSrc = '/upload/userimgs/' + uName + '_headImg.jpg';
					var x=fields.J_cor_x1[0],
						y=fields.J_cor_y1[0],
						W=fields.J_cor_w[0],
						H=fields.J_cor_h[0];
					imageMagick(uploadedPath)
					.crop(W,H,x,y)
					//.resize(200, 200, '!') //加('!')强行把图片缩放成对应尺寸150*150！
					.autoOrient()
					.write(imgPath, function(err){
						if (err) {
							return res.send({retCode: 400,retDesc: '图片存储失败，请稍后再试！'});
						}
					    fs.unlink(uploadedPath, function() {
							var newResume = new resume.Resume({
								baseInfo1: {
									uname: fields.uname[0],
									gender: fields.sex[0],
									age: fields.age[0],
									identity: fields.istatus[0],
									education: fields.ieducation[0],
									school: fields.ischool[0],
									major: fields.imajor[0]
								}
							});
							resume.modify({author: uName}, {
								baseInfo1: newResume.baseInfo1
							}, function(err) {
								if (err) {
									return res.send({retCode: 400,retDesc: '信息更新失败！'});
								} else {
									users.modify({username: uName}, {
										headimg: imgSrc,
									}, function(err) {
										if (err) {
											return res.send({retCode: 400,retDesc: '信息更新失败！'});
										} else {
											return res.send({retCode: 200});
										}
									});
								}
							});
						});
					});
			}else{
				var newResume = new resume.Resume({
					baseInfo1: {
						uname: fields.uname[0],
						gender: fields.sex[0],
						age: fields.age[0],
						identity: fields.istatus[0],
						education: fields.ieducation[0],
						school: fields.ischool[0],
						major: fields.imajor[0]
					}
				});
				resume.modify({author: uName}, {
					baseInfo1: newResume.baseInfo1
				}, function(err) {
					if (err) {
						return res.send({retCode: 400,retDesc: '信息更新失败！'});
					} else {
						return res.send({retCode: 200});
					}
				});
			}
		}
	});
};

//contactinfo
exports.contactinfo = function(req, res, next) {
	uName = req.session.user.username;
	var newResume = new resume.Resume({
		contact2: {
			mPhone: req.body.mphone,
			phoneNum: req.body.phone,
			populationAddr: req.body.address,
			permanentAddr: req.body.identity,
			email: req.body.email,
			qqNum: req.body.qqnum
		}
	});
	resume.modify({author: uName}, {
		contact2: newResume.contact2
	}, function(err) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息更新失败！'});
		} else {
			return res.send({retCode: 200});
		}
	});
};

//edu-update
exports.education3 = function(req, res, next) {
	uName = req.session.user.username;
	var form = new multiparty.Form({
		uploadDir: './public/upload/schools/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile3){
						var inputFile = files.inputFile3[0];
						var uploadedPath = inputFile.path;
						var dstPath = './public/upload/schools/' + inputFile.originalFilename;
						var imgSize = inputFile.size;
						if (imgSize > 2 * 1024 * 1024) {
							return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
						}
						var imgType = inputFile.headers['content-type'];
						if (imgType.split('/')[0] != 'image') {
							return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
						}
						var cTimeStr = new Date().getTime();
						cTimeStr = cTimeStr.toString();
						var imgPath = './public/upload/schools/' + uName + 'certificateImg' + cTimeStr + '.jpg',
							imgSrc = '/upload/schools/' + uName + 'certificateImg' + cTimeStr + '.jpg';
						fs.rename(uploadedPath, imgPath, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
							} else {
								var updateid = fields.J_hidden_ipt[0].trim();
								rs.schools3[updateid].school=fields.school[0];
								rs.schools3[updateid].educationtype=fields.educationtype[0];
								rs.schools3[updateid].sdatetime=fields.sdatetime[0];
								rs.schools3[updateid].edatetime=fields.edatetime[0];
								rs.schools3[updateid].major=fields.major[0];
								rs.schools3[updateid].majorinstr=fields.majorinstr[0];
								rs.schools3[updateid].collegeName=fields.collegeName[0];
								rs.schools3[updateid].schoolLogo=imgSrc;

								resume.modify({author: uName}, {
									schools3: rs.schools3
								}, function(err) {
									if (err) {
										return res.send({retCode: 400,retDesc: '信息更新失败！'});
									} else {
										return res.send({retCode: 200});
									}
								});
							}
						});
					}else{
						var updateid = fields.J_hidden_ipt[0].trim();
						rs.schools3[updateid].school=fields.school[0];
						rs.schools3[updateid].educationtype=fields.educationtype[0];
						rs.schools3[updateid].sdatetime=fields.sdatetime[0];
						rs.schools3[updateid].edatetime=fields.edatetime[0];
						rs.schools3[updateid].major=fields.major[0];
						rs.schools3[updateid].majorinstr=fields.majorinstr[0];
						rs.schools3[updateid].collegeName=fields.collegeName[0];
						resume.modify({author: uName}, {
							schools3: rs.schools3
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
				}	
			});
		}
	});
};
//edu-add
exports.education1 = function(req, res, next) {
	uName = req.session.user.username;
	var form = new multiparty.Form({
		uploadDir: './public/upload/schools/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile3){
						var inputFile = files.inputFile3[0];
						var uploadedPath = inputFile.path;
						var dstPath = './public/upload/schools/' + inputFile.originalFilename;
						var imgSize = inputFile.size;
						if (imgSize > 2 * 1024 * 1024) {
							return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
						}
						var imgType = inputFile.headers['content-type'];
						if (imgType.split('/')[0] != 'image') {
							return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
						}
						var cTimeStr = new Date().getTime();
						cTimeStr = cTimeStr.toString();
						var imgPath = './public/upload/schools/' + uName + 'certificateImg' + cTimeStr + '.jpg',
							imgSrc = '/upload/schools/' + uName + 'certificateImg' + cTimeStr + '.jpg';
						fs.rename(uploadedPath, imgPath, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
							} else {
								var newschools3 = {
									school: fields.school[0],
									educationtype: fields.educationtype[0],
									sdatetime: fields.sdatetime[0],
									edatetime: fields.edatetime[0],
									major: fields.major[0],
									majorinstr: fields.majorinstr[0],
									collegeName: fields.collegeName[0],
									schoolLogo: imgSrc
								};
								rs.schools3.push(newschools3);
								resume.modify({author: uName}, {
									schools3: rs.schools3
								}, function(err) {
									if (err) {
										return res.send({retCode: 400,retDesc: '信息更新失败！'});
									} else {
										return res.send({retCode: 200});
									}
								});
							}
						});
					}else{
						var newschools3 = {
							school: fields.school[0],
							educationtype: fields.educationtype[0],
							sdatetime: fields.sdatetime[0],
							edatetime: fields.edatetime[0],
							major: fields.major[0],
							collegeName: fields.collegeName[0],
							majorinstr: fields.majorinstr[0]
						};
						rs.schools3.push(newschools3);
						resume.modify({author: uName}, {
							schools3: rs.schools3
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
				}
			});
		}
	});
};
//edu-del
exports.education2 = function(req, res, next) {
	var delnum = req.body.delnum.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.schools3.splice(delnum, 1);
			resume.modify({author: uName}, {
				schools3: rs.schools3
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//repractice-add
exports.repractice1 = function(req, res, next) {
	uName = req.session.user.username;
	var form = new multiparty.Form({
		uploadDir: './public/upload/companys/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile4){
						var inputFile = files.inputFile4[0];
						var uploadedPath = inputFile.path;
						var dstPath = './public/upload/companys/' + inputFile.originalFilename;
						var imgSize = inputFile.size;
						if (imgSize > 2 * 1024 * 1024) {
							return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
						}
						var imgType = inputFile.headers['content-type'];
						if (imgType.split('/')[0] != 'image') {
							return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
						}
						var cTimeStr = new Date().getTime();
						cTimeStr = cTimeStr.toString();
						var imgPath = './public/upload/companys/' + uName + 'certificateImg' + cTimeStr + '.jpg',
							imgSrc = '/upload/companys/' + uName + 'certificateImg' + cTimeStr + '.jpg';
						fs.rename(uploadedPath, imgPath, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
							} else {
								var newexperience4 = {
									practice: fields.practice[0],
									spracticetime: fields.spracticetime[0],
									epracticetime: fields.epracticetime[0],
									practiceposition: fields.practiceposition[0],
									practiceinstr: fields.practiceinstr[0],
									departmentName: fields.departmentName[0],
									companyLogo: imgSrc
								};
								rs.experience4.push(newexperience4);
								resume.modify({author: uName}, {
									experience4: rs.experience4
								}, function(err) {
									if (err) {
										return res.send({retCode: 400,retDesc: '信息更新失败！'});
									} else {
										return res.send({retCode: 200});
									}
								});
							}
						});
					}else{
						var newexperience4 = {
							practice: fields.practice[0],
							spracticetime: fields.spracticetime[0],
							epracticetime: fields.epracticetime[0],
							practiceposition: fields.practiceposition[0],
							departmentName: fields.departmentName[0],
							practiceinstr: fields.practiceinstr[0]
						};
						rs.experience4.push(newexperience4);
						resume.modify({author: uName}, {
							experience4: rs.experience4
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
				}
			});
		}
	});
};
//repractice-update
exports.repractice3 = function(req, res, next) {
	uName = req.session.user.username;
	var form = new multiparty.Form({
		uploadDir: './public/upload/companys/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile4){
						var inputFile = files.inputFile4[0];
						var uploadedPath = inputFile.path;
						var dstPath = './public/upload/companys/' + inputFile.originalFilename;
						var imgSize = inputFile.size;
						if (imgSize > 2 * 1024 * 1024) {
							return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
						}
						var imgType = inputFile.headers['content-type'];
						if (imgType.split('/')[0] != 'image') {
							return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
						}
						var cTimeStr = new Date().getTime();
						cTimeStr = cTimeStr.toString();
						var imgPath = './public/upload/companys/' + uName + 'certificateImg' + cTimeStr + '.jpg',
							imgSrc = '/upload/companys/' + uName + 'certificateImg' + cTimeStr + '.jpg';
						fs.rename(uploadedPath, imgPath, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
							} else {
								var updateid = fields.J_hidden_ipt[0].trim();
								rs.experience4[updateid].practice=fields.practice[0];
								rs.experience4[updateid].spracticetime=fields.spracticetime[0];
								rs.experience4[updateid].epracticetime=fields.epracticetime[0];
								rs.experience4[updateid].practiceposition=fields.practiceposition[0];
								rs.experience4[updateid].practiceinstr=fields.practiceinstr[0];
								rs.experience4[updateid].departmentName=fields.departmentName[0];
								rs.experience4[updateid].companyLogo=imgSrc;

								resume.modify({author: uName}, {
									experience4: rs.experience4
								}, function(err) {
									if (err) {
										return res.send({retCode: 400,retDesc: '信息更新失败！'});
									} else {
										return res.send({retCode: 200});
									}
								});
							}
						});
					}else{
						var updateid = fields.J_hidden_ipt[0].trim();
						rs.experience4[updateid].practice=fields.practice[0];
						rs.experience4[updateid].spracticetime=fields.spracticetime[0];
						rs.experience4[updateid].epracticetime=fields.epracticetime[0];
						rs.experience4[updateid].practiceposition=fields.practiceposition[0];
						rs.experience4[updateid].practiceinstr=fields.practiceinstr[0];
						rs.experience4[updateid].departmentName=fields.departmentName[0];
						resume.modify({author: uName}, {
							experience4: rs.experience4
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
				}
			});
		}
	});
};
//repractice-del
exports.repractice2 = function(req, res, next) {
	var delnum = req.body.delnum.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.experience4.splice(delnum, 1);
			resume.modify({author: uName}, {
				experience4: rs.experience4
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//practice-add
exports.practice1 = function(req, res, next) {
	uName = req.session.user.username;

	var form = new multiparty.Form({
		uploadDir: './public/upload/companys/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile5){
						var inputFile = files.inputFile5[0];
						var uploadedPath = inputFile.path;
						var dstPath = './public/upload/companys/' + inputFile.originalFilename;
						var imgSize = inputFile.size;
						if (imgSize > 2 * 1024 * 1024) {
							return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
						}
						var imgType = inputFile.headers['content-type'];
						if (imgType.split('/')[0] != 'image') {
							return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
						}
						var cTimeStr = new Date().getTime();
						cTimeStr = cTimeStr.toString();
						var imgPath = './public/upload/companys/' + uName + 'certificateImg' + cTimeStr + '.jpg',
							imgSrc = '/upload/companys/' + uName + 'certificateImg' + cTimeStr + '.jpg';
						fs.rename(uploadedPath, imgPath, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
							} else {
								var newwork5 = {
									practice: fields.practice[0],
									spracticetime: fields.spracticetime[0],
									epracticetime: fields.epracticetime[0],
									practiceposition: fields.practiceposition[0],
									practiceinstr: fields.practiceinstr[0],
									departmentName: fields.departmentName[0],
									companyLogo: imgSrc
								};
								rs.work5.push(newwork5);
								resume.modify({author: uName}, {
									work5: rs.work5
								}, function(err) {
									if (err) {
										return res.send({retCode: 400,retDesc: '信息更新失败！'});
									} else {
										return res.send({retCode: 200});
									}
								});
							}
						});
					}else{
						var newwork5 = {
							practice: fields.practice[0],
							spracticetime: fields.spracticetime[0],
							epracticetime: fields.epracticetime[0],
							practiceposition: fields.practiceposition[0],
							departmentName: fields.departmentName[0],
							practiceinstr: fields.practiceinstr[0]
						};
						rs.work5.push(newwork5);
						resume.modify({author: uName}, {
							work5: rs.work5
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
				}
			});
		}
	});
};
//practice-update
exports.practice3 = function(req, res, next) {
	uName = req.session.user.username;
	var form = new multiparty.Form({
		uploadDir: './public/upload/companys/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile5){
						var inputFile = files.inputFile5[0];
						var uploadedPath = inputFile.path;
						var dstPath = './public/upload/companys/' + inputFile.originalFilename;
						var imgSize = inputFile.size;
						if (imgSize > 2 * 1024 * 1024) {
							return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
						}
						var imgType = inputFile.headers['content-type'];
						if (imgType.split('/')[0] != 'image') {
							return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
						}
						var cTimeStr = new Date().getTime();
						cTimeStr = cTimeStr.toString();
						var imgPath = './public/upload/companys/' + uName + 'certificateImg' + cTimeStr + '.jpg',
							imgSrc = '/upload/companys/' + uName + 'certificateImg' + cTimeStr + '.jpg';
						fs.rename(uploadedPath, imgPath, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
							} else {
								var updateid = fields.J_hidden_ipt[0].trim();
								rs.work5[updateid].practice=fields.practice[0];
								rs.work5[updateid].spracticetime=fields.spracticetime[0];
								rs.work5[updateid].epracticetime=fields.epracticetime[0];
								rs.work5[updateid].practiceposition=fields.practiceposition[0];
								rs.work5[updateid].practiceinstr=fields.practiceinstr[0];
								rs.work5[updateid].departmentName=fields.departmentName[0];
								rs.work5[updateid].companyLogo=imgSrc;

								resume.modify({author: uName}, {
									work5: rs.work5
								}, function(err) {
									if (err) {
										return res.send({retCode: 400,retDesc: '信息更新失败！'});
									} else {
										return res.send({retCode: 200});
									}
								});
							}
						});
					}else{
						var updateid = fields.J_hidden_ipt[0].trim();
						rs.work5[updateid].practice=fields.practice[0];
						rs.work5[updateid].spracticetime=fields.spracticetime[0];
						rs.work5[updateid].epracticetime=fields.epracticetime[0];
						rs.work5[updateid].practiceposition=fields.practiceposition[0];
						rs.work5[updateid].practiceinstr=fields.practiceinstr[0];
						rs.work5[updateid].departmentName=fields.departmentName[0];
						resume.modify({author: uName}, {
							work5: rs.work5
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
					
				}
			});
		}
	});
};
//practice-del
exports.practice2 = function(req, res, next) {
	var delnum = req.body.delnum.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.work5.splice(delnum, 1);
			resume.modify({author: uName}, {
				work5: rs.work5
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//荣誉证书-add
exports.certificate1 = function(req, res, next) {
	uName = req.session.user.username;
	var form = new multiparty.Form({
		uploadDir: './public/upload/awards/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile6){
						var inputFile = files.inputFile6[0];
						var uploadedPath = inputFile.path;
						var dstPath = './public/upload/awards/' + inputFile.originalFilename;
						var imgSize = inputFile.size;
						if (imgSize > 2 * 1024 * 1024) {
							return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
						}
						var imgType = inputFile.headers['content-type'];
						if (imgType.split('/')[0] != 'image') {
							return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
						}
						var cTimeStr = new Date().getTime();
						cTimeStr = cTimeStr.toString();
						var imgPath = './public/upload/awards/' + uName + 'certificateImg' + cTimeStr + '.jpg',
							imgSrc = '/upload/awards/' + uName + 'certificateImg' + cTimeStr + '.jpg';
						fs.rename(uploadedPath, imgPath, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
							} else {
								var newCertificate6 = {
									certificatename: fields.certificatename[0],
									gettime: fields.gettime[0],
									cgrade: fields.cgrade[0],
									certificateinstr: fields.certificateinstr[0],
									cimages: imgSrc
								}
								rs.Certificate6.push(newCertificate6);
								resume.modify({
									author: uName
								}, {
									Certificate6: rs.Certificate6
								}, function(err) {
									if (err) {
										return res.send({retCode: 400,retDesc: '信息更新失败！'});
									} else {
										return res.send({retCode: 200});
									}
								});
							}
						});
					}else{
						var newCertificate6 = {
							certificatename: fields.certificatename[0],
							gettime: fields.gettime[0],
							cgrade: fields.cgrade[0],
							certificateinstr: fields.certificateinstr[0]
						}
						rs.Certificate6.push(newCertificate6);
						resume.modify({
							author: uName
						}, {
							Certificate6: rs.Certificate6
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
				}
			});
		}
	});
};
//荣誉证书-update
exports.certificate3 = function(req, res, next) {
	uName = req.session.user.username;
	var form = new multiparty.Form({
		uploadDir: './public/upload/awards/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile6){
						var inputFile = files.inputFile6[0];
						var uploadedPath = inputFile.path;
						var dstPath = './public/upload/awards/' + inputFile.originalFilename;
						var imgSize = inputFile.size;
						if (imgSize > 2 * 1024 * 1024) {
							return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
						}
						var imgType = inputFile.headers['content-type'];
						if (imgType.split('/')[0] != 'image') {
							return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
						}
						var cTimeStr = new Date().getTime();
						cTimeStr = cTimeStr.toString();
						var imgPath = './public/upload/awards/' + uName + 'certificateImg' + cTimeStr + '.jpg',
							imgSrc = '/upload/awards/' + uName + 'certificateImg' + cTimeStr + '.jpg';
						fs.rename(uploadedPath, imgPath, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
							} else {
								var updateid = fields.J_hidden_ipt[0].trim();
								rs.Certificate6[updateid].certificatename=fields.certificatename[0];
								rs.Certificate6[updateid].gettime=fields.gettime[0];
								rs.Certificate6[updateid].cgrade=fields.cgrade[0];
								rs.Certificate6[updateid].certificateinstr=fields.certificateinstr[0];
								rs.Certificate6[updateid].cimages=imgSrc;

								resume.modify({author: uName}, {
									Certificate6: rs.Certificate6
								}, function(err) {
									if (err) {
										return res.send({retCode: 400,retDesc: '信息更新失败！'});
									} else {
										return res.send({retCode: 200});
									}
								});
							}
						});
					}else{
						var updateid = fields.J_hidden_ipt[0].trim();
						rs.Certificate6[updateid].certificatename=fields.certificatename[0];
						rs.Certificate6[updateid].gettime=fields.gettime[0];
						rs.Certificate6[updateid].cgrade=fields.cgrade[0];
						rs.Certificate6[updateid].certificateinstr=fields.certificateinstr[0];
						
						resume.modify({author: uName}, {
							Certificate6: rs.Certificate6
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
				}
			});
		}
	});
};
//荣誉证书-del
exports.certificate2 = function(req, res, next) {
	var delnum = req.body.delnum.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.Certificate6.splice(delnum, 1);
			resume.modify({
				author: uName
			}, {
				Certificate6: rs.Certificate6
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};	
//我的作品-add
exports.works1 = function(req, res, next) {
	uName = req.session.user.username;

	var form = new multiparty.Form({
		uploadDir: './public/upload/works/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile7){
						var imgArr = []; var num = 0;
						for (var k = 0, len = files.inputFile7.length; k < len; k++) {
							var inputFile = files.inputFile7[k];
							var uploadedPath = inputFile.path;
							var dstPath = './public/upload/works/' + inputFile.originalFilename;
							var imgSize = inputFile.size;
							if (imgSize > 2 * 1024 * 1024) {
								return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
							}
							var imgType = inputFile.headers['content-type'];
							if (imgType.split('/')[0] != 'image') {
								return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
							}
							var cTimeStr = new Date().getTime();
							cTimeStr = cTimeStr.toString();
							var imgPath = './public/upload/works/' + uName + 'workImg' + cTimeStr + k + '.jpg',
								imgSrc = '/upload/works/' + uName + 'workImg' + cTimeStr + k + '.jpg';
							imgArr.push(imgSrc);
							fs.rename(uploadedPath, imgPath, function(err) {
								if (err) {
									return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
								} else {
									num++;
									if (num == len) {
										var newpWorks7 = {
											workname: fields.workname[0],
											worktime: fields.worktime[0],
											relationlink: fields.showink[0],
											workdes: fields.workdes[0],
											workimg: imgArr
										}
										rs.pWorks7.push(newpWorks7);
										resume.modify({author: uName}, {
											pWorks7: rs.pWorks7
										}, function(err) {
											if (err) {
												return res.send({retCode: 400,retDesc: '信息更新失败！'});
											} else {
												return res.send({retCode: 200});
											}
										});
									}
								}
							});
						}
					}else{
						var newpWorks7 = {
							workname: fields.workname[0],
							worktime: fields.worktime[0],
							relationlink: fields.showink[0],
							workdes: fields.workdes[0]
						}
						rs.pWorks7.push(newpWorks7);
						resume.modify({author: uName}, {
							pWorks7: rs.pWorks7
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
				}
			});
		}
	});
};
//我的作品-update
exports.works3 = function(req, res, next) {
	uName = req.session.user.username;

	var form = new multiparty.Form({
		uploadDir: './public/upload/works/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			return res.send({retCode: 400,retDesc: '系统出现故障，请稍后再试哦！'});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息查找失败！'});
				} else {
					if(files.inputFile7){
						var imgArr = []; var num = 0;
						for (var k = 0, len = files.inputFile7.length; k < len; k++) {
							var inputFile = files.inputFile7[k];
							var uploadedPath = inputFile.path;
							var dstPath = './public/upload/works/' + inputFile.originalFilename;
							var imgSize = inputFile.size;
							if (imgSize > 2 * 1024 * 1024) {
								return res.send({retCode: 400,retDesc: '图片的尺寸过大！'});
							}
							var imgType = inputFile.headers['content-type'];
							if (imgType.split('/')[0] != 'image') {
								return res.send({retCode: 400,retDesc: '只允许上传图片哦'});
							}
							var cTimeStr = new Date().getTime();
							cTimeStr = cTimeStr.toString();
							var imgPath = './public/upload/works/' + uName + 'workImg' + cTimeStr + k + '.jpg',
								imgSrc = '/upload/works/' + uName + 'workImg' + cTimeStr + k + '.jpg';
							imgArr.push(imgSrc);
							fs.rename(uploadedPath, imgPath, function(err) {
								if (err) {
									return res.send({retCode: 400,retDesc: '图片重名了出现问题，请稍后再试！'});
								} else {
									num++;
									if (num == len) {
										var updateid = fields.J_hidden_ipt[0].trim();
										rs.pWorks7[updateid].workname=fields.workname[0];
										rs.pWorks7[updateid].worktime=fields.worktime[0];
										rs.pWorks7[updateid].relationlink=fields.showink[0];
										rs.pWorks7[updateid].workdes=fields.workdes[0];
										rs.pWorks7[updateid].workimg=imgArr;

										resume.modify({author: uName}, {
											pWorks7: rs.pWorks7
										}, function(err) {
											if (err) {
												return res.send({retCode: 400,retDesc: '信息更新失败！'});
											} else {
												return res.send({retCode: 200});
											}
										});
									}
								}
							});
						}
					}else{
						var updateid = fields.J_hidden_ipt[0].trim();
						rs.pWorks7[updateid].workname=fields.workname[0];
						rs.pWorks7[updateid].worktime=fields.worktime[0];
						rs.pWorks7[updateid].relationlink=fields.showink[0];
						rs.pWorks7[updateid].workdes=fields.workdes[0];

						resume.modify({author: uName}, {
							pWorks7: rs.pWorks7
						}, function(err) {
							if (err) {
								return res.send({retCode: 400,retDesc: '信息更新失败！'});
							} else {
								return res.send({retCode: 200});
							}
						});
					}
				}
			});
		}
	});
};
//我的作品-del
exports.works2 = function(req, res, next) {
	var delnum = req.body.delnum.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.pWorks7.splice(delnum, 1);
			resume.modify({author: uName}, {
				pWorks7: rs.pWorks7
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//项目经历-add
exports.projects1 = function(req, res, next) {
	var pname = req.body.pname.trim(),
		ptime = req.body.ptime.trim(),
		paddt = req.body.paddt.trim(),
		pnum = req.body.pnum.trim(),
		myPos = req.body.myPos.trim(),
		myworks = req.body.myworks.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			var newprojects8 = {
				pName: pname,
				pTime: ptime,
				addt: paddt,
				pnum: pnum,
				myPos: myPos,
				myworks: myworks
			};
			rs.projects8.push(newprojects8);
			resume.modify({author: uName}, {
				projects8: rs.projects8
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//项目经历-update
exports.projects3 = function(req, res, next) {
	var pname = req.body.pname.trim(),
		ptime = req.body.ptime.trim(),
		paddt = req.body.paddt.trim(),
		pnum = req.body.pnum.trim(),
		myPos = req.body.myPos.trim(),
		myworks = req.body.myworks.trim();
		updateid = req.body.updateid.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			var newprojects8 = {
				pName: pname,
				pTime: ptime,
				addt: paddt,
				pnum: pnum,
				myPos: myPos,
				myworks: myworks
			};
			rs.projects8[updateid]=newprojects8;
			resume.modify({author: uName}, {
				projects8: rs.projects8
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//项目经历-del
exports.projects2 = function(req, res, next) {
	var delnum = req.body.delnum.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.projects8.splice(delnum, 1);
			resume.modify({author: uName}, {
				projects8: rs.projects8
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//实践经历-add
exports.undergo1 = function(req, res, next) {
	var undergoname = req.body.undergoname.trim(),
		undergotype = req.body.undergotype.trim(),
		undergotime = req.body.undergotime.trim(),
		undergoinstr = req.body.undergoinstr.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			var newtrys9 = {
				tName: undergoname,
				tTime: undergotype,
				tType: undergotime,
				addt: undergoinstr
			};
			rs.trys9.push(newtrys9);
			resume.modify({author: uName}, {
				trys9: rs.trys9
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//实践经历-update
exports.undergo3 = function(req, res, next) {
	var undergoname = req.body.undergoname.trim(),
		undergotype = req.body.undergotype.trim(),
		undergotime = req.body.undergotime.trim(),
		undergoinstr = req.body.undergoinstr.trim(),
		updateid = req.body.updateid.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			var newtrys9 = {
				tName: undergoname,
				tTime: undergotype,
				tType: undergotime,
				addt: undergoinstr
			};
			rs.trys9[updateid]=newtrys9;
			resume.modify({author: uName}, {
				trys9: rs.trys9
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//实践经历-del
exports.undergo2 = function(req, res, next) {
	var delnum = req.body.delnum.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.trys9.splice(delnum, 1);
			resume.modify({author: uName}, {
				trys9: rs.trys9
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//论文专利-add
exports.paper1 = function(req, res, next) {
	var papername = req.body.papername.trim(),
		papertype = req.body.papertype.trim(),
		papertime = req.body.papertime.trim(),
		authors = req.body.authors.trim(),
		ppaddr = req.body.ppaddr.trim(),
		paperinstr = req.body.paperinstr.trim();

	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			var newPatentPaper10 = {
				ppName: papername,
				ppTime: papertype,
				ppType: papertime,
				addt: paperinstr,
				allAuthors: authors,
				ppAddr: ppaddr
			};
			rs.PatentPaper10.push(newPatentPaper10);
			resume.modify({author: uName}, {
				PatentPaper10: rs.PatentPaper10
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//论文专利-update
exports.paper3 = function(req, res, next) {
	var papername = req.body.papername.trim(),
		papertype = req.body.papertype.trim(),
		papertime = req.body.papertime.trim(),
		paperinstr = req.body.paperinstr.trim(),
		authors = req.body.authors.trim(),
		ppaddr = req.body.ppaddr.trim(),
		updateid = req.body.updateid.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			var newPatentPaper10 = {
				ppName: papername,
				ppTime: papertype,
				ppType: papertime,
				addt: paperinstr,
				allAuthors: authors,
				ppAddr: ppaddr
			};
			rs.PatentPaper10[updateid]=newPatentPaper10;
			resume.modify({author: uName}, {
				PatentPaper10: rs.PatentPaper10
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//论文专利-del
exports.paper2 = function(req, res, next) {
	var delnum = req.body.delnum.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.PatentPaper10.splice(delnum, 1);
			resume.modify({author: uName}, {
				PatentPaper10: rs.PatentPaper10
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//核心技能-add
exports.desc1 = function(req, res, next) {
	var desCon = req.body.desCon.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.Technology11.push(desCon);
			resume.modify({author: uName}, {
				Technology11: rs.Technology11
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//核心技能-update
exports.desc3 = function(req, res, next) {
	var desCon = req.body.desCon.trim(),
		updateid = req.body.updateid.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'
			});
		} else {
			rs.Technology11[updateid]=desCon;
			resume.modify({author: uName}, {
				Technology11: rs.Technology11
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};
//核心技能-del
exports.desc2 = function(req, res, next) {
	var delnum = req.body.delnum.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			return res.send({retCode: 400,retDesc: '信息查找失败！'});
		} else {
			rs.Technology11.splice(delnum,1);
			resume.modify({author: uName}, {
				Technology11: rs.Technology11
			}, function(err) {
				if (err) {
					return res.send({retCode: 400,retDesc: '信息添加失败！'});
				} else {
					return res.send({retCode: 200});
				}
			});
		}
	});
};

//初始化
exports.resumeInit = function(uNames,callback) {
	var newResume = new resume.Resume({
		author: uNames,
	});
	resume.create(newResume, function(err) {
		if (err) {
			callback(0);
		} else {
			callback(1);
		}
	});
};
