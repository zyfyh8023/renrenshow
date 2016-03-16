var resume = require('../../models/resume');
var checkState = require('../checkState');
var url = require('url');

/* GET demo page. */
exports.awards = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
		resume.findByUname(rs.uName, function(err, rs2) {
			if (err) {
				res.redirect('/error');
			} else {
				if(rs.signed=='1'){
					console.log(rs2.Certificate6[urls.ids]);
					allres=rs2;
					res.render('./userResume/userSCI/awardInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '荣誉奖励',
						rs: rs2.Certificate6[urls.ids]
					});
				}else if(rs.signed=='2'){
					console.log(rs2.Certificate6[urls.ids]);
					allres=rs2;
					res.render('./userResume/userSCI/awardInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '荣誉奖励',
						rs: rs2.Certificate6[urls.ids]
					});
				}else{
					console.log(rs2.Certificate6[urls.ids]);
					allres=rs2;
					res.render('./userResume/userSCI/awardInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '荣誉奖励',
						rs: rs2.Certificate6[urls.ids]
					});
				}
			}
		});
	});
	
};

exports.companys1 = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
		resume.findByUname(rs.uName, function(err, rs2) {
			if (err) {
				res.redirect('/error');
			} else {
				if(rs.signed=='1'){
					console.log(rs2.experience4[urls.ids]);
					allres=rs2;
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '实习经历',
						jobTyp: '实习',
						rs: rs2.experience4[urls.ids]
					});
				}else if(rs.signed=='2'){
					console.log(rs2.experience4[urls.ids]);
					allres=rs2;
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '实习经历',
						jobTyp: '实习',
						rs: rs2.experience4[urls.ids]
					});
				}else{
					console.log(rs2.experience4[urls.ids]);
					allres=rs2;
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '实习经历',
						jobTyp: '实习',
						rs: rs2.experience4[urls.ids]
					});
				}
			}
		});
	});
	
};

exports.companys2 = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
		resume.findByUname(rs.uName, function(err, rs2) {
			if (err) {
				res.redirect('/error');
			} else {
				if(rs.signed=='1'){
					console.log(rs2.work5[urls.ids]);
					allres=rs2;
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: '我的工作经历',
						jobTyp: '正式工作',
						rs: rs2.work5[urls.ids]
					});
				}else if(rs.signed=='2'){
					console.log(rs2.work5[urls.ids]);
					allres=rs2;
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的工作经历(特权)',
						jobTyp: '正式工作',
						rs: rs2.work5[urls.ids]
					});
				}else{
					console.log(rs2.work5[urls.ids]);
					allres=rs2;
					res.render('./userResume/userSCI/companyInfo', {
						uName: rs.uName,
						signed: rs.signed,
						vCode: rs.vCode,
						modules: rs.modules,
						title: 'TA的工作经历(普通)',
						jobTyp: '正式工作',
						rs: rs2.work5[urls.ids]
					});
				}
			}
		});
	});
	
};

exports.schools = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
		resume.findByUname(rs.uName, function(err, rs2) {
			if (err) {
				res.redirect('/error');
			} else {
				if (rs2) {
					if(rs.signed=='1'){
						console.log(rs2.schools3[urls.ids]);
						allres=rs2;
						res.render('./userResume/userSCI/schoolInfo', {
							uName: rs.uName,
							signed: rs.signed,
							vCode: rs.vCode,
							modules: rs.modules,
							title: '我的教育经历',
							rs: rs2.schools3[urls.ids]
						});
					}else if(rs.signed=='2'){
						console.log(rs2.schools3[urls.ids]);
						allres=rs2;
						res.render('./userResume/userSCI/schoolInfo', {
							uName: rs.uName,
							signed: rs.signed,
							vCode: rs.vCode,
							modules: rs.modules,
							title: 'TA的教育经历(特权)',
							rs: rs2.schools3[urls.ids]
						});
					}else{
						console.log(rs2.schools3[urls.ids]);
						allres=rs2;
						res.render('./userResume/userSCI/schoolInfo', {
							uName: rs.uName,
							signed: rs.signed,
							vCode: rs.vCode,
							modules: rs.modules,
							title: 'TA的教育经历(普通)',
							rs: rs2.schools3[urls.ids]
						});
					}
				}else{
					res.redirect('/error');
				}
			}
		});
	});
	
};

exports.works = function(req, res) {
	var urls=url.parse(req.url, true).query;

	checkState.myState(req, res, function(rs){
    	resume.findByUname(rs.uName, function(err, result) {
    		if (err) {
    			res.redirect('/error');
    		} else {
    			if (result) {
    				allres=result;
    				if(rs.signed=='1'){
    				    res.render('./userResume/userSCI/worksInfo', {
    				    	uName: rs.uName,
    				    	signed: rs.signed,
    				    	vCode: rs.vCode,
    				    	modules: rs.modules,
    				    	title: '我的作品查看',
    				    	rs: result.pWorks7[urls.ids]
    				    });
    				}else if(rs.signed=='2'){
    					res.render('./userResume/userSCI/worksInfo', {
    						uName: rs.uName,
    						signed: rs.signed,
    						vCode: rs.vCode,
    						modules: rs.modules,
    						title: 'TA的作品查看(特权)',
    						rs: result.pWorks7[urls.ids]
    					});
    				}else{
    					res.render('./userResume/userSCI/worksInfo', {
    						uName: rs.uName,
    						signed: rs.signed,
    						vCode: rs.vCode,
    						modules: rs.modules,
    						title: 'TA的作品查看(普通)',
    						rs: result.pWorks7[urls.ids]
    					});
    				}
    			} else {
    				res.redirect('/error');
    			}
    		}
    	});
	});

};
