$(document).ready(function() {

	//分页事件
	var $userAllBlog2=$("#zy-userAllBlog2");
	$userAllBlog2.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/pageSearchExp',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName,
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		data.allArticles[i]._idTmp=(((pagenum-1)*10)+(i+1));
			    		data.allArticles[i].cTime=dateformat(data.allArticles[i].cTime);
			    		var htmlsTmp= baidu.template('userAllBlog2',data.allArticles[i]); 
			    		htmls+= htmlsTmp;
			    	}      
			        $userAllBlog2.find("tbody").html(htmls);
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	
})