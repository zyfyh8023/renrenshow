$(document).ready(function() {

	//发送邮件的操作
	var $sendEmailFrm = $('#zy-setApply');
	$sendEmailFrm.delegate('button', 'click', function(event) {
		var applyemail = $.trim($('.apply-email', $sendEmailFrm).val()),
			applyname = $.trim($('.apply-name', $sendEmailFrm).val()),
			applylink = $.trim($('.apply-link', $sendEmailFrm).val()),
			applymes = $.trim($('.apply-mes', $sendEmailFrm).val());

		if(applyemail && applyname && applylink && applymes) {
			$.ajax({
				type: 'post',
				url: '/doApply',
				data: {
					uName: __data.uName,
					applyemail: applyemail,
					applyname: applyname,
					applylink: applylink,
					applymes: applymes
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode != 200) {
						warnOpnFn(data.retDesc);
					} else {
						alertOpnFn('发送成功！');
						$('.apply-email', $sendEmailFrm).val('');
						$('.apply-name', $sendEmailFrm).val('');
						$('.apply-link', $sendEmailFrm).val('');
						$('.apply-mes', $sendEmailFrm).val('');
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		}else{
			warnOpnFn('请把表单的内容填写完整哦~');
		}
	});

})