var resume = require('../../models/resume');
var checkState = require('../checkState');
var comment = require('../../models/comment');
var url = require('url');
var async = require('async');

/* GET demo page. */
exports.awards = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
		getAwdComs(urls.ids, rs.uName, function(err, results){
			if(err){
			    res.redirect('/error');
			}else{
				allres=results;
				if(rs.signed=='1'){
					res.render('./userResume/userSCI/awardInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '我的荣誉奖励',
						rs: results.awdObj,
						rs2: results.awdComs,
						ids: urls.ids
					});
				}else if(rs.signed=='2'){
					res.render('./userResume/userSCI/awardInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的荣誉奖励(特权)',
						rs: results.awdObj,
						rs2: results.awdComs,
						ids: urls.ids
					});
				}else{
					res.render('./userResume/userSCI/awardInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的荣誉奖励(普通)',
						rs: results.awdObj,
						rs2: results.awdComs,
						ids: urls.ids
					});
				}
			}
		})
	})
	
};


function getAwdComs(ids, uName, callFn) {
    async.waterfall([
        function(callback){
            resume.findAll({author: uName}, function(err, resul1){
            	if(err){
            		callback(err,null);
            	}else{
            		callback(null,resul1[0]['schools3'][ids]);
            	}
            });
        },
        function(data,callback){
    		comment.findAll({'artAuthor':uName,'CommentResumeTyp':'3','CommentResumeVal':ids}, function(err, resul2) {
    		    if (err) {
    		        callback(err,null);
    		    } else {
    		        if (resul2) {
    		        	var data2={
    		        		awdObj:data,
    		        		awdComs: resul2
    		        	}
    		            callback(null,data2);
    		        } else {
    		        	callback('no data',null);
    		        }
    		    }
    		});
        }],
        function(error,result){
            if(error){
                callFn(error, null);
            }
            else{
                callFn(null, result);
            }
        }
    );
}

exports.companys1 = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
		getCmp1Coms(urls.ids, rs.uName, function(err, results){
			if(err){
			    res.redirect('/error');
			}else{
				allres=results;
				if(rs.signed=='1'){
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '我的实习经历',
						jobTyp: '实习',
						rs: results.cmp1Obj,
						rs2: results.cmp1Coms,
						ids: urls.ids
					});
				}else if(rs.signed=='2'){
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的实习经历(特权)',
						jobTyp: '实习',
						rs: results.cmp1Obj,
						rs2: results.cmp1Coms,
						ids: urls.ids
					});
				}else{
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的实习经历(普通)',
						jobTyp: '实习',
						rs: results.cmp1Obj,
						rs2: results.cmp1Coms,
						ids: urls.ids
					});
				}
			}
		});
	});
	
};


function getCmp1Coms(ids, uName, callFn) {
    async.waterfall([
        function(callback){
            resume.findAll({author: uName}, function(err, resul1){
            	if(err){
            		callback(err,null);
            	}else{
            		callback(null,resul1[0]['schools3'][ids]);
            	}
            });
        },
        function(data,callback){
    		comment.findAll({'artAuthor':uName,'CommentResumeTyp':'7','CommentResumeVal':ids}, function(err, resul2) {
    		    if (err) {
    		        callback(err,null);
    		    } else {
    		        if (resul2) {
    		        	var data2={
    		        		cmp1Obj:data,
    		        		cmp1Coms: resul2
    		        	}
    		            callback(null,data2);
    		        } else {
    		        	callback('no data',null);
    		        }
    		    }
    		});
        }],
        function(error,result){
            if(error){
                callFn(error, null);
            }
            else{
                callFn(null, result);
            }
        }
    );
}


exports.companys2 = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
		getCmp2Coms(urls.ids, rs.uName, function(err, results){
			if(err){
			    res.redirect('/error');
			}else{
				allres=results;
				if(rs.signed=='1'){
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '我的工作经历',
						jobTyp: '正式工作',
						rs: results.cmp2Obj,
						rs2: results.cmp2Coms,
						ids: urls.ids
					});
				}else if(rs.signed=='2'){
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的工作经历(特权)',
						jobTyp: '正式工作',
						rs: results.cmp2Obj,
						rs2: results.cmp2Coms,
						ids: urls.ids
					});
				}else{
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的工作经历(普通)',
						jobTyp: '正式工作',
						rs: results.cmp2Obj,
						rs2: results.cmp2Coms,
						ids: urls.ids
					});
				}
			}
		})
	})
	
};


function getCmp2Coms(ids, uName, callFn) {
    async.waterfall([
        function(callback){
            resume.findAll({author: uName}, function(err, resul1){
            	if(err){
            		callback(err,null);
            	}else{
            		callback(null,resul1[0]['schools3'][ids]);
            	}
            });
        },
        function(data,callback){
    		comment.findAll({'artAuthor':uName,'CommentResumeTyp':'4','CommentResumeVal':ids}, function(err, resul2) {
    		    if (err) {
    		        callback(err,null);
    		    } else {
    		        if (resul2) {
    		        	var data2={
    		        		cmp2Obj:data,
    		        		cmp2Coms: resul2
    		        	}
    		            callback(null,data2);
    		        } else {
    		        	callback('no data',null);
    		        }
    		    }
    		});
        }],
        function(error,result){
            if(error){
                callFn(error, null);
            }
            else{
                callFn(null, result);
            }
        }
    );
}


exports.schools = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
		getEduComs(urls.ids, rs.uName, function(err, results){
			if(err){
			    res.redirect('/error');
			}else{
				allres=results;
				if(rs.signed=='1'){
					res.render('./userResume/userSCI/schoolInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '我的教育经历',
						rs: results.eduObj,
						rs2: results.eduComs,
						ids: urls.ids
					});
				}else if(rs.signed=='2'){
					res.render('./userResume/userSCI/schoolInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的教育经历(特权)',
						rs: results.eduObj,
						rs2: results.eduComs,
						ids: urls.ids
					});
				}else{
					res.render('./userResume/userSCI/schoolInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的教育经历(普通)',
						rs: results.eduObj,
						rs2: results.eduComs,
						ids: urls.ids
					});
				}
			}
		})
	})
	
};

function getEduComs(ids, uName, callFn) {
    async.waterfall([
        function(callback){
            resume.findAll({author: uName}, function(err, resul1){
            	if(err){
            		callback(err,null);
            	}else{
            		callback(null,resul1[0]['schools3'][ids]);
            	}
            });
        },
        function(data,callback){
    		comment.findAll({'artAuthor':uName,'CommentResumeTyp':'5','CommentResumeVal':ids}, function(err, resul2) {
    		    if (err) {
    		        callback(err,null);
    		    } else {
    		        if (resul2) {
    		        	var data2={
    		        		eduObj:data,
    		        		eduComs: resul2
    		        	}
    		            callback(null,data2);
    		        } else {
    		        	callback('no data',null);
    		        }
    		    }
    		});
        }],
        function(error,result){
            if(error){
                callFn(error, null);
            }
            else{
                callFn(null, result);
            }
        }
    );
}

exports.works = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
		getWrkComs(urls.ids, rs.uName, function(err, results){
			if(err){
			    res.redirect('/error');
			}else{
				allres=results;
				if(rs.signed=='1'){
				    res.render('./userResume/userSCI/worksInfo', {
				    	uName: rs.uName,
				    	signed: rs.signed,
				    	vCode: rs.vCode,
				    	modules: rs.modules,
				    	title: '我的作品查看',
				    	rs: results.wrkObj,
				    	rs2: results.wrkComs,
				    	ids: urls.ids
				    });
				}else if(rs.signed=='2'){
					res.render('./userResume/userSCI/worksInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的作品查看(特权)',
						rs: results.wrkObj,
						rs2: results.wrkComs,
						ids: urls.ids
					});
				}else{
					res.render('./userResume/userSCI/worksInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的作品查看(普通)',
						rs: results.wrkObj,
						rs2: results.wrkComs,
						ids: urls.ids
					});
				}
			}
		});
	});

};

function getWrkComs(ids, uName, callFn) {
    async.waterfall([
        function(callback){
            resume.findAll({author: uName}, function(err, resul1){
            	if(err){
            		callback(err,null);
            	}else{
            		callback(null,resul1[0]['schools3'][ids]);
            	}
            });
        },
        function(data,callback){
    		comment.findAll({'artAuthor':uName,'CommentResumeTyp':'6','CommentResumeVal':ids}, function(err, resul2) {
    		    if (err) {
    		        callback(err,null);
    		    } else {
    		        if (resul2) {
    		        	var data2={
    		        		wrkObj:data,
    		        		wrkComs: resul2
    		        	}
    		            callback(null,data2);
    		        } else {
    		        	callback('no data',null);
    		        }
    		    }
    		});
        }],
        function(error,result){
            if(error){
                callFn(error, null);
            }
            else{
                callFn(null, result);
            }
        }
    );
}