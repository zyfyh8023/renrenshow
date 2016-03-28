$(document).ready(function() {

	//分页事件
	var $userAllBlog1=$("#zy-userAllBlog1");
	$userAllBlog1.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/pageSearchArt',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName,
			    	artTyp: __data.artTyp
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){

			    		if(data.allArticles[i].articleType=='01'){
			    			data.allArticles[i].articleType='前端开发';
			    		}else if(data.allArticles[i].articleType=='02'){
			    			data.allArticles[i].articleType='后端开发';
			    		}else if(data.allArticles[i].articleType=='03'){
			    			data.allArticles[i].articleType='客户端开发';
			    		}else if(data.allArticles[i].articleType=='04'){
			    			data.allArticles[i].articleType='数据库开发';
			    		}else if(data.allArticles[i].articleType=='05'){
			    			data.allArticles[i].articleType='产品运营';
			    		}else{
			    			data.allArticles[i].articleType='UI设计';
			    		}
			    		data.allArticles[i]._idTmp=(((pagenum-1)*10)+(i+1));
			    		data.allArticles[i].cTime=dateformat(data.allArticles[i].cTime);
			    		var htmlsTmp= baidu.template('userAllBlog1',data.allArticles[i]); 
			    		htmls+= htmlsTmp;
			    	}      
			        $userAllBlog1.find("tbody").html(htmls);
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});


})