"use strict";
var checkState = require('../checkState');
var resume = require('../../models/resume');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	checkState.myState(req, function(err, rs){
		//   http://localhost:3000/myindex?pubId=zf@163.com
		//   http://localhost:3000/myindex?priId=zf@163.com&vCode=1455439672628
		if(err){
			res.redirect('/error');
		}else{
			console.log(rs.modules);
			if(rs.signed=='2' && rs.uName!=""){   
				res.render('./userIndex/myindex', {
					uName: rs.uName,
					signed: rs.signed,
					modules: rs.modules,
					vCode: rs.vCode,
					title: 'TA的网站首页(特权)',
					cssFils:['userIndex/myindex'],
					jsFils:['userIndex/myindex']
				});
			}else if(rs.signed=='3' && rs.uName!=""){    
				res.render('./userIndex/myindex', {
					uName: rs.uName,
					signed: rs.signed,
					modules: rs.modules,
					vCode: rs.vCode,
					title: 'TA的网站首页(普通)',
					cssFils:['userIndex/myindex'],
					jsFils:['userIndex/myindex']
				});
			}else if(rs.signed=='1' && rs.uName!=""){   
				resume.findByUname(rs.uName, function(err, result) {
				    if (err) {
				        res.redirect('/error');
				    } else {
				    	if (result) {
				    		console.log(result.Certificate6.length);
				    		var num1=result.Certificate6.length>0 ? (result.Certificate6.length>=4 ? 4 : result.Certificate6.length) : 0;
				    		console.log(num1);
				    	}
				    }
				});
				res.render('./userIndex/myindex', {
					uName: rs.uName,
					signed: rs.signed,
					vCode: rs.vCode,
					title: '我的网站首页',
					cssFils:['userIndex/myindex'],
					jsFils:['userIndex/myindex']
				});
			}else{    //错误页面
				 res.redirect('/error');
			}
		}
		
	});

};
