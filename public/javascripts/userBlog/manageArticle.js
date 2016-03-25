$(document).ready(function() {

	//分页事件
	var $manageArticle=$("#zy-manageArticle");
	$manageArticle.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/artPageSearch',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName,
			    	articleTag: __data.articleTag
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		var artTyp;
			    		switch(data.allArticles[i].articleType){
			    			case '01':artTyp="前端开发相关";break;
			    			case '02':artTyp="后端开发相关";break;
			    			case '03':artTyp="客户端开发相关";break;
			    			case '04':artTyp="数据库开发相关";break;
			    			case '05':artTyp="产品运营相关";break;
			    			case '06':artTyp="UI设计相关";break;
			    			case '11':artTyp="行业远瞻";break;
			    			case '21':artTyp="生活日志";break;
			    			case '91':artTyp="随便写写";break;
			    			default:artTyp=data.allArticles[i].articleType;break;
			    		}

			    		var htmlTemp=
			    			'<tr data-ids="'+data.allArticles[i]._id+'">'+
			    			'<td class="am-text-middle">'+(((pagenum-1)*10)+(i+1))+'</td>'+
			    			'<td class="am-text-middle">'+data.allArticles[i].articleTitle+'</td>'+
			    			'<td class="am-text-middle">'+artTyp+'</td>'+
			    			'<td class="am-text-middle">'+dateformat(data.allArticles[i].cTime)+'</td>'+
			    			'<td class="am-text-middle">'+
			    			'<a href="javascript:void(0);" class="zy-del-art">删除</a><br>'+
			    			'<a href="/'+__data.uName+'/blogs_art?aid='+data.allArticles[i]._id+'">查看</a><br>';
			    		if(data.allArticles.articleTag=='0'){
			    			htmlTemp+='<a href="javascript:void(0);" class="zy-pub-art">发布</a>';
			    		}
			    		htmlTemp+='</td></tr>';
			    		htmls+=htmlTemp;
			    	}    
			        $manageArticle.find("tbody").html(htmls);
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	//article删除
	var $manArticle = $('#zy-manageArticle');
	$manArticle.delegate('.zy-del-art', 'click', function() {
		var aid=$(this).closest('tr').data('ids');

		$.ajax({
			type: 'post',
			url: '/delArticle',
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
	
	//article草稿改为发布
	$manArticle.delegate('.zy-pub-art', 'click', function() {
		var aid=$(this).closest('tr').data('ids');

		$.ajax({
			type: 'post',
			url: '/pubArticle',
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