$(document).ready(function() {
	var iptVal='';
	//分页事件
	var $allUsers=$("#zy-users-div");
	$allUsers.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			getAjax(pagenum,iptVal); 
		}
	});

	$allUsers.delegate('#zy-search-btn', 'click', function(event) {
		iptVal=$('.J_zy-ipt', $allUsers).val();
		getAjax('xxx',iptVal);
	});

	$allUsers.delegate('.J_zy-ipt', 'keyup', function(event) {
		var keyVal=event.which;
		if(keyVal==13){
			$("#zy-search-btn", $allUsers).trigger("click");
		}
	});

 	if($.browser.msie) {
	  	$('input:checkbox').click(function () {
	   		this.blur();  
	   		this.focus();
	  	});  
	}

	$(".J_checkboxItem",$allUsers).change(function() {
		getAjax('xxx',iptVal);
	});

})

function getAjax(btnSign, iptVal){
	var worktime=getWorktime(),
		education=getEducation();

	$.ajax({    
	    type:'post',        
	    url:'/allUserPS',   
	    data:{
	    	curstep: btnSign,
	    	iptVal: iptVal,
	    	worktime: worktime,
	    	education: education
	    },
	    dataType:'json',    
	    success: function(data){
	    	console.log(data);
	    	var htmls="<div style='margin:6rem auto;color:#666;font-size:15px;width:100%;text-align:center'>没有查找到符合条件的信息</div>", htmls2='';
	    	if(data.allArticles.length>0){
	    		htmls='';
	    		for(var i=0, len=data.allArticles.length;i<len;i++){
	    			htmls+='<a target="_blank" href="/'+data.allArticles[i].username+'/index">';
	    			htmls+='<div class="am-u-lg-2 am-u-md-3 am-u-sm-6 am-u-end">';
	    			htmls+='<img style="width:100%" src="'+data.allArticles[i].headimg+'" alt="" class="am-img-thumbnail am-circle">';
	    			var temp=data.allArticles[i].username.split('@');
	    			htmls+='<div class="zy-talent-name"><h3>'+temp[0]+'</h3>';
	    			htmls+='</div></div></a>';
	    		}
	    	}
			$("#zy-users-div").find("#zy-all-users").html(htmls);   

			htmls2+='共'+data.allpage+'页&nbsp';
			if(data.showpagetip > 1) {
				htmls2+='<li class="J_pre-page"><a href="javascript:void(0);">&laquo;</a></li>';
				for(var i=1; i<=data.showpagetip; i++) {
					if(i==btnSign) { 
						htmls2+='<li class="am-active"><a href="javascript:void(0);">'+i+'</a></li>';
					}else{ 
						htmls2+='<li><a href="javascript:void(0);">'+i+'</a></li>';
					}
				}
				htmls2+='<li class="J_next-page"><a href="javascript:void(0);">&raquo;</a></li>';
			}
			$('#pageShow ul', "#zy-users-div").html(htmls2);
	    },
	    error : function() {   
	        alert('err');    	
	    }        
	});  
}

function getWorktime(){
	var worktime='';
	$("input[name='worktime']:checked").each(function(){
		worktime+=$(this).val()+',';
	})
	return worktime;
}

function getEducation(){
	var education='';
	$("input[name='education']:checked").each(function(){
		education+=$(this).val()+',';
	})
	return education;
}