$(document).ready(function() {

	//分页事件
	var $manageExperience=$("#zy-manageExperience");
	$manageExperience.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/expPageSearch',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName,
			    	experienceTag: __data.experienceTag
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
			    			'<a href="javascript:void(0);" class="zy-del-art">删除</a><br>'+
			    			'<a href="/'+__data.uName+'/blogs_exp?aid='+data.allArticles[i]._id+'">查看</a><br>';

			    		if(data.allArticles[i].experienceTag=='0'){
			    			htmlTemp+='<a href="javascript:void(0);" class="zy-pub-art">发布</a>';
			    		}
			    		htmlTemp+='</td></tr>';
			    		htmls+=htmlTemp;
			    	}      
			        $manageExperience.find("tbody").html(htmls);
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	//experience删除
	var $manExper = $('#zy-manageExperience');
	$manExper.delegate('.zy-del-art', 'click', function() {
		var aid=$(this).closest('tr').data('ids');

		$.ajax({
			type: 'post',
			url: '/delExper',
			data: {
				aid: aid
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});
	
	//experience草稿改为发布
	$manExper.delegate('.zy-pub-art', 'click', function() {
		var aid=$(this).closest('tr').data('ids');

		$.ajax({
			type: 'post',
			url: '/pubExper',
			data: {
				aid: aid
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});
	
})