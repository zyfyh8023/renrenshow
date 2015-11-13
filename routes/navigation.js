"use strict";
var navigations = require('../models/navigation');

/* GET navigation page. */
exports.page=function(req, res, next) {
	var uName=req.session.user.username;
	var errorTip;
	navigations.findByUname(uName,function(err, results){
        if(err){
        	errorTip="用户的资源导航查找失败!";
            console.log(errorTip);
            res.redirect('myError');    
        }else{
        	if(results.length>1){
	                errorTip="数据被多次插入，应禁止多次创建，数据库设计唯一或者后端检测!";
	                console.log(errorTip);
	                res.redirect('myError');
	                return;
	        }else{
	          	if(results.length==0){
	          		errorTip="数据未初始化!";
	                console.log(errorTip);
	          		res.render('navigation', { title: '资源导航',allNavgition:false});
	          	}else{
	          		var resultFin=results[0];
		        	for(var k=0;k<resultFin.models.length;k++){
		        		for(var s=0;s<resultFin.models[k].modelsuns.length;s++){
		        			resultFin.models[k].modelsuns.sort(getSortFun('asc', 'sunSque'));
		        		}
		        		resultFin.models.sort(getSortFun('asc', 'sque'));
		        	}
		        	res.render('navigation', { title: '资源导航',allNavgition:resultFin});
	          	} 
	        }
        }
	});
}
function getSortFun(order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

//暂不需要
exports.getList=function(req, res, next){
	navigations.findByUname("zoujiahua@173.com",function(err, result){
        if(err){
            console.log("用户名查找出现问题！");
            //return res.render('/', {title: '用户名查找出现问题！'});   //这些无措处理，以及信息提示的待后期处理
        }
        if(result.length>0){
        	console.log(result);
        }else{
        	console.log("no data!");
        }
	});
}

//删除大标题
exports.listDel=function(req, res, next){
	var uName=req.session.user.username;
	var modelName=req.body.navName;
	var errorTip;
	navigations.findByUname(uName,function(err, results){
        if(err){
        	errorTip="用户数据查找出现问题!";
            console.log(errorTip);
            res.redirect('myError'); 
        }else{
        	if(results.length>1){
	                errorTip="数据被多次插入，应禁止多次创建，数据库设计唯一或者后端检测!";
	                console.log(errorTip);
	                res.redirect('myError');
	        }else{
	          	if(results.length==0){
	          		errorTip="数据未初始化!";
	                console.log(errorTip);
	          		res.render('navigation', { title: '资源导航',allNavgition:false});
	          	}else{
	          		var resultFin=results[0];
		        	for(var k=0;k<resultFin.models.length;k++){
		        		if(resultFin.models[k].modelsName==modelName){
		        			resultFin.models.splice(k,1);
		        			navigations.modify({author:uName},{models:resultFin.models},function(err){
				        		if(err){
				        			res.send({code:'400'});   //res.jsonp()   res.write()
						 			res.end();
				        		}else{
					        		res.send({code:'200',modelName:modelName});
							 		res.end();
				        		}
				        	});
		        		}
		        	}
	          	}
	        }
        }
    });     
}

//添加大标题
exports.listAdd=function(req, res, next){
	var uName=req.session.user.username;
	var modelName=req.body.navName;
	var errorTip;
	navigations.findByUname(uName,function(err, results){
        if(err){
        	errorTip="用户数据查找出现问题!";
            console.log(errorTip);
            res.redirect('myError'); 
         }else{
         	if(results.length>1){
                errorTip="数据被多次插入，应禁止多次创建，数据库设计唯一或者后端检测!";
                console.log(errorTip);
                res.redirect('myError');
	        }else{
	          	if(results.length==0){
	          		errorTip="数据未初始化!";
	                console.log(errorTip);
	          		res.render('navigation', { title: '资源导航',allNavgition:false});
	          	}else{
	          		var resultFin=results[0];
		        	for(var k=0;k<resultFin.models.length;k++){
		        		if(resultFin.models[k].modelsName==modelName){
		        			console.log("已存在该分类");
		        			res.send(false);   //res.jsonp()   res.write()
						 	res.end();
						 	return;
		        		}
		        	}
		        	var newModel={
		        		modelsName:modelName,
		        		sque:k+1,
		        		modelsuns:[]
		        	};
		        	resultFin.models.push(newModel);
		        	navigations.modify({author:uName},{models:resultFin.models},function(err){
		        		if(err){
		        			console.log("添加失败");
		        			res.send(false);   //res.jsonp()   res.write()
				 			res.end();
		        		}else{
			        		res.send(true);   //res.jsonp()   res.write()
					 		res.end();
		        		}
		        	});
	          	} 
	        }
         }
	});
}

//添加小链接元素
exports.listAdd2=function(req, res, next){
	navigations.findByUname("zoujiahua@173.com",function(err, result){
        if(err){
            console.log("用户名查找出现问题！");
            //return res.render('/', {title: '用户名查找出现问题！'});   //这些无措处理，以及信息提示的待后期处理
        }
        if(result.length>0){
    		var resultFin=result[0];
        	for(var k=0;k<resultFin.modelsNum;k++){
        		if(resultFin.models[k].modelsName==req.body.parentName){
        			var newSunSque= resultFin.models[k].modelsunNum+1;
    				var newModelSun={
		        		sunName:req.body.parentName+"是1",
		        		sunDesc:"速度加愤怒的时间仿佛热热身",
		        		sunSque:newSunSque,
		        		sunUrl:"http://www.baidu.com"
        			};
        			resultFin.models[k].modelsuns.push(newModelSun);
        			console.log(resultFin.models[k].modelsuns);
        			resultFin.models[k].modelsunNum=resultFin.models[k].modelsunNum+1;
		        	navigations.modify({author:"zoujiahua@173.com"},{models:resultFin.models},function(err){
		        		if(err){
		        			console.log("you cuo wu");
		        			res.send("false");   //res.jsonp()   res.write()
				 			res.end();
		        		}else{
		        			console.log("ok");
			        		res.send("true");   //res.jsonp()   res.write()
					 		res.end();
		        		}
		        	});
        		}
        	}
        }else{
        	console.log("no data!");
        }
	});
}

exports.listInit=function(req, res, next){
	var uName=req.session.user.username;
	var newNavigation = new navigations.Navigation({
        author: uName,
	    modelsNum:3,
	    models:[
		    {
		        modelsName:"前端开发资源", 
		        sque:3,
		        modelsunNum:8,
		        modelsuns:[{
		            sunSque:8,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大前端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:7,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大前端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:6,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大前端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:5,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大前端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:4,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大前端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:3,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大前端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:2,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大前端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:1,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大前端",
		            sunUrl:"http://www.baidu.com"
		        }]
		    },
		    {
		        modelsName:"后端开发资源", 
		        sque:2,
		        modelsunNum:5,
		        modelsuns:[{
		            sunSque:1,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大后端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:2,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大后端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:3,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大后端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:4,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大后端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:5,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大后端",
		            sunUrl:"http://www.baidu.com"
		        }]
	    	},
	    	{
		        modelsName:"客户端开发资源", 
		        sque:1,
		        modelsunNum:4,
		        modelsuns:[{
		            sunSque:1,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"客户端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:2,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大后端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:3,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大后端",
		            sunUrl:"http://www.baidu.com"
		        },
		        {
		            sunSque:4,
		            sunDesc:"视频资源大视视频视频资源大汇总3资源大视频资源大汇总3汇总3",
		            sunName:"大后端",
		            sunUrl:"http://www.baidu.com"
		        }]
	    	}
	    ]
    });

  	navigations.create(newNavigation,function(err){
        if(err){
	         res.send("false");   //res.jsonp()   res.write()
			 res.end();
	 	 }else{
        	 res.send("true");   //res.jsonp()   res.write()
			 res.end();
        }
	});
}