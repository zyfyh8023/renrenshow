$(document).ready(function() {

	//修改密码
	$('#zy-rePwd').delegate('button', 'click', function(event) {
		var oldpassword = $.trim($('.oldpassword', $('#zy-rePwd'))),
			newpassword = $.trim($('.newpassword', $('#zy-rePwd'))),
			newpassword2 = $.trim($('.newpassword2', $('#zy-rePwd')));
		if (oldpassword != '' && newpassword != '' && newpassword2 != '') {
			$.ajax({
				type: 'post',
				url: '/changePassword',
				data: {
					oldpassword: oldpassword,
					newpassword: newpassword,
					newpassword2: newpassword2
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode != 200) {
						warnOpnFn(data.retDesc);
					} else {
						alertOpnFn('修改成功！');
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请把信息填写完整！');
		}
	});
	
})