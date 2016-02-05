"use strict";
var checkState = require('./checkState');

var retCode, retDesc, uName, cssFils, jsFils;

/* GET home page. */
exports.page = function(req, res, next) {

	checkState.myState(req, function(err, rs){

		//   http://localhost:3000/myindex?pubId=zyfyh8023@163.com
		//   http://localhost:3000/myindex?priId=zyfyh8023@163.com&vCode=1452912052539
		//   http://localhost:3000/myindex?priId=zyfyh8023@163.com&vCode=1453186872168
		
		if(err){
			res.redirect('/error');
		}else{
			console.log(rs.modules);
			if(rs.signed=='2' && rs.uName!=""){   //特权身份
				res.render('./userIndex/myindex', {
					signed: rs.signed,
					title: rs.uName+'的网站首页-人人秀',
					cssFils:['userIndex/myindex']
				});
			}else if(rs.signed=='3' && rs.uName!=""){   //游客身份 
				res.render('./userIndex/myindex', {
					signed: rs.signed,
					title: rs.uName+'的网站首页-人人秀',
					cssFils:['userIndex/myindex']
				});
			}else if(rs.signed=='1' && rs.uName!=""){   //已登录状态
				res.render('./userIndex/myindex', {
					uName: rs.uName,
					signed: rs.signed,
					title: '我的网站首页-人人秀',
					cssFils:['userIndex/myindex']
				});
			}else{    //错误页面
				 res.redirect('/error');
			}
		}
		
	});

};
