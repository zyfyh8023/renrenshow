$(document).ready(function() {

	//分页事件
	var $allArticles=$("#zy-all-exps");
	$allArticles.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/allexpPS',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		htmls+='<li class="am-g am-list-item-desced"><div class=" am-list-main"><h3 class="am-list-item-hd">';
						htmls+='<a target="_blank" href="/'+__data.uName+'/blogs_exp?aid='+data.allArticles[i]._id+'">';
						htmls+=(i+1)+'、'+data.allArticles[i].experienceTitle;
						htmls+='</a></h3><div class="am-list-item-text">'+data.allArticles[i].experienceCont+'</div>';
						htmls+='</div></li>';
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