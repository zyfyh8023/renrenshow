$(document).ready(function() {
	/**
	 *基本信息
	 **/
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
					$('#specialInstruc1', $myBaseinfo).clearForm();
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	})

	/**
	 *联系方式
	 **/
	$myContactinfo = $('#my-contactinfo');
	$myContactinfo.delegate('.my-contactinfo-btn', 'click', function() {
		var mphone = $.trim($(".mphone", $myContactinfo).val()),
			phone = $.trim($(".phone", $myContactinfo).val()),
			address = $.trim($(".address", $myContactinfo).val()),
			identity = $.trim($(".identity", $myContactinfo).val()),
			email = $.trim($(".email", $myContactinfo).val()),
			qqnum = $.trim($(".qqnum", $myContactinfo).val());
		if(mphone!="" &&  address!="" && email!=''){
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
		}else{
			warnOpnFn('请把需要填写的内容填写完整！');
		}
	});

	/**
	 *教育经历
	 **/
	 //公共变量
	var $myEducation = $('#my-education'),
		$myEducationadd=$('.J_operate-add', $myEducation),
		$myEducationdel=$('.J_operate-del', $myEducation);

	//操作方式
	$myEducation.delegate('.J_operate-sel .select1', 'change', function(event) {
	     $('#specialInstruc3', $myEducation).clearForm();

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
		var hiddenipt = $.trim($myEducation.find(".J_hidden-ipt").val());
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
	        	$('.J_operate-add .collegeName', $myEducation).val(data.allinfo.schools3[num].collegeName);
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


	/**
	 * 
	 *re工作
	 *
	 **/
	 //公共变量
	var $myRepractice = $('#my-repractice'),
		$myRepracticeadd=$('.J_operate-add', $myRepractice),
		$myRepracticedel=$('.J_operate-del', $myRepractice);

	//操作方式
	$myRepractice.delegate('.J_operate-sel .select1', 'change', function(event) {
	    $('.J_operate-add .J_hidden-ipt', $myRepractice).val(''); // 动态修改的清空
	    $('#specialInstruc4', $myRepractice).clearForm();

	    if ($(this).children('option:selected').val() == 1) {
	        $('.J_operate-del', $myRepractice).hide();
	        $('.J_operate-add', $myRepractice).show();
	        $(".J_operate-sel", $myRepractice).find(".J_change-con").hide();
	    } else if ($(this).children('option:selected').val() == 2) {
	        $('.J_operate-del', $myRepractice).show();
	        $('.J_operate-add', $myRepractice).hide();
	        $(".J_operate-sel", $myRepractice).find(".J_change-con").hide();
	    } else if ($(this).children('option:selected').val() == 3) {
	        $('.J_operate-del', $myRepractice).hide();
	        $('.J_operate-add', $myRepractice).hide();
	        $(".J_operate-sel", $myRepractice).find(".J_change-con").show();
	        var num=$('.J_operate-sel .select2', $myRepractice).children('option:selected').val();
	        if(num){
	            repracticeAjaxCom(num);
	        }
	    }else {
	        $('.J_operate-del', $myRepractice).hide();
	        $('.J_operate-add', $myRepractice).hide();
	        $(".J_operate-sel", $myRepractice).find(".J_change-con").hide();
	      }
	});

	$myRepractice.delegate('#inputFile4', 'change', function() {
		$('.imgtip', $myRepractice).html($(this).val());
	})

	//修改
	$myRepractice.delegate('.J_operate-sel .select2', 'change', function(event) {
	    var num=$(this).children('option:selected').val();
	    if(num){
	        repracticeAjaxCom(num);
	      }else{
	          $('.J_operate-add', $myRepractice).hide();
	      }
	});

	//comAjax
	function repracticeAjaxCom(num){
	    $('.J_operate-add', $myRepractice).show();
	    $.ajax({
	        type: 'post',
	        url: '/resume/allinfo',
	        dataType: 'json',
	        success: function(data) {
	            $('.J_operate-add .J_hidden-ipt', $myRepractice).val(num);
	            $('.J_operate-add .practice', $myRepractice).val(data.allinfo.experience4[num].practice); 
	            $('.J_operate-add .spracticetime', $myRepractice).val(data.allinfo.experience4[num].spracticetime); 
	            $('.J_operate-add .epracticetime', $myRepractice).val(data.allinfo.experience4[num].epracticetime); 
	            $('.J_operate-add .practiceposition', $myRepractice).val(data.allinfo.experience4[num].practiceposition); 
	            $('.J_operate-add .practiceinstr', $myRepractice).val(data.allinfo.experience4[num].practiceinstr); 
	            $('.J_operate-add .departmentName', $myRepractice).val(data.allinfo.experience4[num].departmentName);
	        },
	        error: function(err) {
	            alertOpnFn('err');
	        }
	    });
	}

	$myRepractice.delegate('#upload4', 'click', function(event) {
		var hiddenipt = $.trim($myRepractice.find(".J_hidden-ipt").val());
		if(hiddenipt){
			$('#specialInstruc4', $myRepractice).ajaxForm({
				url: $('#specialInstruc4', $myRepractice).attr('name'),
				type: 'POST',
				success: function(res, status, xhr, $form) {
					if (res.retCode != 200) {
						warnOpnFn(res.retDesc);
					} else {
						location.reload();
					}
					$('#specialInstruc4', $myRepractice).clearForm();
				},
				error: function(res, status, e) {
					alertOpnFn('err');
					$('#specialInstruc4', $myRepractice).clearForm();
				}
			});
		}else{
			$('#specialInstruc4', $myRepractice).ajaxForm({
				url: $('#specialInstruc4', $myRepractice).attr('action'),
				type: 'POST',
				success: function(res, status, xhr, $form) {
					if (res.retCode != 200) {
						warnOpnFn(res.retDesc);
					} else {
						location.reload();
					}
					$('#specialInstruc4', $myRepractice).clearForm();
				},
				error: function(res, status, e) {
					alertOpnFn('err');
					$('#specialInstruc4', $myRepractice).clearForm();
				}
			});
		}
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


	/**
	 * 
	 *工作
	 *
	 **/
	 //公共变量
	var $myPractice = $('#my-practice'),
		$myPracticeadd=$('.J_operate-add', $myPractice),
		$myPracticedel=$('.J_operate-del', $myPractice);

	//操作方式
	$myPractice.delegate('.J_operate-sel .select1', 'change', function(event) {
	    $('.J_operate-add .J_hidden-ipt', $myPractice).val(''); // 动态修改的清空
	  	$('#specialInstruc5', $myPractice).clearForm();

	    if ($(this).children('option:selected').val() == 1) {
	        $('.J_operate-del', $myPractice).hide();
	        $('.J_operate-add', $myPractice).show();
	        $(".J_operate-sel", $myPractice).find(".J_change-con").hide();
	    } else if ($(this).children('option:selected').val() == 2) {
	        $('.J_operate-del', $myPractice).show();
	        $('.J_operate-add', $myPractice).hide();
	        $(".J_operate-sel", $myPractice).find(".J_change-con").hide();
	    } else if ($(this).children('option:selected').val() == 3) {
	        $('.J_operate-del', $myPractice).hide();
	        $('.J_operate-add', $myPractice).hide();
	        $(".J_operate-sel", $myPractice).find(".J_change-con").show();
	        var num=$('.J_operate-sel .select2', $myPractice).children('option:selected').val();
	        if(num){
	            practiceAjaxCom(num);
	        }
	    }else {
	        $('.J_operate-del', $myPractice).hide();
	        $('.J_operate-add', $myPractice).hide();
	        $(".J_operate-sel", $myPractice).find(".J_change-con").hide();
	      }
	});

	$myPractice.delegate('#inputFile5', 'change', function() {
		$('.imgtip', $myPractice).html($(this).val());
	})

	$myPractice.delegate('#upload5', 'click', function(event) {
		var hiddenipt = $.trim($myPractice.find(".J_hidden-ipt").val());
		if(hiddenipt){
			$('#specialInstruc5', $myPractice).ajaxForm({
				url: $('#specialInstruc5', $myPractice).attr('name'),
				type: 'POST',
				success: function(res, status, xhr, $form) {
					if (res.retCode != 200) {
						warnOpnFn(res.retDesc);
					} else {
						location.reload();
					}
				},
				error: function(res, status, e) {
					alertOpnFn('err');
				}
			});
		}else{
			$('#specialInstruc5', $myPractice).ajaxForm({
				url: $('#specialInstruc5', $myPractice).attr('action'),
				type: 'POST',
				success: function(res, status, xhr, $form) {
					if (res.retCode != 200) {
						warnOpnFn(res.retDesc);
					} else {
						location.reload();
					}
				},
				error: function(res, status, e) {
					alertOpnFn('err');
				}
			});
		}
	});

	//修改
	$myPractice.delegate('.J_operate-sel .select2', 'change', function(event) {
	    var num=$(this).children('option:selected').val();
	    if(num){
	        practiceAjaxCom(num);
	      }else{
	          $('.J_operate-add', $myPractice).hide();
	      }
	});

	//comAjax
	function practiceAjaxCom(num){
	    $('.J_operate-add', $myPractice).show();
	    $.ajax({
	        type: 'post',
	        url: '/resume/allinfo',
	        dataType: 'json',
	        success: function(data) {
	            $('.J_operate-add .J_hidden-ipt', $myPractice).val(num);
	            $('.J_operate-add .practice', $myPractice).val(data.allinfo.work5[num].practice); 
	            $('.J_operate-add .spracticetime', $myPractice).val(data.allinfo.work5[num].spracticetime); 
	            $('.J_operate-add .epracticetime', $myPractice).val(data.allinfo.work5[num].epracticetime); 
	            $('.J_operate-add .practiceposition', $myPractice).val(data.allinfo.work5[num].practiceposition); 
	            $('.J_operate-add .practiceinstr', $myPractice).val(data.allinfo.work5[num].practiceinstr); 
	            $('.J_operate-add .departmentName', $myPractice).val(data.allinfo.work5[num].departmentName); 
	        },
	        error: function(err) {
	            alertOpnFn('err');
	        }
	    });
	}

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


	/**
	 * 
	 *荣誉证书
	 *
	 **/
	 //公共变量
	var $myCertificate = $('#my-certificate'),
		$myCertificateadd=$('.J_operate-add', $myCertificate),
		$myCertificatedel=$('.J_operate-del', $myCertificate);

	//操作方式
	$myCertificate.delegate('.J_operate-sel .select1', 'change', function(event) {
	    $('.J_operate-add .J_hidden-ipt', $myCertificate).val(''); // 动态修改的清空
	    $('#specialInstruc6', $myCertificate).clearForm();

	    if ($(this).children('option:selected').val() == 1) {
	        $('.J_operate-del', $myCertificate).hide();
	        $('.J_operate-add', $myCertificate).show();
	        $(".J_operate-sel", $myCertificate).find(".J_change-con").hide();
	    } else if ($(this).children('option:selected').val() == 2) {
	        $('.J_operate-del', $myCertificate).show();
	        $('.J_operate-add', $myCertificate).hide();
	        $(".J_operate-sel", $myCertificate).find(".J_change-con").hide();
	    } else if ($(this).children('option:selected').val() == 3) {
	        $('.J_operate-del', $myCertificate).hide();
	        $('.J_operate-add', $myCertificate).hide();
	        $(".J_operate-sel", $myCertificate).find(".J_change-con").show();
	        var num=$('.J_operate-sel .select2', $myCertificate).children('option:selected').val();
	        if(num){
	            certificateAjaxCom(num);
	        }
	    }else {
	        $('.J_operate-del', $myCertificate).hide();
	        $('.J_operate-add', $myCertificate).hide();
	        $(".J_operate-sel", $myCertificate).find(".J_change-con").hide();
	      }
	});

	$myCertificate.delegate('#inputFile6', 'change', function() {
		$('.imgtip', $myCertificate).html($(this).val());
	})

	$myCertificate.delegate('#upload6', 'click', function(event) {
		var hiddenipt = $.trim($myCertificate.find(".J_hidden-ipt").val());
		if(hiddenipt){
			$('#specialInstruc6', $myCertificate).ajaxForm({
				url: $('#specialInstruc6', $myCertificate).attr('name'),
				type: 'POST',
				success: function(res, status, xhr, $form) {
					if (res.retCode != 200) {
						warnOpnFn(res.retDesc);
					} else {
						location.reload();
					}
					$('#specialInstruc6', $myCertificate).clearForm();
				},
				error: function(res, status, e) {
					alertOpnFn('err');
					$('#specialInstruc6', $myCertificate).clearForm();
				}
			});
		}else{
			$('#specialInstruc6', $myCertificate).ajaxForm({
				url: $('#specialInstruc6', $myCertificate).attr('action'),
				type: 'POST',
				success: function(res, status, xhr, $form) {
					if (res.retCode != 200) {
						warnOpnFn(res.retDesc);
					} else {
						location.reload();
					}
					$('#specialInstruc6', $myCertificate).clearForm();
				},
				error: function(res, status, e) {
					alertOpnFn('err');
					$('#specialInstruc6', $myCertificate).clearForm();
				}
			});
		}
	});

	//修改
	$myCertificate.delegate('.J_operate-sel .select2', 'change', function(event) {
	    var num=$(this).children('option:selected').val();
	    if(num){
	        certificateAjaxCom(num);
	      }else{
	          $('.J_operate-add', $myCertificate).hide();
	      }
	});

	//comAjax
	function certificateAjaxCom(num){
	    $('.J_operate-add', $myCertificate).show();
	    $.ajax({
	        type: 'post',
	        url: '/resume/allinfo',
	        dataType: 'json',
	        success: function(data) {
	            $('.J_operate-add .J_hidden-ipt', $myCertificate).val(num);
	            $('.J_operate-add .certificatename', $myCertificate).val(data.allinfo.Certificate6[num].certificatename); 
	            $('.J_operate-add .gettime', $myCertificate).val(data.allinfo.Certificate6[num].gettime); 
	            $('.J_operate-add .cgrade', $myCertificate).val(data.allinfo.Certificate6[num].cgrade); 
	            $('.J_operate-add .certificateinstr', $myCertificate).val(data.allinfo.Certificate6[num].certificateinstr); 
	        },
	        error: function(err) {
	            alertOpnFn('err');
	        }
	    });
	}

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


	/**
	 * 
	 *我的作品
	 *
	 **/
	 //公共变量
	var $myWorks = $('#my-works'),
		$myWorksadd=$('.J_operate-add', $myWorks),
		$myWorksdel=$('.J_operate-del', $myWorks);

	//操作方式
	$myWorks.delegate('.J_operate-sel .select1', 'change', function(event) {
	    $('.J_operate-add .J_hidden-ipt', $myWorks).val(''); // 动态修改的清空
	    $('#specialInstruc7', $myWorks).clearForm();

	    if ($(this).children('option:selected').val() == 1) {
	        $('.J_operate-del', $myWorks).hide();
	        $('.J_operate-add', $myWorks).show();
	        $(".J_operate-sel", $myWorks).find(".J_change-con").hide();
	    } else if ($(this).children('option:selected').val() == 2) {
	        $('.J_operate-del', $myWorks).show();
	        $('.J_operate-add', $myWorks).hide();
	        $(".J_operate-sel", $myWorks).find(".J_change-con").hide();
	    } else if ($(this).children('option:selected').val() == 3) {
	        $('.J_operate-del', $myWorks).hide();
	        $('.J_operate-add', $myWorks).hide();
	        $(".J_operate-sel", $myWorks).find(".J_change-con").show();
	        var num=$('.J_operate-sel .select2', $myWorks).children('option:selected').val();
	        if(num){
	            worksAjaxCom(num);
	        }
	    }else {
	        $('.J_operate-del', $myWorks).hide();
	        $('.J_operate-add', $myWorks).hide();
	        $(".J_operate-sel", $myWorks).find(".J_change-con").hide();
	      }
	});

	$myWorks.delegate('#inputFile7', 'change', function() {
		var imgStr = "",
			fileObjs = $('#inputFile7', $myWorks).get(0);
		for (var j = 0, len = fileObjs.files.length; j < len; j++) {
			imgStr = imgStr + fileObjs.files[j].name + '<i style="margin-right:20px;"></i>';
		}
		$('.imgtip', $myWorks).html(imgStr);
	})

	$myWorks.delegate('#upload7', 'click', function(event) {
		var hiddenipt = $.trim($myWorks.find(".J_hidden-ipt").val());
		if(hiddenipt){
			$('#specialInstruc7', $myWorks).ajaxForm({
				url: $('#specialInstruc7', $myWorks).attr('name'),
				type: 'POST',
				success: function(res, status, xhr, $form) {
					if (res.retCode != 200) {
						warnOpnFn(res.retDesc);
					} else {
						location.reload();
					}
					$('#specialInstruc7', $myWorks).clearForm();
				},
				error: function(res, status, e) {
					alertOpnFn('err');
					$('#specialInstruc7', $myWorks).clearForm();
				}
			});
		}else{
			$('#specialInstruc7', $myWorks).ajaxForm({
				url: $('#specialInstruc7', $myWorks).attr('action'),
				type: 'POST',
				success: function(res, status, xhr, $form) {
					if (res.retCode != 200) {
						warnOpnFn(res.retDesc);
					} else {
						location.reload();
					}
					$('#specialInstruc7', $myWorks).clearForm();
				},
				error: function(res, status, e) {
					alertOpnFn('err');
					$('#specialInstruc7', $myWorks).clearForm();
				}
			});
		}
	});

	//修改
	$myWorks.delegate('.J_operate-sel .select2', 'change', function(event) {
	    var num=$(this).children('option:selected').val();
	    if(num){
	        worksAjaxCom(num);
	      }else{
	          $('.J_operate-add', $myWorks).hide();
	      }
	});

	//comAjax
	function worksAjaxCom(num){
	    $('.J_operate-add', $myWorks).show();
	    $.ajax({
	        type: 'post',
	        url: '/resume/allinfo',
	        dataType: 'json',
	        success: function(data) {
	            $('.J_operate-add .J_hidden-ipt', $myWorks).val(num);
	            $('.J_operate-add .workname', $myWorks).val(data.allinfo.pWorks7[num].workname); 
	            $('.J_operate-add .worktime', $myWorks).val(data.allinfo.pWorks7[num].worktime); 
	            $('.J_operate-add .showink', $myWorks).val(data.allinfo.pWorks7[num].relationlink); 
	            $('.J_operate-add .workdes', $myWorks).val(data.allinfo.pWorks7[num].workdes); 
	        },
	        error: function(err) {
	            alertOpnFn('err');
	        }
	    });
	}

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
	    $('.J_operate-add .pnum', $myProjects).val(''); // 动态修改的清空
	    $('.J_operate-add .myPos', $myProjects).val(''); // 动态修改的清空
	    $('.J_operate-add .myworks', $myProjects).val(''); // 动态修改的清空

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
			pnum = $.trim($(".pnum", $myProjects).val()),
			myPos = $.trim($(".myPos", $myProjects).val()),
			myworks = $.trim($(".myworks", $myProjects).val()),
			hiddenipt = $.trim($myProjectsadd.find(".J_hidden-ipt").val());
		if(hiddenipt){
			if (pname && ptime && paddt) {
				$.ajax({
					type: 'post',
					url: '/resume/projects/upd',
					data: {
						pname: $(".pname", '#my-projects').val(),
						ptime: $(".ptime", '#my-projects').val(),
						paddt: $(".paddt", '#my-projects').val(),
						pnum: $(".pnum", '#my-projects').val(),
						myPos: $(".myPos", '#my-projects').val(),
						myworks: $(".myworks", '#my-projects').val(),
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
			if (pname && ptime && paddt) {
				$.ajax({
					type: 'post',
					url: '/resume/projects/add',
					data: {
						pname: $(".pname", '#my-projects').val(),
						ptime: $(".ptime", '#my-projects').val(),
						paddt: $(".paddt", '#my-projects').val(),
						pnum: $(".pnum", '#my-projects').val(),
						myPos: $(".myPos", '#my-projects').val(),
						myworks: $(".myworks", '#my-projects').val()
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
	            $('.J_operate-add .pname', $myProjects).val(data.allinfo.projects8[num].pName); 
	            $('.J_operate-add .ptime', $myProjects).val(data.allinfo.projects8[num].pTime); 
	            $('.J_operate-add .paddt', $myProjects).val(data.allinfo.projects8[num].addt); 
	            $('.J_operate-add .pnum', $myProjects).val(data.allinfo.projects8[num].pnum); 
	            $('.J_operate-add .myPos', $myProjects).val(data.allinfo.projects8[num].myPos); 
	            $('.J_operate-add .myworks', $myProjects).val(data.allinfo.projects8[num].myworks); 
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
		$('.J_operate-add .authors', $myPaper).val(''); // 动态修改的清空
		$('.J_operate-add .ppaddr', $myPaper).val(''); // 动态修改的清空

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
			authors = $.trim($(".authors", $myPaper).val()),
			ppaddr = $.trim($(".ppaddr", $myPaper).val()),
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
	    				updateid: hiddenipt,
	    				authors: authors,
	    				ppaddr: ppaddr
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
	    				paperinstr: paperinstr,
	    				authors: authors,
	    				ppaddr: ppaddr
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
	            $('.J_operate-add .authors', $myPaper).val(data.allinfo.PatentPaper10[num].allAuthors); 
	            $('.J_operate-add .ppaddr', $myPaper).val(data.allinfo.PatentPaper10[num].ppAddr); 
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

	
})