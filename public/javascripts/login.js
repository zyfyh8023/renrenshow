$(document).ready(function() {
	var store = $.AMUI.store;
	var $zyLogin = $("#zy-login");
	
	//账号的初始化值
	if(store.get('username')){
		$('.username', $zyLogin).val(store.get('username'));
	}
	
	//事件绑定
	$zyLogin.delegate('button', 'click', function(event) {
		var username = $.trim($('.username', $zyLogin).val()),
			password = $.trim($('.password', $zyLogin).val());
		if (username && password) {
			if ($('#remember-me', $zyLogin).prop('checked')) {
				store.set('username', username);
			}
			var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	        if ( regex.test( username ) ){
	        	$.ajax({
	        		type: 'post',
	        		url: '/login',
	        		data: {
	        			username: username,
	        			password: password
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
	        	warnOpnFn('用户名格式错误！');
	        }
		} else {
			warnOpnFn('请把表单的内容填写完整哦~');
		}
	});

});