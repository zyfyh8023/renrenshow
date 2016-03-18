$(document).ready(function() {

	//分页事件
	var $allUsers=$("#zy-users-div");
	$allUsers.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/allUserPS',   
			    data:{
			    	curstep: pagenum
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		htmls+='<a target="_blank" href="/'+data.allArticles[i].username+'/index">';
			    		htmls+='<div class="am-u-lg-2 am-u-md-3 am-u-sm-6 am-u-end">';
			    		htmls+='<img style="width:100%" src="'+data.allArticles[i].headimg+'" alt="" class="am-img-thumbnail am-circle">';
			    		var temp=data.allArticles[i].username.split('@');
			    		htmls+='<div class="zy-talent-name"><h3>'+temp[0]+'</h3>';
			    		htmls+='</div></div></a>';
			    	}
					$allUsers.find("#zy-all-users").html(htmls);   
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	
})