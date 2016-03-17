$(document).ready(function() {
	//Dom缓存
	var $zyRegister = $('#zy-register');
	//注册提交
	$zyRegister.delegate('button', 'click', function(event) {
		var username = $.trim($(".username", $zyRegister).val()),
			password = $.trim($('.password', $zyRegister).val()),
			repassword = $.trim($('.repassword', $zyRegister).val());

		if ($('.myconfirm', $zyRegister).prop('checked') && username && password && repassword) {
			var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
			var regex2= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
	        if ( regex.test( username ) && regex2.test(password) && password==repassword){
	        	$.ajax({
	        		type: 'post',
	        		url: '/register',
	        		data: {
	        			username: username,
	        			password: password,
	        			repassword: repassword
	        		},
	        		dataType: 'json',
	        		success: function(data) {
	        			if (data.retCode != 200) {
	        				warnOpnFn(data.retDesc);
	        			} else {
	        				location.href="/"+username+"/index";
	        			}
	        		},
	        		error: function(err) {
	        			alertOpnFn('err');
	        		}
	        	});
	        }else{
	        	warnOpnFn('您输入的信息有误！');
	        }
		} else {
			warnOpnFn('请把表单的内容填写完整哦~');
		}
	});

});