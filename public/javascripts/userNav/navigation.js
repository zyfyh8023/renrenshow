$(document).ready(function() {
	
	//左侧列表的动态删除
	var $navgation=$("#zy-navgation");
	var $removenavmodel = $('#my-removenavmodel', $navgation);
	$removenavmodel.delegate('button', 'click', function(event) {
		var _id = $.trim($(".addmodelNameD", $removenavmodel).val());
		if (_id != '') {
			$.ajax({
				type: 'post',
				url: '/navigationListDel',
				data: {
					_id: _id
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function() {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('不能为空哦~');
		}
	});

	//左侧列表的动态插入
	var $addnavmodel = $('#my-addnavmodel', $navgation);
	$addnavmodel.delegate('button', 'click', function(event) {
		var navName = $.trim($(".addmodelNameA", $addnavmodel).val());
		if (navName != '') {
			$.ajax({
				type: 'post',
				url: '/navigationListAdd',
				data: {
					navName: navName
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function() {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	//新链接元素的添加
	var navModulePar="";
	var $navpopup = $('#my-navpopup', $navgation);
	$navgation.delegate('.J_zy-datamodal', 'click', function(event) {
		$navpopup.modal("open");
		navModulePar=$(this).closest('.zy-module-container').data("_id");
	});
	$navpopup.delegate('button', 'click', function(event) {
		var moduleName = $.trim($(".moduleName", $navpopup).val()),
			moduleInfo = $.trim($(".moduleInfo", $navpopup).val()),
			moduleLink = $.trim($(".moduleLink", $navpopup).val())
			moduleParent = $.trim(navModulePar);

		if (moduleName!='' && moduleInfo!="" && moduleLink!="") {
			$.ajax({
				type: 'post',
				url: '/navigationListAddsun',
				data: {
					moduleParent: moduleParent,
					moduleName: moduleName,
					moduleInfo: moduleInfo,
					moduleLink: moduleLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function() {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	//小链接元素的删除
	$navgation.delegate('.J_zy-module-close', 'click', function(event) {
		var moduleName = $.trim($(this).next(".zy-module-con").data('_id')),
			moduleParent = $.trim($(this).closest('.zy-module-container').data('_id'));
		if (moduleName!='' && moduleParent!="") {
			$.ajax({
				type: 'post',
				url: '/navigationListDelsun',
				data: {
					moduleParent: moduleParent,
					moduleName: moduleName
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function() {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});


})