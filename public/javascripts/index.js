$(document).ready(function() {

	//菜单导航条
	$('.zy-am-topbar-nav li a').each(function() {
		var str=window.location.pathname;
		if(str.indexOf($(this).data('src'))!=-1){
			$('.zy-am-topbar-nav li').removeClass('am-active');
			$(this).parent().addClass('am-active');
		}else if(str=='/'){
			$('.zy-am-topbar-nav li').removeClass('am-active');
			$($('.zy-am-topbar-nav li')[0]).addClass('am-active');
		}else{
			$(this).parent().removeClass('am-active');
		}
	});

	/**
	 * 退出登录
	 */
	$('#zy-loginOut').click(function() {
		$.ajax({
			type: 'post',
			url: '/loginOut',
			dataType: 'json',
			success: function(data) {
				location.href = "/login";
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});

	//warning提示框的关闭事件
	$("#zy-warning .am-close").click(function() {
		$("#zy-warning").addClass('zy-display-none');
	});

});

//warn的opn和cls
function warnOpnFn(message) {
	if (message) {
		$("#zy-warning p").html(message);
		$("#zy-warning").removeClass('zy-display-none');
	}
}

function warnClsFn() {
	$("#zy-warning").addClass('zy-display-none');
}

//alert的opn和cls
function alertOpnFn(message) {
	if (message && message == 'err') {
		$('#my-alert .am-modal-bd').html('系统错误，请稍后再试！');
		$("#my-alert").modal("open");
	} else if (message) {
		$('#my-alert .am-modal-bd').html(message);
		$("#my-alert").modal("open");
	}
}

function alertClsFn() {
	$("#my-alert").modal("close");
}
