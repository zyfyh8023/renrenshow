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
			    		var htmlTemp=
			    			'<tr  data-ids="'+data.allArticles[i]._id+'">'+
			    			'<td class="am-text-middle">'+(((pagenum-1)*10)+(i+1))+'</td>'+
			    			'<td class="am-text-middle">'+data.allArticles[i].experienceTitle+'</td>'+
			    			'<td class="am-text-middle">'+data.allArticles[i].experienceCompany+'</td>'+
			    			'<td class="am-text-middle">'+dateformat(data.allArticles[i].cTime)+'</td>'+
			    			'<td class="am-text-middle">'+
			    			'<a target="_blank" href="/'+__data.uName+'/blogs_art?aid='+data.allArticles[i]._id+'">查看</a></td></tr>';
			    		htmls+=htmlTemp;
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