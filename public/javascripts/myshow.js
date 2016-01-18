var jx1=0, jy1=0, jw=0, jh=0;

$(document).ready(function() {
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
	var $privateSeting=$('#zy-privateSeting');
	$privateSeting.delegate('.saveBtn', 'click', function(event) {
		$('#zy-priset-name').modal({
		  	relatedTarget: this,
		  	onConfirm: function(e) {
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
		    		url: '/privateSeting/add',
		    		data: {
		    			uNameSet: JSON.stringify(setingArr),
		    			setName: e.data
		    		},
		    		dataType: 'json',
		    		success: function(data) {
		    			if (data.retCode != 200) {
		    				warnOpnFn(data.retDesc);
		    			} else {
		    				location.reload();
		    			}
		    		},
		    		error: function(data) {
		    			alertOpnFn('err');
		    		}
		    	});
		  	},
		  	onCancel: function(e) {
		    	alert('您最终选择放弃了此次设置!');
		  	}
		});
	});
	
	$privateSeting.delegate('.saveBtnUpd', 'click', function(event) {
		var ids=$(this).data('ids');

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
    		url: '/privateSeting/upd',
    		data: {
    			uNameSet: JSON.stringify(setingArr),
    			ids: ids
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
	
	$privateSeting.delegate('.zy-upd-set-con', 'click', function(event) {
		var ids=$(this).closest('tr').data('ids');
		$.ajax({
			type: 'post',
			url: '/privateSeting/chg',
			data: {
				ids: ids
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode != 200) {
					warnOpnFn(data.retDesc);
				} else {
					location.reload();
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});

	$privateSeting.delegate('.zy-del-set-con', 'click', function(event) {
		var ids=$(this).closest('tr').data('ids');
		$.ajax({
			type: 'post',
			url: '/privateSeting/del',
			data: {
				ids: ids
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode != 200) {
					warnOpnFn(data.retDesc);
				} else {
					location.reload();
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});

	$privateSeting.delegate('.zy-look-set-con', 'click', function(event) {
		var ids=$(this).closest('tr').data('ids');
		$(this).closest('table').find('tr').removeClass('am-active');
		$(this).closest('tr').addClass('am-active');
		$.ajax({
			type: 'post',
			url: '/privateSeting/see',
			data: {
				ids: ids
			},
			dataType: 'json',
			success: function(data) {
				var strAlls='<div data-am-widget="titlebar" class="am-titlebar am-titlebar-multi" >'+
					    	'<h2 class="am-titlebar-title ">对应选中特权设置的内容如下所示：</h2></div><br>';

				for(var k=0; k<data.retData.moduleCon.length; k++){
					var strEles="";
					for(var j=0;j<data.retData.moduleCon[k].sunModels.length;j++){
						if(data.retData.moduleCon[k].modelNam =='个性简介' || data.retData.moduleCon[k].modelNam =='公开时间'){
							if(data.retData.moduleCon[k].sunModels[j].sunYesNo ==1){
								strEles+='<a class="zy-div-radio am-badge am-badge-success am-text-lg">'+data.retData.moduleCon[k].sunModels[j].sunNam +'</a> ';
							}else{
								strEles+='<a class="zy-div-radio am-badge am-text-lg">'+data.retData.moduleCon[k].sunModels[j].sunNam +'</a> ';
							}
						}else{
							if(data.retData.moduleCon[k].sunModels[j].sunYesNo ==1){
								strEles+='<a class="zy-div-checkbox  am-badge am-badge-success am-text-lg">'+data.retData.moduleCon[k].sunModels[j].sunNam +'</a> ';
							}else{
								strEles+='<a class="zy-div-checkbox  am-badge am-text-lg">'+data.retData.moduleCon[k].sunModels[j].sunNam +'</a> ';
							}
						}
					}
					strAlls+='<div class="zy-public-title">'+
                   			'<span class="am-badge am-badge-secondary am-round am-text-xl">'+(k+1)+'</span> <span class="titleName am-badge am-badge-secondary am-text-xl">'+data.retData.moduleCon[k].modelNam+'</span>'+
               				'</div> <div class="zy-public-content zy-change-content">'+strEles+'</div>';
				}
				strAlls+='<div style="margin-left:50px;">'+
						'<button data-ids="'+ids+'" class="saveBtnUpd am-btn am-btn-warning am-text-lg"> 保存以上修改 </button> </div><br>';

				$('.zy-set-show').html(strAlls);
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
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){

			    		var artTim = new Date(data.allArticles[i].cTime);
			    		var artTim2 = artTim.getFullYear()+'-'+
			    					artTim.getMonth()+'-'+
			    					artTim.getDate()+' '+
			    					artTim.getHours()+':'+
			    					artTim.getMinutes()+':'+
			    					artTim.getSeconds();

			    		var htmlTemp=
			    			'<tr  data-ids="'+data.allArticles[i]._id+'">'+
			    			'<td class="am-text-middle">'+(((pagenum-1)*10)+(i+1))+'</td>'+
			    			'<td class="am-text-middle">'+data.allArticles[i].experienceTitle+'</td>'+
			    			'<td class="am-text-middle">'+data.allArticles[i].experienceCompany+'</td>'+
			    			'<td class="am-text-middle">'+artTim2+'</td>'+
			    			'<td class="am-text-middle">'+
			    			'<a href="javascript:;" class="zy-del-art">删除</a><br>'+
			    			'<a href="/blog_exp?aid=123132135">查看</a><br>';

			    		if(data.allArticles[i].experienceTag=='2'){
			    			htmlTemp+='<a href="javascript:;" class="zy-pub-art">发布</a>';
			    		}
			    		htmlTemp+='</td></tr>';
			    		htmls+=htmlTemp;
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
			experienceCont = experienceCon.getContent();

		if (experienceTitle != '' && experienceCompany != '' && experienceCont != '') {
			
			$('#zy-img-con').html(experienceCont).hide();
			var srcArr=[];
			$('#zy-img-con img').each(function () {
			     var src = $(this).attr("src");
			     srcArr.push(src);
			 });
			$('#zy-img-con').html('').hide();

			$.ajax({
				type: 'post',
				url: '/createExperience',
				data: {
					tags: 1,
					experienceTitle: experienceTitle,
					experienceCompany: experienceCompany,
					experienceCont: experienceCont,
					experienceImgs: srcArr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.href="/blogs_exp_pub";
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
			experienceCont = experienceCon.getContent();

		if (experienceTitle != '' && experienceCompany != '' && experienceCont != '') {
			
			$('#zy-img-con').html(experienceCont).hide();
			var srcArr=[];
			$('#zy-img-con img').each(function () {
			     var src = $(this).attr("src");
			     srcArr.push(src);
			 });
			$('#zy-img-con').html('').hide();

			$.ajax({
				type: 'post',
				url: '/createExperience',
				data: {
					tags: 2,
					experienceTitle: experienceTitle,
					experienceCompany: experienceCompany,
					experienceCont: experienceCont,
					experienceImgs: srcArr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.href="/blogs_exp_pri";
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

	//experience删除
	var $manExper = $('#zy-manageExperience');
	$manExper.delegate('.zy-del-art', 'click', function() {
		var aid=$(this).closest('tr').data('ids');

		$.ajax({
			type: 'post',
			url: '/delExper',
			data: {
				aid: aid
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});
	
	//experience草稿改为发布
	$manExper.delegate('.zy-pub-art', 'click', function() {
		var aid=$(this).closest('tr').data('ids');

		$.ajax({
			type: 'post',
			url: '/pubExper',
			data: {
				aid: aid
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
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
			    	var htmls="";
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		var artTyp;
			    		switch(data.allArticles[i].articleType){
			    			case 1:
			    				artTyp="技术博客";
			    				break;
			    			case 2:
			    				artTyp="行业远瞻";
			    				break;
			    			case 3:
			    				artTyp="乱七八糟";
			    				break;
			    			default:
			    				artTyp=data.allArticles[i].articleType;
			    				break;
			    		}
			    		
			    		var artTim = new Date(data.allArticles[i].cTime);
			    		var artTim2 = artTim.getFullYear()+'-'+
			    					artTim.getMonth()+'-'+
			    					artTim.getDate()+' '+
			    					artTim.getHours()+':'+
			    					artTim.getMinutes()+':'+
			    					artTim.getSeconds();

			    		var htmlTemp=
			    			'<tr data-ids="'+data.allArticles[i]._id+'">'+
			    			'<td class="am-text-middle">'+(((pagenum-1)*10)+(i+1))+'</td>'+
			    			'<td class="am-text-middle">'+data.allArticles[i].articleTitle+'</td>'+
			    			'<td class="am-text-middle">'+artTyp+'</td>'+
			    			'<td class="am-text-middle">'+artTim2+'</td>'+
			    			'<td class="am-text-middle">'+
			    			'<a href="javascript:;" class="zy-del-art">删除</a><br>'+
			    			'<a href="/blog_art?aid='+data.allArticles[i]._id+'">查看</a><br>';

			    		if(data.allArticles.articleTag=='2'){
			    			htmlTemp+='<a href="javascript:;" class="zy-pub-art">发布</a>';
			    		}
			    		htmlTemp+='</td></tr>';
			    		htmls+=htmlTemp;
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
			articleCont = articleCon.getContent();

		if (articleTitle != '' && articleKeyword != '' && articleType != '' && articleCont != '') {
			
			$('#zy-img-con').html(articleCont).hide();
			var srcArr=[];
			$('#zy-img-con img').each(function () {
			     var src = $(this).attr("src");
			     srcArr.push(src);
			 });
			$('#zy-img-con').html('').hide();

			$.ajax({
				type: 'post',
				url: '/createarticle',
				data: {
					tags: 1,
					articleTitle: articleTitle,
					articleKeyword: articleKeyword,
					articleType: articleType,
					articleCont: articleCont,
					articleImgs: srcArr
				},
				traditional: true,
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.href="/blogs_art_pub";
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
			articleCont = articleCon.getContent();

		if (articleTitle != '' && articleKeyword != '' && articleType != '' && articleCont != '') {
			
			$('#zy-img-con').html(articleCont).hide();
			var srcArr=[];
			$('#zy-img-con img').each(function () {
			     var src = $(this).attr("src");
			     srcArr.push(src);
			 });
			$('#zy-img-con').html('').hide();

			$.ajax({
				type: 'post',
				url: '/createarticle',
				data: {
					tags: 2,
					articleTitle: articleTitle,
					articleKeyword: articleKeyword,
					articleType: articleType,
					articleCont: articleCont,
					articleImgs: srcArr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.href="/blogs_art_pri";
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
	
	//article删除
	var $manArticle = $('#zy-manageArticle');
	$manArticle.delegate('.zy-del-art', 'click', function() {
		var aid=$(this).closest('tr').data('ids');

		$.ajax({
			type: 'post',
			url: '/delArticle',
			data: {
				aid: aid
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});
	
	//article草稿改为发布
	$manArticle.delegate('.zy-pub-art', 'click', function() {
		var aid=$(this).closest('tr').data('ids');

		$.ajax({
			type: 'post',
			url: '/pubArticle',
			data: {
				aid: aid
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
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
				$('#specialInstruc5', $myPractice).clearForm();
			},
			error: function(res, status, e) {
				alertOpnFn('err');
				$('#specialInstruc5', $myPractice).clearForm();
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
				$('#specialInstruc5', $myPractice).clearForm();
			},
			error: function(res, status, e) {
				alertOpnFn('err');
				$('#specialInstruc5', $myPractice).clearForm();
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
            $('.J_operate-add .workduty', $myWorks).val(data.allinfo.pWorks7[num].workduty); 
            $('.J_operate-add .showink', $myWorks).val(data.allinfo.pWorks7[num].showink); 
            $('.J_operate-add .codelink', $myWorks).val(data.allinfo.pWorks7[num].codelink); 
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