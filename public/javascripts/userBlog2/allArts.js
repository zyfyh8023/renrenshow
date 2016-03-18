$(document).ready(function() {

	//分页事件
	var $allArticles=$("#zy-all-arts");
	$allArticles.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/allartPS',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName,
			    	typ: __data.typ
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		htmls+='<li class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left">';
			    		htmls+='<div class="am-u-sm-2 am-list-thumb">';
			    		htmls+='<a href="javascript:void(0);" class="">';
			    		if(data.allArticles[i].articleImgs.length>0){
			    			htmls+='<img src="'+data.allArticles[i].articleImgs[0]+'" alt="'+data.allArticles[i].articleTitle+'" />';
			    		}else{
			    			htmls+='<img src="/images/default.png" alt="本篇文章中没有图片哦~" />';
			    		}
			    		htmls+='</a></div><div class=" am-u-sm-10 am-list-main"><h3 class="am-list-item-hd">';
			    		htmls+='<a target="_blank" href="/'+__data.uName+'/blogs_art?aid='+data.allArticles[i]._id+'" >'+data.allArticles[i].articleTitle+'</a>';
			    		htmls+='</h3><div class="am-list-item-text">'+data.allArticles[i].articleAbstract+'</div></div></li>';
			    	}
					$allArticles.find(".am-list-news-bd ul").html(htmls);   //模板的引入使用？？
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	
})