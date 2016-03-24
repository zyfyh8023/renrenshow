$(document).ready(function() {

	//分页事件
	var $allArticles=$("#zy-main-allarts");
	$allArticles.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/allArts',   
			    data:{
			    	curstep: pagenum,
			    	typ: __data.typ
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
    			    	htmls+='<li class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left"><div class="am-u-sm-2 am-list-thumb"><a href="javascript:void(0);">';
    			    	if(data.allArticles[i].articleImgs.length>0){
    			    		htmls+='<img src="'+data.allArticles[i].articleImgs[0]+'" />';
    			    	}else{
    			    		htmls+='<img src="/images/default.png" />';
    			    	}
    		    		htmls+='</a></div><div class=" am-u-sm-10 am-list-main"><h3 class="am-list-item-hd">';	
    					htmls+='<a href="#">'+data.allArticles[i].articleTitle+'</a></h3>';	
    					htmls+='<div class="am-list-item-text">'+data.allArticles[i].articleAbstract+'</div></div></li>';	
			    	}
			    	$allArticles.find(".zy-list-ul").html(htmls);   //模板的引入使用？？			
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	
})