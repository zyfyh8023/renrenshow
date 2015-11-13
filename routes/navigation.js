"use strict";
var navigations = require('../models/navigation');

var retCode, retDesc, uName;

/* GET navigation page. */
exports.page=function(req, res, next) {
	uName=req.session.user.username;
	navigations.findByUname(uName,function(err, results){
        if(err){ 
			retDesc="用户的资源导航查找失败!";
          	res.redirect('myError?retDesc='+retDesc);
        }else{
        	if(results){
	        	for(var k=0;k<results.models.length;k++){
	        		for(var s=0;s<results.models[k].modelsuns.length;s++){
	        			results.models[k].modelsuns.sort(getSortFun('asc', 'sunSque'));
	        		}
	        		results.models.sort(getSortFun('asc', 'sque'));
	        	}
	        	res.render('navigation', { title: '资源导航',allNavgition:results});
        	}else{
				retDesc="数据未初始化!";
	          	res.redirect('myError?retDesc='+retDesc); 
        	}
        }
	});
}

function getSortFun(order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

//删除大标题
exports.listDel=function(req, res, next){
	uName = req.session.user.username;
	var modelName = req.body.navName;
	navigations.findByUname(uName,function(err, results){
        if(err){
        	retDesc='用户数据查找出现问题';
        	return res.send({retCode:400, retDesc:retDesc});   
        }else{
        	if(results){
	        	for(var k=0;k<results.models.length;k++){
	        		if(results.models[k].modelsName==modelName){
	        			results.models.splice(k,1);
	        			navigations.modify({author:uName},{models:results.models},function(err){
			        		if(err){
			        			retDesc='用户数据更新出现问题';
			        			return res.send({retCode:400, retDesc:retDesc});
			        		}else{
						 		return res.send({retCode:200});
			        		}
			        	});
	        		}
	        	}
        	}else{
        		retDesc='数据未初始化';
        		return res.send({retCode:400, retDesc:retDesc});  
        	}
        }
    });     
}

//添加大标题
exports.listAdd=function(req, res, next){
	uName=req.session.user.username;
	var modelName=req.body.navName;
	navigations.findByUname(uName,function(err, results){
        if(err){
        	retDesc='用户数据查找出现问题';
        	return res.send({retCode:400, retDesc:retDesc});  
        }else{
         	if(results){
	        	for(var k=0;k<results.models.length;k++){
	        		if(results.models[k].modelsName==modelName){
					 	retDesc='已存在该分类';
					 	return res.send({retCode:400, retDesc:retDesc}); 
	        		}
	        	}
	        	var newModel={
	        		modelsName:modelName,
	        		sque:k+1,
	        		modelsuns:[]
	        	};
	        	results.models.push(newModel);
	        	navigations.modify({author:uName},{models:results.models},function(err){
	        		if(err){
			 			retDesc='添加失败';
			 			return res.send({retCode:400, retDesc:retDesc});  
	        		}else{
				 		return res.send({retCode:200}); 
	        		}
	        	});
         	}else{
         		retDesc='数据未初始化';
         		return res.send({retCode:400, retDesc:retDesc});  
         	}
        }
	});
}

//添加小链接元素
exports.listAdd2=function(req, res, next){
	uName=req.session.user.username;
	navigations.findByUname(uName,function(err, result){
        if(err){
        	retDesc='用户名查找出现问题！';
        	return res.send({retCode:400, retDesc:retDesc}); 
        }else{
        	if(result){
	        	for(var k=0;k<result.modelsNum;k++){
	        		if(result.models[k].modelsName==req.body.parentName){
	        			var newSunSque= result.models[k].modelsunNum+1;
	    				var newModelSun={
			        		sunName:req.body.parentName+"是1",
			        		sunDesc:"速度加愤怒的时间仿佛热热身",
			        		sunSque:newSunSque,
			        		sunUrl:"http://www.baidu.com"
	        			};
	        			result.models[k].modelsuns.push(newModelSun);
	        			result.models[k].modelsunNum=result.models[k].modelsunNum+1;
			        	navigations.modify({author:"zoujiahua@173.com"},{models:result.models},function(err){
			        		if(err){
			        			retDesc='有错误！';
			        			return res.send({retCode:400, retDesc:retDesc}); 
			        		}else{
			        			return res.send({retCode:200}); 
			        		}
			        	});
	        		}
	        	}
        	}else{
        		retDesc='没有数据！';
        		return res.send({retCode:400, retDesc:retDesc}); 
        	}
        }
	});
}

exports.listInit=function(req, res, next){
	uName=req.session.user.username;
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
        	retDesc='有错误哦~';
        	return res.send({retCode:400, retDesc:retDesc}); 
	 	 }else{
	 	 	return res.send({retCode:200}); 
        }
	});
}