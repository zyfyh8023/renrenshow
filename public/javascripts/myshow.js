var jx1=0, jy1=0, jw=0, jh=0;

$(document).ready(function() {
	/**
	 * mywebsite的侧边栏显示
	 */
	$(document.body).delegate('#zy-slidemenu', 'click', function(event) {
		$(this).closest('ul').hide();
	});
	/**
	 * myindex页面的js
	 */
	var $input = $('#doc-qr-text', "#zy-myindex"),
		$qr = $('#doc-qrcode', "#zy-myindex");
	function makeCode(text) {
		$qr.empty().qrcode(text);
	}
	$input.val(location.href);
	makeCode(location.href);
	$('#zy-myindex').delegate('#doc-gen-qr', 'click', function(){
		makeCode($input.val());
	});
	$input.on('focusout', function() {
		makeCode($input.val());
	});
	
	/**
	 * seting和privateSeting页面的js
	 */
	//模拟radio
	$('.zy-div-radio').click(function() {
		$(this).parent().children().removeClass('am-badge-success');
		$(this).addClass('am-badge-success');
	});
	//模拟checkbox
	$('.zy-div-checkbox').click(function() {
		if ($(this).hasClass("am-badge-success")) {
			$(this).removeClass("am-badge-success")
		} else {
			$(this).addClass("am-badge-success")
		}
	});

	/********************
	 **seting页面的js
	 *********************/
	//seting页面保存事件
	$('#zy-setting').delegate('button', 'click', function(event) {
		var setingArr = [];
		$(".zy-change-content", $('#zy-setting')).each(function() {
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

	/**
	 * privateSeting页面的js
	 */
	//privateSeting页面保存事件
	$("#zy-privateSeting").delegate('button', 'click', function(event) {
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
			url: '/privateSeting',
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

	/**
	 * 修改密码页面的js
	 */
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

	/**
	 * introduction页面的js
	 */
	$('#my-specialinstr').delegate('#inputFile', 'change', function(event) {
		$('.imgtip', '#my-specialinstr').html($('#inputFile', '#my-specialinstr').val());
	});
	$('#my-specialinstr').delegate('#upload', 'click', function(event) {
		$('#specialInstruc', '#my-specialinstr').ajaxForm({
			url: $('#specialInstruc', '#my-specialinstr').attr('action'),
			type: 'POST',
			success: function(res, status, xhr, $form) {
				if (res.retCode != 200) {
					alertOpnFn(rs.retDesc);
				} else {
					location.reload();
				}
				$('#specialInstruc', '#my-specialinstr').clearForm();
			},
			error: function(res, status, e) {
				alertOpnFn('err');
				$('#specialInstruc', '#my-specialinstr').clearForm();
			}
		});
	});

	/**
	 * navigation页面的js
	 */
	//左侧列表的动态删除
	var $navgation=$("#zy-navgation");
	var $removenavmodel = $('#my-removenavmodel', $navgation);
	$removenavmodel.delegate('button', 'click', function(event) {
		var navName = $.trim($(".addmodelNameD", $removenavmodel).val());
		if (navName != '') {
			$.ajax({
				type: 'post',
				url: '/navigationListDel',
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
		$navpopup.modal();
		navModulePar=$(this).closest('.zy-module-container').find(".zy-navigation-nav button").text();
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
	var navModulePar="";
	var $navpopup = $('#my-navpopup', $navgation);
	$navgation.delegate('.J_zy-datamodal', 'click', function(event) {
		$navpopup.modal("open");
		navModulePar=$(this).closest('.zy-module-container').find(".zy-navigation-nav button").text();
	});
	$navgation.delegate('.J_zy-module-close', 'click', function(event) {
		var moduleName = $.trim($(this).next(".zy-module-con").find("a").text()),
			moduleParent = $.trim($(this).closest('.zy-module-container').find(".zy-navigation-nav button").text());
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

	/**
	 * experience页面的js
	 */
	//分页事件
	var $manageExperience=$("#zy-manageExperience");
	$manageExperience.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/expPageSearch',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName,
			    	experienceTag: __data.experienceTag
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls=[];
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		htmls+=[
			    			'<tr>',
			    			'<td>'+(((pagenum-1)*10)+(i+1))+'</td>',
			    			'<td>'+data.allArticles[i].experienceTitle+'</td>',
			    			'<td>'+data.allArticles[i].experienceCompany+'</td>',
			    			'<td>'+data.allArticles[i].cTime+'</td>',
			    			'<td><a href="javascript:;">删除</a>&nbsp&nbsp&nbsp&nbsp<a href="javascript:;">操作</a></td>',
			    			'</tr>'
			    		].join('');
			    	}    
			        $manageExperience.find("tbody").html(htmls);
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	//experience发布
	var $createExperience = $('#zy-createExperience');
	$createExperience.delegate('.experienceFB', 'click', function() {
		var experienceTitle = $.trim($(".experienceTitle", $createExperience).val()),
			experienceCompany = $.trim($(".experienceCompany", $createExperience).val()),
			experienceCont = $.trim($("#experienceCont", $createExperience).html()),
			experienceLink = $.trim($(".experienceLink", $createExperience).val());
		if (experienceTitle != '' && experienceCompany != '' && experienceCont != '' && experienceLink != '') {
			$.ajax({
				type: 'post',
				url: '/createExperience',
				data: {
					tags: 1,
					experienceTitle: experienceTitle,
					experienceCompany: experienceCompany,
					experienceCont: experienceCont,
					experienceLink: experienceLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						alertOpnFn('操作成功！');
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	//experience存草稿
	var $createExperience = $('#zy-createExperience');
	$createExperience.delegate('.experienceCG', 'click', function() {
		var experienceTitle = $.trim($(".experienceTitle", $createExperience).val()),
			experienceCompany = $.trim($(".experienceCompany", $createExperience).val()),
			experienceCont = $.trim($("#experienceCont", $createExperience).html()),
			experienceLink = $.trim($(".experienceLink", $createExperience).val());
		if (experienceTitle != '' && experienceCompany != '' && experienceCont != '' && experienceLink != '') {
			$.ajax({
				type: 'post',
				url: '/createExperience',
				data: {
					tags: 2,
					experienceTitle: experienceTitle,
					experienceCompany: experienceCompany,
					experienceCont: experienceCont,
					experienceLink: experienceLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						alertOpnFn('操作成功！');
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	/**
	 * Article页面的js
	 */
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
			    	var htmls=[];
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		htmls+=[
			    			'<tr>',
			    			'<td>'+(((pagenum-1)*10)+(i+1))+'</td>',
			    			'<td>'+data.allArticles[i].articleTitle+'</td>',
			    			'<td>'+data.allArticles[i].articleType+'</td>',
			    			'<td>'+data.allArticles[i].cTime+'</td>',
			    			'<td><a href="javascript:;">删除</a>&nbsp&nbsp&nbsp&nbsp<a href="javascript:;">操作</a></td>',
			    			'</tr>'
			    		].join('');
			    	}    
			        $manageArticle.find("tbody").html(htmls);
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	//article发布
	var $createArticle = $('#zy-createArticle');
	$createArticle.delegate('.articleFB', 'click', function() {
		var articleTitle = $.trim($(".articleTitle", $createArticle).val()),
			articleKeyword = $.trim($(".articleKeyword", $createArticle).val()),
			articleType = $.trim($(".articleType", $createArticle).val()),
			articleCont = $.trim($("#articleCont", $createArticle).html()),
			articleLink = $.trim($(".articleLink", $createArticle).val());
		if (articleTitle != '' && articleKeyword != '' && articleType != '' && articleCont != '' && articleLink != '') {
			$.ajax({
				type: 'post',
				url: '/createarticle',
				data: {
					tags: 1,
					articleTitle: articleTitle,
					articleKeyword: articleKeyword,
					articleType: articleType,
					articleCont: articleCont,
					articleLink: articleLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						alertOpnFn('操作成功！');
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	//article存草稿
	var $createArticle = $('#zy-createArticle');
	$createArticle.delegate('.articleCG', 'click', function() {
		var articleTitle = $.trim($(".articleTitle", $createArticle).val()),
			articleKeyword = $.trim($(".articleKeyword", $createArticle).val()),
			articleType = $.trim($(".articleType", $createArticle).val()),
			articleCont = $.trim($(".articleCont", $createArticle).html()),
			articleLink = $.trim($(".articleLink", $createArticle).val());
		if (articleTitle != '' && articleKeyword != '' && articleType != '' && articleCont != '' && articleLink != '') {
			$.ajax({
				type: 'post',
				url: '/createarticle',
				data: {
					tags: 2,
					articleTitle: articleTitle,
					articleKeyword: articleKeyword,
					articleType: articleType,
					articleCont: articleCont,
					articleLink: articleLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						alertOpnFn('操作成功！');
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});


	/***
		简历页面的js代码
	**/
	//个人基本信息
	var $myBaseinfo = $('#my-baseinfo');
	$myBaseinfo.delegate('#inputFile1', 'change', function() {
		$('.imgtip', $myBaseinfo).html($('#inputFile1', $myBaseinfo).val());
	})

	$myBaseinfo.delegate('#upload1', 'click', function() {
		$('#specialInstruc1', $myBaseinfo).ajaxForm({
			url: $('#specialInstruc1', $myBaseinfo).attr('action'),
			type: 'POST',
			success: function(res, status, xhr, $form) {
				if (res.retCode != 200) {
					warnOpnFn(res.retDesc);
				} else {
					location.reload();
				}
			},
			clearForm: true
		});
	})

	//联系方式
	$myContactinfo = $('#my-contactinfo');
	$myContactinfo.delegate('.my-contactinfo-btn', 'click', function() {
		var mphone = $.trim($(".mphone", $myContactinfo).val()),
			phone = $.trim($(".phone", $myContactinfo).val()),
			address = $.trim($(".address", $myContactinfo).val()),
			identity = $.trim($(".identity", $myContactinfo).val()),
			email = $.trim($(".email", $myContactinfo).val()),
			qqnum = $.trim($(".qqnum", $myContactinfo).val());
		$.ajax({
			type: 'post',
			url: '/resume/contactinfo',
			data: {
				mphone: mphone,
				phone: phone,
				address: address,
				identity: identity,
				email: email,
				qqnum: qqnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});

});


/**
 * 
 *教育经历
 *
 **/
 //公共变量
var $myEducation = $('#my-education'),
	$myEducationadd=$('.J_operate-add', $myEducation),
	$myEducationdel=$('.J_operate-del', $myEducation);

//操作方式
$myEducation.delegate('.J_operate-sel .select1', 'change', function(event) {
    $('.J_operate-add .J_hidden-ipt', $myEducation).val(''); // 动态修改的清空
    $('.J_operate-add .school', $myEducation).val(''); 
    $('.J_operate-add .educationtype', $myEducation).val(''); 
    $('.J_operate-add .sdatetime', $myEducation).val(''); 
    $('.J_operate-add .edatetime', $myEducation).val(''); 
    $('.J_operate-add .major', $myEducation).val(''); 
    $('.J_operate-add .majorinstr', $myEducation).val(''); 

    if ($(this).children('option:selected').val() == 1) {
        $('.J_operate-del', $myEducation).hide();
        $('.J_operate-add', $myEducation).show();
        $(".J_operate-sel", $myEducation).find(".J_change-con").hide();
    } else if ($(this).children('option:selected').val() == 2) {
        $('.J_operate-del', $myEducation).show();
        $('.J_operate-add', $myEducation).hide();
        $(".J_operate-sel", $myEducation).find(".J_change-con").hide();
    } else if ($(this).children('option:selected').val() == 3) {
        $('.J_operate-del', $myEducation).hide();
        $('.J_operate-add', $myEducation).hide();
        $(".J_operate-sel", $myEducation).find(".J_change-con").show();
        var num=$('.J_operate-sel .select2', $myEducation).children('option:selected').val();
        if(num){
            educationAjaxCom(num);
        }
    }else {
        $('.J_operate-del', $myEducation).hide();
        $('.J_operate-add', $myEducation).hide();
        $(".J_operate-sel", $myEducation).find(".J_change-con").hide();
      }
});


$myEducation.delegate('#inputFile3', 'change', function() {
	$('.imgtip', $myEducation).html($(this).val());
})

$myEducation.delegate('#upload3', 'click', function(event) {
	var hiddenipt = $.trim($myPaperadd.find(".J_hidden-ipt").val());
	if(hiddenipt){
		$('#specialInstruc3', $myEducation).ajaxForm({
			url: $('#specialInstruc3', $myEducation).attr('name'),
			type: 'POST',
			success: function(res, status, xhr, $form) {
				if (res.retCode != 200) {
					warnOpnFn(res.retDesc);
				} else {
					location.reload();
				}
				$('#specialInstruc3', $myEducation).clearForm();
			},
			error: function(res, status, e) {
				alertOpnFn('err');
				$('#specialInstruc3', $myEducation).clearForm();
			}
		});
	}else{
		$('#specialInstruc3', $myEducation).ajaxForm({
			url: $('#specialInstruc3', $myEducation).attr('action'),
			type: 'POST',
			success: function(res, status, xhr, $form) {
				if (res.retCode != 200) {
					warnOpnFn(res.retDesc);
				} else {
					location.reload();
				}
				$('#specialInstruc3', $myEducation).clearForm();
			},
			error: function(res, status, e) {
				alertOpnFn('err');
				$('#specialInstruc3', $myEducation).clearForm();
			}
		});
	}
});

//修改
$myEducation.delegate('.J_operate-sel .select2', 'change', function(event) {
    var num=$(this).children('option:selected').val();
    if(num){
        educationAjaxCom(num);
      }else{
          $('.J_operate-add', $myEducation).hide();
      }
});

//comAjax
function educationAjaxCom(num){
    $('.J_operate-add', $myEducation).show();
    $.ajax({
        type: 'post',
        url: '/resume/allinfo',
        dataType: 'json',
        success: function(data) {
            $('.J_operate-add .J_hidden-ipt', $myEducation).val(num);
            $('.J_operate-add .school', $myEducation).val(data.allinfo.schools3[num].school); 
            $('.J_operate-add .educationtype', $myEducation).val(data.allinfo.schools3[num].educationtype); 
            $('.J_operate-add .sdatetime', $myEducation).val(data.allinfo.schools3[num].sdatetime); 
            $('.J_operate-add .edatetime', $myEducation).val(data.allinfo.schools3[num].edatetime); 
            $('.J_operate-add .major', $myEducation).val(data.allinfo.schools3[num].major); 
            $('.J_operate-add .majorinstr', $myEducation).val(data.allinfo.schools3[num].majorinstr); 
        },
        error: function(err) {
            alertOpnFn('err');
        }
    });
}
//del
$myEducation.delegate('.J_operate-del button', 'click', function(event) {
	var delnum = $.trim($myEducationdel.find("select").children('option:selected').val());
	if (delnum) {
		$.ajax({
			type: 'post',
			url: '/resume/education/del',
			data: {
				delnum: delnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请填写完整!');
	}
});	
//re工作
var $myRepractice = $('#my-repractice'),
	$myRepracticeadd=$('.J_operate-add', $myRepractice),
	$myRepracticedel=$('.J_operate-del', $myRepractice);

$myRepractice.delegate('.J_operate-sel select', 'change', function(event) {
	if ($(this).children('option:selected').val() == 1) {
			$('.J_operate-del', $myRepractice).hide();
			$('.J_operate-add', $myRepractice).show();
		} else if ($(this).children('option:selected').val() == 2) {
			$('.J_operate-del', $myRepractice).show();
			$('.J_operate-add', $myRepractice).hide();
		} else {
			$('.J_operate-del', $myRepractice).hide();
			$('.J_operate-add', $myRepractice).hide();
  	}
});
$myRepractice.delegate('#inputFile3', 'change', function() {
	$('.imgtip', $myRepractice).html($(this).val());
})

$myRepractice.delegate('#upload3', 'click', function(event) {
	$('#specialInstruc3', $myRepractice).ajaxForm({
		url: $('#specialInstruc3', $myRepractice).attr('action'),
		type: 'POST',
		success: function(res, status, xhr, $form) {
			if (res.retCode != 200) {
				warnOpnFn(res.retDesc);
			} else {
				location.reload();
			}
			$('#specialInstruc3', $myRepractice).clearForm();
		},
		error: function(res, status, e) {
			alertOpnFn('err');
			$('#specialInstruc3', $myRepractice).clearForm();
		}
	});
});

$myRepractice.delegate('.J_operate-del button', 'click', function(event) {
	var delnum = $.trim($myRepracticedel.find("select").children('option:selected').val());
	if (delnum) {
		$.ajax({
			type: 'post',
			url: '/resume/repractice/del',
			data: {
				delnum: delnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请填写完整!');
	}
});	
//工作
var $myPractice = $('#my-practice'),
	$myPracticeadd=$('.J_operate-add', $myPractice),
	$myPracticedel=$('.J_operate-del', $myPractice);

$myPractice.delegate('.J_operate-sel select', 'change', function(event) {
	if ($(this).children('option:selected').val() == 1) {
			$('.J_operate-del', $myPractice).hide();
			$('.J_operate-add', $myPractice).show();
		} else if ($(this).children('option:selected').val() == 2) {
			$('.J_operate-del', $myPractice).show();
			$('.J_operate-add', $myPractice).hide();
		} else {
			$('.J_operate-del', $myPractice).hide();
			$('.J_operate-add', $myPractice).hide();
  	}
});
$myPractice.delegate('#inputFile3', 'change', function() {
	$('.imgtip', $myPractice).html($(this).val());
})

$myPractice.delegate('#upload3', 'click', function(event) {
	$('#specialInstruc3', $myPractice).ajaxForm({
		url: $('#specialInstruc3', $myPractice).attr('action'),
		type: 'POST',
		success: function(res, status, xhr, $form) {
			if (res.retCode != 200) {
				warnOpnFn(res.retDesc);
			} else {
				location.reload();
			}
			$('#specialInstruc3', $myPractice).clearForm();
		},
		error: function(res, status, e) {
			alertOpnFn('err');
			$('#specialInstruc3', $myPractice).clearForm();
		}
	});
});

$myPractice.delegate('.J_operate-del button', 'click', function(event) {
	var delnum = $.trim($myPracticedel.find("select").children('option:selected').val());
	if (delnum) {
		$.ajax({
			type: 'post',
			url: '/resume/practice/del',
			data: {
				delnum: delnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请填写完整!');
	}
});	

//荣誉证书
var $myCertificate = $('#my-certificate'),
	$myCertificateadd=$('.J_operate-add', $myCertificate),
	$myCertificatedel=$('.J_operate-del', $myCertificate);

$myCertificate.delegate('.J_operate-sel select', 'change', function(event) {
	if ($(this).children('option:selected').val() == 1) {
			$('.J_operate-del', $myCertificate).hide();
			$('.J_operate-add', $myCertificate).show();
		} else if ($(this).children('option:selected').val() == 2) {
			$('.J_operate-del', $myCertificate).show();
			$('.J_operate-add', $myCertificate).hide();
		} else {
			$('.J_operate-del', $myCertificate).hide();
			$('.J_operate-add', $myCertificate).hide();
  	}
});

$myCertificate.delegate('#inputFile3', 'change', function() {
	$('.imgtip', $myCertificate).html($(this).val());
})

$myCertificate.delegate('#upload3', 'click', function(event) {
	$('#specialInstruc3', $myCertificate).ajaxForm({
		url: $('#specialInstruc3', $myCertificate).attr('action'),
		type: 'POST',
		success: function(res, status, xhr, $form) {
			if (res.retCode != 200) {
				warnOpnFn(res.retDesc);
			} else {
				location.reload();
			}
			$('#specialInstruc3', $myCertificate).clearForm();
		},
		error: function(res, status, e) {
			alertOpnFn('err');
			$('#specialInstruc3', $myCertificate).clearForm();
		}
	});
});
$myCertificate.delegate('.J_operate-del button', 'click', function(event) {
	var delnum = $.trim($myCertificatedel.find("select").children('option:selected').val());
	if (delnum) {
		$.ajax({
			type: 'post',
			url: '/resume/certificate/del',
			data: {
				delnum: delnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请填写完整!');
	}
});	
//我的作品
var $myWorks = $('#my-works'),
	$myWorksadd=$('.J_operate-add', $myWorks),
	$myWorksdel=$('.J_operate-del', $myWorks);

$myWorks.delegate('.J_operate-sel select', 'change', function(event) {
	if ($(this).children('option:selected').val() == 1) {
			$('.J_operate-del', $myWorks).hide();
			$('.J_operate-add', $myWorks).show();
		} else if ($(this).children('option:selected').val() == 2) {
			$('.J_operate-del', $myWorks).show();
			$('.J_operate-add', $myWorks).hide();
		} else {
			$('.J_operate-del', $myWorks).hide();
			$('.J_operate-add', $myWorks).hide();
  	}
});

$myWorks.delegate('#inputFile2', 'change', function() {
	var imgStr = "",
		fileObjs = $('#inputFile2', $myWorks).get(0);
	for (var j = 0, len = fileObjs.files.length; j < len; j++) {
		imgStr = imgStr + fileObjs.files[j].name + '<i style="margin-right:20px;"></i>';
	}
	$('.imgtip', $myWorks).html(imgStr);
})

$myWorks.delegate('#upload2', 'click', function(event) {
	$('#specialInstruc2', $myWorks).ajaxForm({
		url: $('#specialInstruc2', $myWorks).attr('action'),
		type: 'POST',
		success: function(res, status, xhr, $form) {
			if (res.retCode != 200) {
				warnOpnFn(res.retDesc);
			} else {
				location.reload();
			}
			$('#specialInstruc2', $myWorks).clearForm();
		},
		error: function(res, status, e) {
			alertOpnFn('err');
			$('#specialInstruc2', $myWorks).clearForm();
		}
	});
});

$myWorks.delegate('.J_operate-del button', 'click', function(event) {
	var delnum = $.trim($myWorksdel.find("select").children('option:selected').val());
	if (delnum) {
		$.ajax({
			type: 'post',
			url: '/resume/works/del',
			data: {
				delnum: delnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请填写完整!');
	}
});	


/**
 * 
 *项目
 *
 **/
 //公共变量
var $myProjects = $('#my-projects'),
	$myProjectsadd=$('.J_operate-add', $myProjects),
	$myProjectsdel=$('.J_operate-del', $myProjects);

//操作方式
$myProjects.delegate('.J_operate-sel .select1', 'change', function(event) {
    $('.J_operate-add .J_hidden-ipt', $myProjects).val(''); // 动态修改的清空
    $('.J_operate-add .pname', $myProjects).val(''); // 动态修改的清空
    $('.J_operate-add .ptime', $myProjects).val(''); // 动态修改的清空
    $('.J_operate-add .paddt', $myProjects).val(''); // 动态修改的清空

    if ($(this).children('option:selected').val() == 1) {
        $('.J_operate-del', $myProjects).hide();
        $('.J_operate-add', $myProjects).show();
        $(".J_operate-sel", $myProjects).find(".J_change-con").hide();
    } else if ($(this).children('option:selected').val() == 2) {
        $('.J_operate-del', $myProjects).show();
        $('.J_operate-add', $myProjects).hide();
        $(".J_operate-sel", $myProjects).find(".J_change-con").hide();
    } else if ($(this).children('option:selected').val() == 3) {
        $('.J_operate-del', $myProjects).hide();
        $('.J_operate-add', $myProjects).hide();
        $(".J_operate-sel", $myProjects).find(".J_change-con").show();
        var num=$('.J_operate-sel .select2', $myProjects).children('option:selected').val();
        if(num){
            projectsAjaxCom(num);
        }
    }else {
        $('.J_operate-del', $myProjects).hide();
        $('.J_operate-add', $myProjects).hide();
        $(".J_operate-sel", $myProjects).find(".J_change-con").hide();
      }
});

//del
$myProjects.delegate('.J_operate-del button', 'click', function(event) {
	var delnum = $.trim($myProjectsdel.find("select").children('option:selected').val());
	if (delnum) {
		$.ajax({
			type: 'post',
			url: '/resume/projects/del',
			data: {
				delnum: delnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请填写完整!');
	}
});	

//add  update
$myProjects.delegate('.J_operate-add button', 'click', function(event) {
	var pname = $.trim($(".pname", $myProjects).val()),
		ptime = $.trim($(".ptime", $myProjects).val()),
		paddt = $.trim($(".paddt", $myProjects).val()),
		hiddenipt = $.trim($myPaperadd.find(".J_hidden-ipt").val());

	if (pname && ptime && paddt) {
		$.ajax({
			type: 'post',
			url: '/resume/projects/add',
			data: {
				pname: $(".pname", '#my-projects').val(),
				ptime: $(".ptime", '#my-projects').val(),
				paddt: $(".paddt", '#my-projects').val()
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请填写完整!');
	}
});

//修改
$myProjects.delegate('.J_operate-sel .select2', 'change', function(event) {
    var num=$(this).children('option:selected').val();
    if(num){
        projectsAjaxCom(num);
      }else{
          $('.J_operate-add', $myProjects).hide();
      }
});

//comAjax
function projectsAjaxCom(num){
    $('.J_operate-add', $myProjects).show();
    $.ajax({
        type: 'post',
        url: '/resume/allinfo',
        dataType: 'json',
        success: function(data) {
            $('.J_operate-add .J_hidden-ipt', $myProjects).val(num);
            $('.J_operate-add .pname', $myProjects).val(data.allinfo.projects8[num].tName); 
            $('.J_operate-add .ptime', $myProjects).val(data.allinfo.projects8[num].tTime); 
            $('.J_operate-add .paddt', $myProjects).val(data.allinfo.projects8[num].addt); 
        },
        error: function(err) {
            alertOpnFn('err');
        }
    });
}

/**
 * 
 *实践活动
 *
 **/
//公共变量
var $myUndergo = $('#my-undergo'),
	$myUndergoadd=$('.J_operate-add', $myUndergo),
	$myUndergodel=$('.J_operate-del', $myUndergo);

//操作方式
$myUndergo.delegate('.J_operate-sel .select1', 'change', function(event) {
    $('.J_operate-add .J_hidden-ipt', $myUndergo).val(''); // 动态修改的清空
    $('.J_operate-add .undergoname', $myUndergo).val(''); // 动态修改的清空
    $('.J_operate-add .undergotype', $myUndergo).val(''); // 动态修改的清空
    $('.J_operate-add .undergotime', $myUndergo).val(''); // 动态修改的清空
    $('.J_operate-add .undergoinstr', $myUndergo).val(''); // 动态修改的清空

    if ($(this).children('option:selected').val() == 1) {
        $('.J_operate-del', $myUndergo).hide();
        $('.J_operate-add', $myUndergo).show();
        $(".J_operate-sel", $myUndergo).find(".J_change-con").hide();
    } else if ($(this).children('option:selected').val() == 2) {
        $('.J_operate-del', $myUndergo).show();
        $('.J_operate-add', $myUndergo).hide();
        $(".J_operate-sel", $myUndergo).find(".J_change-con").hide();
    } else if ($(this).children('option:selected').val() == 3) {
        $('.J_operate-del', $myUndergo).hide();
        $('.J_operate-add', $myUndergo).hide();
        $(".J_operate-sel", $myUndergo).find(".J_change-con").show();
        var num=$('.J_operate-sel .select2', $myUndergo).children('option:selected').val();
        if(num){
            undergoAjaxCom(num);
        }
    }else {
        $('.J_operate-del', $myUndergo).hide();
        $('.J_operate-add', $myUndergo).hide();
        $(".J_operate-sel", $myUndergo).find(".J_change-con").hide();
      }
});

//del
$myUndergo.delegate('.J_operate-del button', 'click', function(event) {
	var delnum = $.trim($myUndergodel.find("select").children('option:selected').val());
	if (delnum) {
		$.ajax({
			type: 'post',
			url: '/resume/undergo/del',
			data: {
				delnum: delnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请填写完整!');
	}
});

//add   update
$myUndergo.delegate('.J_operate-add button', 'click', function(event) {
	var undergoname = $.trim($(".undergoname", $myUndergo).val()),
		undergotype = $.trim($(".undergotype", $myUndergo).val()),
		undergotime = $.trim($(".undergotime", $myUndergo).val()),
		undergoinstr = $.trim($(".undergoinstr", $myUndergo).val()),
		hiddenipt = $.trim($myPaperadd.find(".J_hidden-ipt").val());

	if(hiddenipt){
		if (undergoname && undergotype && undergotime && undergoinstr) {
			$.ajax({
				type: 'post',
				url: '/resume/undergo/upd',
				data: {
					undergoname: undergoname,
					undergotype: undergotype,
					undergotime: undergotime,
					undergoinstr: undergoinstr,
					updateid: hiddenipt
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	}else{
		if (undergoname && undergotype && undergotime && undergoinstr) {
			$.ajax({
				type: 'post',
				url: '/resume/undergo/add',
				data: {
					undergoname: undergoname,
					undergotype: undergotype,
					undergotime: undergotime,
					undergoinstr: undergoinstr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	}
});

//修改
$myUndergo.delegate('.J_operate-sel .select2', 'change', function(event) {
    var num=$(this).children('option:selected').val();
    if(num){
        undergoAjaxCom(num);
      }else{
          $('.J_operate-add', $myUndergo).hide();
      }
});

//comAjax
function undergoAjaxCom(num){
    $('.J_operate-add', $myUndergo).show();
    $.ajax({
        type: 'post',
        url: '/resume/allinfo',
        dataType: 'json',
        success: function(data) {
            $('.J_operate-add .J_hidden-ipt', $myUndergo).val(num);
            $('.J_operate-add .undergoname', $myUndergo).val(data.allinfo.trys9[num].tName); 
            $('.J_operate-add .undergotime', $myUndergo).val(data.allinfo.trys9[num].tType);  
            $('.J_operate-add .undergotype', $myUndergo).val(data.allinfo.trys9[num].tTime); 
            $('.J_operate-add .undergoinstr', $myUndergo).val(data.allinfo.trys9[num].addt); 
        },
        error: function(err) {
            alertOpnFn('err');
        }
    });
}

/**
 * 
 *论文专利
 *
 **/
//公共变量
var $myPaper = $('#my-paper'),
	$myPaperadd=$('.J_operate-add', $myPaper),
	$myPaperdel=$('.J_operate-del', $myPaper);

$myPaper.delegate('.J_operate-sel .select1', 'change', function(event) {
	$('.J_operate-add .J_hidden-ipt', $myPaper).val(''); // 动态修改的清空
	$('.J_operate-add .papertype', $myPaper).val(''); // 动态修改的清空
	$('.J_operate-add .papername', $myPaper).val(''); // 动态修改的清空
	$('.J_operate-add .papertime', $myPaper).val(''); // 动态修改的清空
	$('.J_operate-add .paperinstr', $myPaper).val(''); // 动态修改的清空

	if ($(this).children('option:selected').val() == 1) {
		$('.J_operate-del', $myPaper).hide();
		$('.J_operate-add', $myPaper).show();
		$(".J_operate-sel", $myPaper).find(".J_change-con").hide();
	} else if ($(this).children('option:selected').val() == 2) {
		$('.J_operate-del', $myPaper).show();
		$('.J_operate-add', $myPaper).hide();
		$(".J_operate-sel", $myPaper).find(".J_change-con").hide();
	}else if ($(this).children('option:selected').val() == 3) {
		$('.J_operate-del', $myPaper).hide();
		$('.J_operate-add', $myPaper).hide();
		$(".J_operate-sel", $myPaper).find(".J_change-con").show();
		var num=$('.J_operate-sel .select2', $myPaper).children('option:selected').val();
       	if(num){
           paperAjaxCom(num);
       	}
	} else {
		$('.J_operate-del', $myPaper).hide();
		$('.J_operate-add', $myPaper).hide();
		$(".J_operate-sel", $myPaper).find(".J_change-con").hide();
  	}
});

//del
$myPaper.delegate('.J_operate-del button', 'click', function(event) {
	var delnum = $.trim($myPaperdel.find("select").children('option:selected').val());
	if (delnum) {
		$.ajax({
			type: 'post',
			url: '/resume/paper/del',
			data: {
				delnum: delnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请填写完整!');
	}
});

//add   update
$myPaper.delegate('.J_operate-add button', 'click', function(event) {
	var papername = $.trim($(".papername", $myPaper).val()),
		papertype = $.trim($(".papertype", $myPaper).val()),
		papertime = $.trim($(".papertime", $myPaper).val()),
		paperinstr = $.trim($(".paperinstr", $myPaper).val()),
        hiddenipt = $.trim($myPaperadd.find(".J_hidden-ipt").val());

    if(hiddenipt){
    	if (papername && papertype && papertime && paperinstr) {
    		$.ajax({
    			type: 'post',
    			url: '/resume/paper/upd',
    			data: {
    				papername: papername,
    				papertype: papertype,
    				papertime: papertime,
    				paperinstr: paperinstr,
    				updateid: hiddenipt
    			},
    			dataType: 'json',
    			success: function(data) {
    				if (data.retCode == 200) {
    					location.reload();
    				} else {
    					warnOpnFn(data.retDesc);
    				}
    			},
    			error: function(err) {
    				alertOpnFn('err');
    			}
    		});
    	} else {
    		warnOpnFn('请填写完整!');
    	}
    }else{
    	if (papername && papertype && papertime && paperinstr) {
    		$.ajax({
    			type: 'post',
    			url: '/resume/paper/add',
    			data: {
    				papername: papername,
    				papertype: papertype,
    				papertime: papertime,
    				paperinstr: paperinstr
    			},
    			dataType: 'json',
    			success: function(data) {
    				if (data.retCode == 200) {
    					location.reload();
    				} else {
    					warnOpnFn(data.retDesc);
    				}
    			},
    			error: function(err) {
    				alertOpnFn('err');
    			}
    		});
    	} else {
    		warnOpnFn('请填写完整!');
    	}
    }
});

//修改
$myPaper.delegate('.J_operate-sel .select2', 'change', function(event) {
    var num=$(this).children('option:selected').val();
    if(num){
        paperAjaxCom(num);
      }else{
          $('.J_operate-add', $myPaper).hide();
      }
});

//comAjax
function paperAjaxCom(num){
    $('.J_operate-add', $myPaper).show();
    $.ajax({
        type: 'post',
        url: '/resume/allinfo',
        dataType: 'json',
        success: function(data) {
            $('.J_operate-add .J_hidden-ipt', $myPaper).val(num);
            $('.J_operate-add .papertype', $myPaper).val(data.allinfo.PatentPaper10[num].ppTime); 
            $('.J_operate-add .papername', $myPaper).val(data.allinfo.PatentPaper10[num].ppName);  
            $('.J_operate-add .papertime', $myPaper).val(data.allinfo.PatentPaper10[num].ppType); 
            $('.J_operate-add .paperinstr', $myPaper).val(data.allinfo.PatentPaper10[num].addt); 
        },
        error: function(err) {
            alertOpnFn('err');
        }
    });
}

/**
 * 
 *核心技能
 *
 **/
//公共变量
var $descriptioncon = $('#my-description'),
	$descadd=$('.J_operate-add', $descriptioncon),
	$descdel=$('.J_operate-del', $descriptioncon);

//操作方式
$descriptioncon.delegate('.J_operate-sel .select1', 'change', function(event) {
	$('.J_operate-add .J_hidden-ipt', $descriptioncon).val(''); // 动态修改的清空
	$('.J_operate-add .descriptioncon', $descriptioncon).html(''); // 动态修改的清空
	if ($(this).children('option:selected').val() == 1) {
		$('.J_operate-del', $descriptioncon).hide();
		$('.J_operate-add', $descriptioncon).show();
		$(".J_operate-sel", $descriptioncon).find(".J_change-con").hide();
	} else if ($(this).children('option:selected').val() == 2) {
		$('.J_operate-del', $descriptioncon).show();
		$('.J_operate-add', $descriptioncon).hide();
		$(".J_operate-sel", $descriptioncon).find(".J_change-con").hide();
	} else if ($(this).children('option:selected').val() == 3) {
		$('.J_operate-del', $descriptioncon).hide();
		$('.J_operate-add', $descriptioncon).hide();
		$(".J_operate-sel", $descriptioncon).find(".J_change-con").show();
		var num=$('.J_operate-sel .select2', $descriptioncon).children('option:selected').val();
		if(num){
			descAjaxCom(num);
		}
	}else {
		$('.J_operate-del', $descriptioncon).hide();
		$('.J_operate-add', $descriptioncon).hide();
		$(".J_operate-sel", $descriptioncon).find(".J_change-con").hide();
  	}
});

//添加
$descriptioncon.delegate('.J_operate-add button', 'click', function(event) {
	var descVal = $.trim($descadd.find(".descriptioncon").val()),
		hiddenipt = $.trim($descadd.find(".J_hidden-ipt").val());
	if(hiddenipt){
			if (descVal) {
				$.ajax({
					type: 'post',
					url: '/resume/desc/upd',
					data: {
						desCon: descVal,
						updateid: hiddenipt
					},
					dataType: 'json',
					success: function(data) {
						if (data.retCode == 200) {
							location.reload();
						} else {
							warnOpnFn(data.retDesc);
						}
					},
					error: function(err) {
						alertOpnFn('err');
					}
				});
			} else {
				warnOpnFn('请填写完整!');
			}
	}else{
		if (descVal) {
			$.ajax({
				type: 'post',
				url: '/resume/desc/add',
				data: {
					desCon: descVal
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	}
	
});

//删除
$descriptioncon.delegate('.J_operate-del button', 'click', function(event) {
	var delnum = $.trim($descdel.find("select").children('option:selected').val());
	if (delnum) {
		$.ajax({
			type: 'post',
			url: '/resume/desc/del',
			data: {
				delnum: delnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	} else {
		warnOpnFn('请选择要删除的内容!');
	}
});

//修改
$descriptioncon.delegate('.J_operate-sel .select2', 'change', function(event) {
	var num=$(this).children('option:selected').val();
	if(num){
		descAjaxCom(num);
  	}else{
  		$('.J_operate-add', $descriptioncon).hide();
  	}
});

//comAjax
function descAjaxCom(num){
	$('.J_operate-add', $descriptioncon).show();
	$.ajax({
		type: 'post',
		url: '/resume/allinfo',
		dataType: 'json',
		success: function(data) {
			$('.J_operate-add .J_hidden-ipt', $descriptioncon).val(num);
			$('.J_operate-add .descriptioncon', $descriptioncon).html(data.allinfo.Technology11[num]);
		},
		error: function(err) {
			alertOpnFn('err');
		}
	});
}


/**
 * 
 *分页模块
 *
 **/
//分页模块
function pageStep(clickobj){
	var pagenum;

	pagenum = clickPagebtn($(clickobj));
	if(pagenum != 0){
		pageChange(pagenum);
		return pagenum;
	}else{
		return 0;
	}
}

function pageChange(clickNum){
	var pagetipHtml='共'+__data.allpage+'页&nbsp;';

	if(__data.allpage != __data.showpagetip){
		pagetipHtml+='<li class="J_pre-page"><a href="javascript:;">&laquo;</a></li>';
		pagetipHtml+= pagebtnShow(clickNum);
		pagetipHtml+='<li class="J_next-page"><a href="javascript:;">&raquo;</a></li>';
	}else{
		pagetipHtml+='<li class="J_pre-page"><a href="javascript:;">&laquo;</a></li>';
		for(var i=1; i<=__data.allpage; i++){
			pagetipHtml+=comCon(i, clickNum);
		}
		pagetipHtml+='<li class="J_next-page"><a href="javascript:;">&raquo;</a></li>';
	}

	$("#pageShow ul").html(pagetipHtml);
}

function pagebtnShow(clickNum){
	var pagetipHtml="";
	var curNum=clickNum;
	var	nextNumDeta=__data.allpage-curNum;
	var	preNumDeta=curNum-4;

	if(nextNumDeta>=4 && preNumDeta>0){
		for(var i=curNum-4;i<=curNum+4;i++){
			pagetipHtml+=comCon(i, clickNum);
		}
	}else if(preNumDeta<=0){
		for(var i=1;i<=curNum+5-preNumDeta;i++){
			pagetipHtml+=comCon(i, clickNum);
		}
	}else{
		for(var i=curNum-4-(4-nextNumDeta);i<=__data.allpage;i++){
			pagetipHtml+=comCon(i, clickNum);
		}
	}

	return pagetipHtml;
}

function comCon(i, clickNum){
	var htmlS="";
	if(i==clickNum){
		htmlS='<li class="am-active"><a href="javascript:;">'+i+'</a></li>';
	}else{
		htmlS='<li><a href="javascript:;">'+i+'</a></li>';
	}

	return htmlS;
}

function clickPagebtn(clickobj){
	var pagenum=0;
	var contain=$(clickobj).closest("#pageShow");
	var pagenum=$(contain).find(".am-active").text();

	if(isPrepage(clickobj) || isNextpage(clickobj)){
		if(isPrepage(clickobj) && parseInt(pagenum) != 1){
			pagenum = parseInt(pagenum) - 1;
		}
		if(isNextpage(clickobj) && parseInt(pagenum) != __data.allpage){
			pagenum = parseInt(pagenum) + 1;
		}
	}else{
		pagenum = parseInt($(clickobj).find("a").text());
	}

	return pagenum;
}

function isPrepage(clickobj){
	if($(clickobj).hasClass('J_pre-page')){
		return true;
	}else{
		return false;
	}
}

function isNextpage(clickobj){
	if($(clickobj).hasClass('J_next-page')){
		return true;
	}else{
		return false;
	}
}