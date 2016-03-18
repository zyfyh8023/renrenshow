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

	//seting页面保存事件
	var $setings=$('#zy-setting');
	$setings.delegate('button', 'click', function(event) {
		var setingArr = [];
		$(".zy-change-content", $setings).each(function() {
			var temp = {};
			temp.modelNam = $(this).prev().children(".titleName").text();
			temp.sunModels = [];
			for (var i = 0; i < $(this).children("a").length; i++) {
				var tempObj = {};
				if ($($(this).children("a")[i]).hasClass("am-badge-success")) {
					tempObj.sunNam = $($(this).children("a")[i]).text();
					tempObj.sunYesNo = 1;
				} else if($($(this).children("a")[i]).hasClass("am-badge-warning")){
					tempObj.sunNam = $($(this).children("a")[i]).text();
					tempObj.sunYesNo = 2;
				}else{
					tempObj.sunNam = $($(this).children("a")[i]).text();
					tempObj.sunYesNo = 0;
				}
				temp.sunModels.push(tempObj);
			}
			setingArr.push(temp);
		});
		$.ajax({
			type: 'post',
			url: '/seting',
			data: {
				uNameSet: JSON.stringify(setingArr)
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

})