$(document).ready(function() {

	//分页事件
	var $manageComs=$("#zy-manageComs");
	$manageComs.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/comPageSearch',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName,
			    	comTyp: __data.comTyp
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls="";
			    	for(var i=0, len=data.allComments.length;i<len;i++){
		    			var txt="", linkstr='';
		    			if(data.allComments[i].CommentArt) { 
		    				txt='博文';
		    				linkstr='<a href="/'+__data.uName+'/blogs_art?aid='+data.allComments[i].CommentArt+'"">查看</a>';
		    			}else {
		    				txt='面经';
		    				linkstr='<a href="/'+__data.uName+'/blogs_exp?aid='+data.allComments[i].CommentExp+'"">查看</a>';
		    			}
			    		var htmlTemp=
			    			'<tr  data-ids="'+data.allComments[i]._id+'">'+
			    			'<td class="am-text-middle">'+(((pagenum-1)*10)+(i+1))+'</td>'+
			    			'<td class="am-text-middle">'+cutStr(data.allComments[i].CommentCont, 100, '...')+'</td>'+
			    			'<td class="am-text-middle"><a href="#"><img style="width:20%;border-radius:100%;"src='+ data.allComments[i].authorImg +'><br>'+data.allComments[i].author+'</a></td>'+
			    			'<td class="am-text-middle">'+dateformat(data.allComments[i].cTime)+'</td>'+
			    			'<td class="am-text-middle">'+txt+'</td>'+
			    			'<td class="am-text-middle">'+linkstr;
			    		htmlTemp+='</td></tr>';
			    		htmls+=htmlTemp;
			    	}      
			        $manageComs.find("tbody").html(htmls);
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});
	
})
