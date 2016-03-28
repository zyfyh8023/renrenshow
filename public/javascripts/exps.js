$(document).ready(function() {

	//分页事件
	var $allArticles=$("#zy-main-allinfos");
	$allArticles.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/allExps',   
			    data:{
			    	curstep: pagenum
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		var htmlsTmp= baidu.template('allExps',data.allArticles[i]); 
			    		htmls+= htmlsTmp;
			    	}
			    	$allArticles.find(".zy-list-ul").html(htmls);   		
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	
})