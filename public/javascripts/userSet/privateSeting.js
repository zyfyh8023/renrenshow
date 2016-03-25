$(document).ready(function() {

	//模拟radio
	$(document.body).delegate('.zy-div-radio', 'click', function(event) {
		$(this).parent().children().removeClass('am-badge-success');
		$(this).addClass('am-badge-success');
	});
	//模拟checkbox
	$(document.body).delegate('.zy-div-checkbox', 'click', function(event) {
		if ($(this).hasClass("am-badge-success")) {
			$(this).removeClass("am-badge-success")
		} else {
			$(this).addClass("am-badge-success")
		}
	});
	
	//privateSeting页面保存事件
	var $privateSeting=$('#zy-privateSeting');
	$privateSeting.delegate('.saveBtn', 'click', function(event) {
		$('#zy-priset-name').modal({
		  	relatedTarget: this,
		  	onConfirm: function(e) {
		    	var setingArr = [];
		    	$(".zy-change-content").each(function() {
		    		var temp = {};
		    		temp.modelNam = $(this).prev().children(".titleName").text();
		    		temp.sunModels = [];
		    		for (var i = 0; i < $(this).children("a").length; i++) {
		    			var tempObj = {};
		    			if ($($(this).children("a")[i]).hasClass("am-badge-success")) {
		    				tempObj.sunNam = $($(this).children("a")[i]).text();
		    				tempObj.sunYesNo = 1;
		    			} else {
		    				tempObj.sunNam = $($(this).children("a")[i]).text();
		    				tempObj.sunYesNo = 0;
		    			}
		    			temp.sunModels.push(tempObj);
		    		}
		    		setingArr.push(temp);
		    	});
		    	$.ajax({
		    		type: 'post',
		    		url: '/privateSeting/add',
		    		data: {
		    			uNameSet: JSON.stringify(setingArr),
		    			setName: e.data
		    		},
		    		dataType: 'json',
		    		success: function(data) {
		    			if (data.retCode != 200) {
		    				warnOpnFn(data.retDesc);
		    			} else {
		    				location.reload();
		    			}
		    		},
		    		error: function(data) {
		    			alertOpnFn('err');
		    		}
		    	});
		  	},
		  	onCancel: function(e) {
		    	alert('您最终选择放弃了此次设置!');
		  	}
		});
	});
	
	$privateSeting.delegate('.saveBtnUpd', 'click', function(event) {
		var ids=$(this).data('ids');

    	var setingArr = [];
    	$(".zy-change-content").each(function() {
    		var temp = {};
    		temp.modelNam = $(this).prev().children(".titleName").text();
    		temp.sunModels = [];
    		for (var i = 0; i < $(this).children("a").length; i++) {
    			var tempObj = {};
    			if ($($(this).children("a")[i]).hasClass("am-badge-success")) {
    				tempObj.sunNam = $($(this).children("a")[i]).text();
    				tempObj.sunYesNo = 1;
    			} else {
    				tempObj.sunNam = $($(this).children("a")[i]).text();
    				tempObj.sunYesNo = 0;
    			}
    			temp.sunModels.push(tempObj);
    		}
    		setingArr.push(temp);
    	});
    	$.ajax({
    		type: 'post',
    		url: '/privateSeting/upd',
    		data: {
    			uNameSet: JSON.stringify(setingArr),
    			ids: ids
    		},
    		dataType: 'json',
    		success: function(data) {
    			if (data.retCode != 200) {
    				warnOpnFn(data.retDesc);
    			} else {
    				alertOpnFn('保存成功！');
    			}
    		},
    		error: function(data) {
    			alertOpnFn('err');
    		}
    	});
		  	
	}); 
	
	$privateSeting.delegate('.zy-upd-set-con', 'click', function(event) {
		var ids=$(this).closest('tr').data('ids');
		$.ajax({
			type: 'post',
			url: '/privateSeting/chg',
			data: {
				ids: ids
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode != 200) {
					warnOpnFn(data.retDesc);
				} else {
					location.reload();
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});

	$privateSeting.delegate('.zy-del-set-con', 'click', function(event) {
		var ids=$(this).closest('tr').data('ids');
		$.ajax({
			type: 'post',
			url: '/privateSeting/del',
			data: {
				ids: ids
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode != 200) {
					warnOpnFn(data.retDesc);
				} else {
					location.reload();
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});

	$privateSeting.delegate('.zy-look-set-con', 'click', function(event) {
		var ids=$(this).closest('tr').data('ids');
		$(this).closest('table').find('tr').removeClass('am-active');
		$(this).closest('tr').addClass('am-active');
		$.ajax({
			type: 'post',
			url: '/privateSeting/see',
			data: {
				ids: ids
			},
			dataType: 'json',
			success: function(data) {
				var strAlls='<div data-am-widget="titlebar" class="am-titlebar am-titlebar-multi" >'+
					    	'<h2 class="am-titlebar-title ">对应选中特权设置的内容如下所示：</h2></div><br>';

				for(var k=0; k<data.retData.moduleCon.length; k++){
					var strEles="";
					for(var j=0;j<data.retData.moduleCon[k].sunModels.length;j++){
						if(data.retData.moduleCon[k].modelNam =='个性简介' || data.retData.moduleCon[k].modelNam =='公开时间'){
							if(data.retData.moduleCon[k].sunModels[j].sunYesNo ==1){
								strEles+='<a class="zy-div-radio am-badge am-badge-success am-text-lg">'+data.retData.moduleCon[k].sunModels[j].sunNam +'</a> ';
							}else{
								strEles+='<a class="zy-div-radio am-badge am-text-lg">'+data.retData.moduleCon[k].sunModels[j].sunNam +'</a> ';
							}
						}else{
							if(data.retData.moduleCon[k].sunModels[j].sunYesNo ==1){
								strEles+='<a class="zy-div-checkbox  am-badge am-badge-success am-text-lg">'+data.retData.moduleCon[k].sunModels[j].sunNam +'</a> ';
							}else{
								strEles+='<a class="zy-div-checkbox  am-badge am-text-lg">'+data.retData.moduleCon[k].sunModels[j].sunNam +'</a> ';
							}
						}
					}
					strAlls+='<div class="zy-public-title">'+
                   			'<span class="am-badge am-badge-secondary am-round am-text-xl">'+(k+1)+'</span> <span class="titleName am-badge am-badge-secondary am-text-xl">'+data.retData.moduleCon[k].modelNam+'</span>'+
               				'</div> <div class="zy-public-content zy-change-content">'+strEles+'</div>';
				}
				strAlls+='<div style="margin-left:45px;">'+
						'<button data-ids="'+ids+'" class="saveBtnUpd am-btn am-btn-secondary am-text-lg"> 保存以上修改 </button> </div><br>';

				$('.zy-set-show').html(strAlls);
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});
})