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
			    		htmls+='<li class="am-g am-list-item-desced"><div class="am-list-main"><h3 class="am-list-item-hd">';
			    		htmls+='<a target="_blank" href="/'+data.allArticles[i].author+'/blogs_exp?aid='+data.allArticles[i]._id+'">'+data.allArticles[i].experienceTitle+'</a></h3><div class="am-list-item-text">';
			    		htmls+=data.allArticles[i].experienceCont+'</div></div></li>';
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