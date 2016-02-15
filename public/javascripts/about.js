$(document).ready(function() {

	var $sendEmailFrm = $('#zy-sendEmailForm');
	$sendEmailFrm.delegate('button', 'click', function(event) {
		var emailname = $.trim($('.name', $sendEmailFrm).val()),
			emailurl = $.trim($('.email', $sendEmailFrm).val()),
			emailmes = $.trim($('.message', $sendEmailFrm).val());

		if(emailname && emailurl && emailmes) {
			$.ajax({
				type: 'post',
				url: '/about',
				data: {
					name: emailname,
					email: emailurl,
					mes: emailmes
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode != 200) {
						warnOpnFn(data.retDesc);
					} else {
						alertOpnFn('发送成功！');
						$('.name', $sendEmailFrm).val('');
						$('.email', $sendEmailFrm).val('');
						$('.message', $sendEmailFrm).val('');
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