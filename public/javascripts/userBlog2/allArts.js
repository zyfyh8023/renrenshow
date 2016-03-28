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
			    		var htmlsTmp= baidu.template('allArts',data.allArticles[i]); 
			    		htmls+= htmlsTmp;
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