"use strict";
var resume = require('../models/resume');
var fs = require('fs'),
	multiparty = require('multiparty');

var retCode, retDesc, uName;

/* GET Seting page. */
exports.page = function(req, res, next) {
	uName = req.session.user.username;
	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = "个人简历数据加载失败!";
			res.redirect('myError?retDesc=' + retDesc);
		} else {
			if (rs) {
				console.log(rs);
				res.render('./userResume/resume', {
					title: '我的简历',
					uName: uName,
					rs: rs
				});
			} else {
				retDesc = "没有数据，数据未初始化!";
				res.redirect('myError?retDesc=' + retDesc);
			}
		}
	});
};

//baseInfo -change
exports.baseinfo = function(req, res, next) {
	uName = req.session.user.username;
	var form = new multiparty.Form({
		uploadDir: './public/avatar/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			retDesc = '系统出现故障，请稍后再试！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var inputFile = files.inputFile[0];
			var uploadedPath = inputFile.path;
			var dstPath = './public/avatar/' + inputFile.originalFilename;
			var imgSize = inputFile.size;
			if (imgSize > 2 * 1024 * 1024) {
				retDesc = '图片的尺寸过大！';
				return res.send({
					retCode: 400,
					retDesc: retDesc
				});
			}
			var imgType = inputFile.headers['content-type'];
			if (imgType.split('/')[0] != 'image') {
				retDesc = '只允许上传图片哦~';
				return res.send({
					retCode: 400,
					retDesc: retDesc
				});
			}
			//重命名为真实文件名
			var imgPath = './public/avatar/' + uName + 'headImg.jpg',
				imgSrc = '/avatar/' + uName + 'headImg.jpg';
			fs.rename(uploadedPath, imgPath, function(err) {
				if (err) {
					retDesc = '图片重名了出现问题，请稍后再试！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
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
					resume.modify({
						author: uName
					}, {
						headimg: imgSrc,
						baseInfo1: newResume.baseInfo1
					}, function(err) {
						if (err) {
							retDesc = '信息更新失败！';
							return res.send({
								retCode: 400,
								retDesc: retDesc
							});
						} else {
							return res.send({
								retCode: 200
							});
						}
					});
				}
			});
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
	resume.modify({
		author: uName
	}, {
		contact2: newResume.contact2
	}, function(err) {
		if (err) {
			retDesc = '信息更新失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			return res.send({
				retCode: 200
			});
		}
	});
};

//education -add
exports.education1 = function(req, res, next) {
	uName = req.session.user.username;
	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息更新失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			var schools3 = {
				school: req.body.school,
				educationtype: req.body.educationtype,
				sdatetime: req.body.sdatetime,
				edatetime: req.body.edatetime,
				major: req.body.major,
				majorinstr: req.body.majorinstr
			};
			resultFin.schools3.push(schools3);
			resume.modify({
				author: uName
			}, {
				schools3: resultFin.schools3
			}, function(err) {
				if (err) {
					retDesc = '信息更新失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});

};

//education -change
exports.education2 = function(req, res, next) {
	uName = req.session.user.username;
	var educationtypeA = req.body.educationtypeA;
	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息更新失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			for (var i = 0, len = resultFin.schools3.length; i < len; i++) {
				if (resultFin.schools3[i].educationtype == educationtypeA) {
					resultFin.schools3[i].school = req.body.school;
					resultFin.schools3[i].sdatetime = req.body.sdatetime;
					resultFin.schools3[i].edatetime = req.body.edatetime;
					resultFin.schools3[i].major = req.body.major;
					resultFin.schools3[i].majorinstr = req.body.majorinstr;
					break;
				}
			}
			resume.modify({
				author: uName
			}, {
				schools3: resultFin.schools3
			}, function(err) {
				if (err) {
					retDesc = '信息更新失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};

//education -changeType
exports.education4 = function(req, res, next) {
	var educationtype = req.body.educationtype;
	uName = req.session.user.username;
	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息更新失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			var schoolInfo = {};
			for (var i = 0, len = resultFin.schools3.length; i < len; i++) {
				if (resultFin.schools3[i].educationtype == educationtype) {
					schoolInfo = resultFin.schools3[i];
					break;
				}
			}
			res.send(schoolInfo); //res.jsonp()   res.write()
			res.end();
		}
	});
};

//education -del
exports.education3 = function(req, res, next) {
	var educationtype = req.body.educationtype;
	uName = req.session.user.username;
	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息更新失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			for (var i = 0, len = resultFin.schools3.length; i < len; i++) {
				if (resultFin.schools3[i].educationtype == educationtype) {
					resultFin.schools3.splice(i, 1);
					break;
				}
			}
			resume.modify({
				author: uName
			}, {
				schools3: resultFin.schools3
			}, function(err) {
				if (err) {
					retDesc = '信息更新失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};

//repractice-add
exports.repractice1 = function(req, res, next) {
	var uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			var experience4 = {
				practice: req.body.practice.trim(),
				spracticetime: req.body.spracticetime.trim(),
				epracticetime: req.body.epracticetime.trim(),
				practiceposition: req.body.practiceposition.trim(),
				practiceinstr: req.body.practiceinstr.trim()
			};
			resultFin.experience4.push(experience4);
			resume.modify({
				author: uName
			}, {
				experience4: resultFin.experience4
			}, function(err) {
				if (err) {
					retDesc = '信息更新失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});

};

//repractice -change
exports.repractice2 = function(req, res, next) {
	uName = req.session.user.username;
	var compChangeType = req.body.compChangeType.trim();

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			for (var i = 0, len = resultFin.experience4.length; i < len; i++) {
				if (resultFin.experience4[i].practice == compChangeType) {
					resultFin.experience4[i].spracticetime = req.body.spracticetime.trim();
					resultFin.experience4[i].epracticetime = req.body.epracticetime.trim();
					resultFin.experience4[i].practiceposition = req.body.practiceposition.trim();
					resultFin.experience4[i].practiceinstr = req.body.practiceinstr.trim();
					break;
				}
			}
			resume.modify({
				author: uName
			}, {
				experience4: resultFin.experience4
			}, function(err) {
				if (err) {
					retDesc = '信息更新失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};

//repractice -changeType
exports.repractice4 = function(req, res, next) {
	var compChangeType = req.body.compChangeType.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			var repracticeInfo = {};
			for (var i = 0, len = resultFin.experience4.length; i < len; i++) {
				if (resultFin.experience4[i].practice == compChangeType) {
					repracticeInfo = resultFin.experience4[i];
					break;
				}
			}
			return res.send({
				retCode: 200,
				repracticeInfo: repracticeInfo
			});
		}
	});
};

//repractice -del
exports.repractice3 = function(req, res, next) {
	var compType = req.body.compType.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			for (var i = 0, len = resultFin.experience4.length; i < len; i++) {
				if (resultFin.experience4[i].practice == compType) {
					resultFin.experience4.splice(i, 1);
					break;
				}
			}
			resume.modify({
				author: uName
			}, {
				experience4: resultFin.experience4
			}, function(err) {
				if (err) {
					retDesc = '信息更新失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};


//practice-add
exports.practice1 = function(req, res, next) {
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var work5 = {
				practice: req.body.practice.trim(),
				spracticetime: req.body.spracticetime.trim(),
				epracticetime: req.body.epracticetime.trim(),
				practiceposition: req.body.practiceposition.trim(),
				practiceinstr: req.body.practiceinstr.trim()
			};
			rs.work5.push(work5);
			resume.modify({
				author: uName
			}, {
				work5: rs.work5
			}, function(err) {
				if (err) {
					retDesc = '信息更新失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});

};
//practice -change
exports.practice2 = function(req, res, next) {
	uName = req.session.user.username;
	var compChangeType = req.body.compChangeType.trim();

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			for (var i = 0, len = resultFin.work5.length; i < len; i++) {
				if (resultFin.work5[i].practice == compChangeType) {
					resultFin.work5[i].spracticetime = req.body.spracticetime.trim();
					resultFin.work5[i].epracticetime = req.body.epracticetime.trim();
					resultFin.work5[i].practiceposition = req.body.practiceposition.trim();
					resultFin.work5[i].practiceinstr = req.body.practiceinstr.trim();
					break;
				}
			}
			resume.modify({
				author: uName
			}, {
				work5: resultFin.work5
			}, function(err) {
				if (err) {
					retDesc = '信息更新失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};
//practice -changeType
exports.practice4 = function(req, res, next) {
	var compChangeType = req.body.compChangeType.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			var practiceInfo = {};
			for (var i = 0, len = resultFin.work5.length; i < len; i++) {
				if (resultFin.work5[i].practice == compChangeType) {
					practiceInfo = resultFin.work5[i];
					break;
				}
			}
			return res.send({
				retCode: 200,
				practiceInfo: practiceInfo
			});
		}
	});
};
//practice -del
exports.practice3 = function(req, res, next) {
	var compType = req.body.compType.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var resultFin = rs;
			for (var i = 0, len = resultFin.work5.length; i < len; i++) {
				if (resultFin.work5[i].practice == compType) {
					resultFin.work5.splice(i, 1);
					break;
				}
			}
			resume.modify({
				author: uName
			}, {
				work5: resultFin.work5
			}, function(err) {
				if (err) {
					retDesc = '信息更新失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};

//荣誉证书
exports.certificate = function(req, res, next) {
	uName = req.session.user.username;

	var form = new multiparty.Form({
		uploadDir: './public/works/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					retDesc = '信息查找失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					var inputFile = files.inputFile3[0];
					var uploadedPath = inputFile.path;
					var dstPath = './public/works/' + inputFile.originalFilename;
					var imgSize = inputFile.size;
					if (imgSize > 2 * 1024 * 1024) {
						retDesc = '图片的尺寸过大！';
						return res.send({
							retCode: 400,
							retDesc: retDesc
						});
					}
					var imgType = inputFile.headers['content-type'];
					if (imgType.split('/')[0] != 'image') {
						retDesc = '只允许上传图片哦~';
						return res.send({
							retCode: 400,
							retDesc: retDesc
						});
					}
					var cTimeStr = new Date().getTime();
					cTimeStr = cTimeStr.toString();
					var imgPath = './public/works/' + uName + 'certificateImg' + cTimeStr + '.jpg',
						imgSrc = '/works/' + uName + 'certificateImg' + cTimeStr + '.jpg';
					fs.rename(uploadedPath, imgPath, function(err) {
						if (err) {
							retDesc = '图片重名了出现问题，请稍后再试！';
							return res.send({
								retCode: 400,
								retDesc: retDesc
							});
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
									retDesc = '信息更新失败！';
									return res.send({
										retCode: 400,
										retDesc: retDesc
									});
								} else {
									return res.send({
										retCode: 200
									});
								}
							});
						}
					});
				}
			});
		}
	});
};

//我的作品
exports.works = function(req, res, next) {
	uName = req.session.user.username;

	var form = new multiparty.Form({
		uploadDir: './public/works/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		if (err) {
			retDesc = '系统出现故障，请稍后再试哦！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			resume.findByUname(uName, function(err, rs) {
				if (err) {
					retDesc = '信息查找失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					var imgArr = [];
					var num = 0;
					for (var k = 0, len = files.inputFile2.length; k < len; k++) {
						var inputFile = files.inputFile2[k];
						var uploadedPath = inputFile.path;
						var dstPath = './public/works/' + inputFile.originalFilename;
						var imgSize = inputFile.size;
						if (imgSize > 2 * 1024 * 1024) {
							retDesc = '图片的尺寸过大！';
							return res.send({
								retCode: 400,
								retDesc: retDesc
							});
						}
						var imgType = inputFile.headers['content-type'];
						if (imgType.split('/')[0] != 'image') {
							retDesc = '只允许上传图片哦~';
							return res.send({
								retCode: 400,
								retDesc: retDesc
							});
						}
						var cTimeStr = new Date().getTime();
						cTimeStr = cTimeStr.toString();
						var imgPath = './public/works/' + uName + 'workImg' + cTimeStr + k + '.jpg',
							imgSrc = '/works/' + uName + 'workImg' + cTimeStr + k + '.jpg';
						imgArr.push(imgSrc);
						fs.rename(uploadedPath, imgPath, function(err) {
							if (err) {
								retDesc = '图片重名了出现问题，请稍后再试！';
								return res.send({
									retCode: 400,
									retDesc: retDesc
								});
							} else {
								num++;
								if (num == len) {
									var newpWorks7 = {
										workname: fields.workname[0],
										worktime: fields.worktime[0],
										workduty: fields.workduty[0],
										showink: fields.showink[0],
										codelink: fields.codelink[0],
										workdes: fields.workdes[0],
										workimg: imgArr
									}
									rs.pWorks7.push(newpWorks7);
									resume.modify({
										author: uName
									}, {
										pWorks7: rs.pWorks7
									}, function(err) {
										if (err) {
											retDesc = '信息更新失败！';
											return res.send({
												retCode: 400,
												retDesc: retDesc
											});
										} else {
											return res.send({
												retCode: 200
											});
										}
									});
								}
							}
						});
					}
				}
			});
		}
	});
};

//项目经历
exports.projects = function(req, res, next) {
	var pname = req.body.pname.trim(),
		ptime = req.body.ptime.trim(),
		paddt = req.body.paddt.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息查找失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var newprojects8 = {
				pName: pname,
				pTime: ptime,
				addt: paddt
			};
			rs.projects8.push(newprojects8);
			resume.modify({
				author: uName
			}, {
				projects8: rs.projects8
			}, function(err) {
				if (err) {
					retDesc = '信息添加失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};

//实践经历
exports.undergo = function(req, res, next) {
	var undergoname = req.body.undergoname.trim(),
		undergotype = req.body.undergotype.trim(),
		undergotime = req.body.undergotime.trim(),
		undergoinstr = req.body.undergoinstr.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息查找失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var newtrys9 = {
				tName: undergoname,
				tTime: undergotype,
				tType: undergotime,
				addt: undergoinstr
			};
			rs.trys9.push(newtrys9);
			resume.modify({
				author: uName
			}, {
				trys9: rs.trys9
			}, function(err) {
				if (err) {
					retDesc = '信息添加失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};

//论文专利
exports.paper = function(req, res, next) {
	var papername = req.body.papername.trim(),
		papertype = req.body.papertype.trim(),
		papertime = req.body.papertime.trim(),
		paperinstr = req.body.paperinstr.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息查找失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			var newPatentPaper10 = {
				ppName: papername,
				ppTime: papertype,
				ppType: papertime,
				addt: paperinstr
			};
			rs.PatentPaper10.push(newPatentPaper10);
			resume.modify({
				author: uName
			}, {
				PatentPaper10: rs.PatentPaper10
			}, function(err) {
				if (err) {
					retDesc = '信息添加失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};

//核心技能
exports.desc = function(req, res, next) {
	var desCon = req.body.desCon.trim();
	uName = req.session.user.username;

	resume.findByUname(uName, function(err, rs) {
		if (err) {
			retDesc = '信息查找失败！';
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			rs.Technology11.push(desCon);
			resume.modify({
				author: uName
			}, {
				Technology11: rs.Technology11
			}, function(err) {
				if (err) {
					retDesc = '信息添加失败！';
					return res.send({
						retCode: 400,
						retDesc: retDesc
					});
				} else {
					return res.send({
						retCode: 200
					});
				}
			});
		}
	});
};

//初始化
exports.resumeInit = function(req, res, next) {
	uName = req.body.uName;
	var newResume = new resume.Resume({
		author: uName,
		headimg: '/images/headimg.jpg',
		Technology11: [
			'能运用 javascript，JQuery，Json，Ajax，CSS + Div 布局迚行网站开发',
			'熟悉 LESS，SASS，HTML5，CSS3，BootStrap 等网站前端开发技术',
			'掌握面向对象和多线程编程的思想，具有扎实的 JAVA，C++和 MFC 编程功底',
			'熟练 Eclipse，MyEclipse，visual studio 等开发工具',
			'掌握常用画图软件，如 PhotoShop、3DMAX、Flash、MicroSoft Visio、Power Designer',
			'熟练掌握 J2EE、Servlet、JDBC、HTML、XML 等 JSP 网站开发技术',
			'熟练掌握 Struts2、Hibernate3、Spring2 开源框架，熟悉 MVC 模式下的 JAVA WEB 开发',
			'具备良好的英语听说读写能力，日语能力良好',
			'掌握会声会影视频制作软件，幵做过相关视频'
		]
	});

	resume.create(newResume, function(err) {
		if (err) {
			retDesc = "保存失败,请稍后再试!";
			return res.send({
				retCode: 400,
				retDesc: retDesc
			});
		} else {
			return res.send({
				retCode: 200
			});
		}
	});
};
