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
		    			}else if(data.allComments[i].CommentExp){
		    				txt='面经';
		    				linkstr='<a href="/'+__data.uName+'/blogs_exp?aid='+data.allComments[i].CommentExp+'"">查看</a>';
		    			}else{
		    				if(data.allComments[i].CommentResumeTyp=='3'){
		    					txt='简历-荣誉';
		    				linkstr='<a href="/'+__data.uName+'/resume_awd?ids='+data.allComments[i].CommentResumeVal+'"">查看</a>';
		    				}else if(data.allComments[i].CommentResumeTyp=='4'){
		    					txt='简历-工作';
		    				linkstr='<a href="/'+__data.uName+'/resume_cmp2?ids='+data.allComments[i].CommentResumeVal+'"">查看</a>';
		    				}else if(data.allComments[i].CommentResumeTyp=='5'){
		    					txt='简历-教育';
		    				linkstr='<a href="/'+__data.uName+'/resume_scl?ids='+data.allComments[i].CommentResumeVal+'"">查看</a>';
		    				}else if(data.allComments[i].CommentResumeTyp=='6'){
		    					txt='简历-作品';
		    				linkstr='<a href="/'+__data.uName+'/resume_wok?ids='+data.allComments[i].CommentResumeVal+'"">查看</a>';
		    				}else{
		    					txt='简历-实习';
		    				linkstr='<a href="/'+__data.uName+'/resume_cmp1?ids='+data.allComments[i].CommentResumeVal+'"">查看</a>';
		    				}
		    			}
		    			data.allComments[i]._idTmp=(((pagenum-1)*10)+(i+1));
		    			data.allComments[i].CommentCont=cutStr(data.allComments[i].CommentCont, 100, '...');
		    			data.allComments[i].cTime=dateformat(data.allComments[i].cTime);
		    			data.allComments[i]._txt=txt;
		    			data.allComments[i]._linkstr=linkstr;
		    			var htmlsTmp= baidu.template('allComments',data.allComments[i]); 
		    			htmls+= htmlsTmp;
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
