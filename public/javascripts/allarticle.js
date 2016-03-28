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
			    		if(data.allArticles[i].articleImgs.length>0){
			    			var imgTmp=data.allArticles[i].articleImgs[0].split('..'); 
			    			data.allArticles[i].articleImgs[0]=imgTmp[1];
			    		}
			    		var htmlsTmp= baidu.template('allArts',data.allArticles[i]); 
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