$(document).ready(function(){ 
	/**
	 * myheader页面的js
	 */
	$('#zy-loginOut').click(function(){
	    $.ajax({    
	        type:'post',        
	        url:'/loginOut',   
	        dataType:'json',      
	        success:function(data){ 
	            location.href="/login";
	        },
	        error : function(err) {   
	            alertOpnFn('err');
	        }        
	    }); 
	});

	/**
	 * seting和privateSeting页面的js
	 */
	//模拟radio
	$('.zy-div-radio').click(function(){
	    $(this).parent().children().removeClass('am-badge-success');
	    $(this).addClass('am-badge-success');
	});
	//模拟checkbox
	$('.zy-div-checkbox').click(function(){
	    if($(this).hasClass("am-badge-success")){
	        $(this).removeClass("am-badge-success")
	    }else{
	        $(this).addClass("am-badge-success")
	    }
	});

	/********************
	 **seting页面的js
	 *********************/
	//seting页面保存事件
	$('#zy-setting').delegate('button', 'click', function(event) {
	    var setingArr=[];
	    $(".zy-change-content", $('#zy-setting')).each(function(){
	        var temp={};
	        temp.modelNam=$(this).prev().children(".titleName").text();
	        temp.sunModels=[];
	        for(var i=0;i<$(this).children("a").length;i++){
	          	var tempObj={};
	          	if($($(this).children("a")[i]).hasClass("am-badge-success")){
					tempObj.sunNam=$($(this).children("a")[i]).text();
					tempObj.sunYesNo=1;
	          	}
	          	else{
					tempObj.sunNam=$($(this).children("a")[i]).text();
					tempObj.sunYesNo=0;
	          	}
	           	temp.sunModels.push(tempObj);
	        }
	        setingArr.push(temp);
	    });
	    $.ajax({    
	        type:'post',        
	        url:'/seting',  
	        data: {uNameSet:JSON.stringify(setingArr)},    
	        dataType:'json',      
	        success:function(data){    
	            if(data.retCode!=200){
	            	warnOpnFn(data.retDesc);
	            }else{
	            	alertOpnFn('保存成功！');
	            }
	        },
	        error : function(data) {   
	            alertOpnFn('err');
	       }        
	    });  
	});

	/**
	 * privateSeting页面的js
	 */
	//privateSeting页面保存事件
	$("#zy-privateSeting").delegate('button', 'click', function(event) {
	    var setingArr=[];
	    $(".zy-change-content").each(function(){
	        var temp={};
	        temp.modelNam=$(this).prev().children(".titleName").text();
	        temp.sunModels=[];
	        for(var i=0;i<$(this).children("a").length;i++){
          		var tempObj={};
		        if($($(this).children("a")[i]).hasClass("am-badge-success")){
		            tempObj.sunNam=$($(this).children("a")[i]).text();
		            tempObj.sunYesNo=1;
		        }else{
	                tempObj.sunNam=$($(this).children("a")[i]).text();
	                tempObj.sunYesNo=0;
	            }
	           	temp.sunModels.push(tempObj);
	        }
	        setingArr.push(temp);
	    });

	     $.ajax({    
	        type:'post',        
	        url:'/privateSeting',  
	        data: {uNameSet:JSON.stringify(setingArr)},    
	        dataType:'json',      
	        success:function(data){    
	            if(data.retCode!=200){
	            	warnOpnFn(data.retDesc);
	            }else{
	            	alertOpnFn('保存成功！');
	            }
	        },
	        error : function(data) {   
	            alertOpnFn('err');
	       }        
	    });  
	});
	
	/**
	 * 修改密码页面的js
	 */
	//修改密码
	$('#zy-rePwd').delegate('button', 'click', function(event) {
		var oldpassword=$.trim($('.oldpassword', $('#zy-rePwd'))),
			newpassword=$.trim($('.newpassword', $('#zy-rePwd'))),
			newpassword2=$.trim($('.newpassword2', $('#zy-rePwd')));
		if(oldpassword!='' && newpassword!='' && newpassword2!=''){
			$.ajax({    
			    type:'post',        
			    url:'/changePassword',  
			    data: {
			    	oldpassword: oldpassword,
			    	newpassword: newpassword,
			    	newpassword2: newpassword2
			    },    
			    dataType:'json',      
			    success:function(data){    
			        if(data.retCode!=200){
			        	warnOpnFn(data.retDesc);
			        }else{
			        	alertOpnFn('修改成功！');
			        }
			    },
			    error : function(data) {   
			        alertOpnFn('err');
			    }        
			});  
		}else{
			warnOpnFn('请把信息填写完整！');
		}
	});

	/**
	 * introduction页面的js
	 */
	$('#my-specialinstr').delegate('#inputFile', 'change', function(event) {
		$('.imgtip','#my-specialinstr').html($('#inputFile','#my-specialinstr').val());
	});
	$('#my-specialinstr').delegate('#upload', 'click', function(event) {
        $('#specialInstruc','#my-specialinstr').ajaxForm({
            url: $('#specialInstruc','#my-specialinstr').attr('action'),
            type: 'POST',
            success: function (res, status, xhr, $form) {
            	if(res.retCode!=200){
					alertOpnFn(rs.retDesc);
            	}else{
            		location.reload();
            	}
                $('#specialInstruc','#my-specialinstr').clearForm();
            },
            error: function (res, status, e) {
            	alertOpnFn('err');
                $('#specialInstruc','#my-specialinstr').clearForm();
            }
        });
    })

	/**
	 * navigation页面的js
	 */
	//navigation的左侧列表的动态删除
	var $removenavmodel = $('#my-removenavmodel');
	$removenavmodel.delegate('button', 'click', function(event) {
		var navName=$(".addmodelNameD", $removenavmodel).val();
		if(navName!=''){
			$.ajax({    
	        	type:'post',        
	        	url:'/navigationListDel',  	
	        	data: {
	                navName:navName
	            },    
	        dataType:'json',    
	        success:function(data){  
	          	if(data.retCode == 200){
	            	$(".zy-navTitle-list li").each(function(){
	              		if($(this).find("span").text()==navName){
	                		$(this).remove();
	              		}
	            	});
		            $(".zy-navigation-list .zy-navigation-nav").each(function(){
		              	if($(this).find("button").text()==navName){
		                	$($(this).next()).remove();
		                	$(this).remove();
		              	}
		            });
		            $(".addmodelNameD option", $removenavmodel).each(function(){
		              	if($(this).text()==navName){
		                	$(this).remove();
		              	}
		            });
		            $removenavmodel.modal('close');
	          	}else{
	          		warnOpnFn(data.retDesc);
	          	}
	        },
	        error : function() {  
	        	alertOpnFn('err'); 
	        }        
	    }); 
		}else{
			warnOpnFn('不能为空哦~');
		}
	});

	//navigation的左侧列表的动态插入
	var $addnavmodel=$('#my-addnavmodel');
	$addnavmodel.delegate('button', 'click', function(event) {
		var navName=$.trim($(".addmodelNameA", $addnavmodel).val());
		if(navName!=''){
		    $.ajax({    
		        type:'post',        
		        url:'/navigationListAdd',  
		        data: {
		                navName:navName
		              },    
		        dataType:'json',    
		        success:function(data){   
		          	if(data.retCode == 200) {
		          		var tpl1="<li><a href='javascript:;'><span>"+navName+"</span>（0）</a></li>";
		          		$(tpl1).appendTo($(".zy-navTitle-list"));
		          		var tpl2="<div class='col-sm-12 am-u-sm-12 zy-navigation-nav'><button class='am-btn am-btn-primary am-btn-xl'>"+navName+"</button>"+
	          					"</div><div class='col-md-4 am-u-md-4 col-sm-6 am-u-sm-6 zy-navigation-item zy-navigation-add-ele am-u-end addBtn'>"+
	          					"<div><button type='button' data-am-modal='{target: '#my-navpopup'}'><img style='width:8.4rem;' src='/images/add.jpg'></button></div></div>";
	          			$(tpl2).appendTo(".zy-navigation-list");
	          			$("<option value="+navName+">"+navName+"</option>").appendTo($(".addmodelNameD",'#my-removenavmodel'));		
			            $addnavmodel.modal('close');
		          	}else{
		            	warnOpnFn(data.retDesc);
		          	}
		        },
		        error : function() {   
		          	alertOpnFn('err');  
		       }        
		    }); 
	    }else{
	    	warnOpnFn('内容不能为空哦~');
	    } 
	});

	//navigation的新链接元素的添加
	var $navpopup=$('#my-navpopup');
	$navpopup.delegate('button', 'click', function(event) {
		var moduleName=$.trim($(".moduleName", $navpopup).val()),
			moduleInfo=$.trim($(".moduleInfo", $navpopup).val()),
			moduleLink=$.trim($(".moduleLink", $navpopup).val());
			thisPar=$(this).closest('.am-u-end').prev(".zy-navigation-nav").find('button').text();
		if(moduleName!=''){
		    $.ajax({    
		        type:'post',        
		        url:'/navigationListAddsun',  
		        data: {
		        		thisPar: thisPar,
		                moduleName: moduleName,
		                moduleInfo: moduleInfo,
		                moduleLink: moduleLink
		              },    
		        dataType:'json',    
		        success:function(data){   
		          	if(data.retCode == 200) {
		          		$navpopup.modal('close');
		          		location.reload();
		          	}else{
		            	warnOpnFn(data.retDesc);
		          	}
		        },
		        error : function() {   
		          	alertOpnFn('err');  
		       }        
		    }); 
	    }else{
	    	warnOpnFn('内容不能为空哦~');
	    } 
	});

	//experience发布
	var $createExperience=$('#zy-createExperience');
	$createExperience.delegate('.experienceFB', 'click', function(){
		var experienceTitle=$.trim($(".experienceTitle", $createExperience).val()),
			experienceCompany=$.trim($(".experienceCompany", $createExperience).val()),
			experienceCont=$.trim($("#experienceCont", $createExperience).html()),
			experienceLink=$.trim($(".experienceLink", $createExperience).val());
		if(experienceTitle!='' && experienceCompany!='' && experienceCont!='' && experienceLink!=''){
			$.ajax({    
		        type:'post',        
		        url:'/createExperience',   
		        data: {
		        	tags:1,
					experienceTitle: experienceTitle,
					experienceCompany: experienceCompany,
					experienceCont: experienceCont,
					experienceLink: experienceLink
		        },  
		        dataType:'json',      
		        success:function(data){    
		            if(data.retCode==200){
						alertOpnFn('操作成功！');
					}else{
						warnOpnFn(data.retDesc);
					}
		        },
		        error : function(data) {   
		            alertOpnFn('err');     
		        }        
	    	});
		}else{
			warnOpnFn('内容不能为空哦~');
		}
	}); 

	//experience存草稿
	var $createExperience=$('#zy-createExperience');
	$createExperience.delegate('.experienceCG', 'click', function(){
		var experienceTitle=$.trim($(".experienceTitle", $createExperience).val()),
			experienceCompany=$.trim($(".experienceCompany", $createExperience).val()),
			experienceCont=$.trim($("#experienceCont", $createExperience).html()),
			experienceLink=$.trim($(".experienceLink", $createExperience).val());
		if(experienceTitle!='' && experienceCompany!='' && experienceCont!='' && experienceLink!=''){
			$.ajax({    
		        type:'post',        
		        url:'/createExperience',   
		        data: {
		        	tags:2,
					experienceTitle: experienceTitle,
					experienceCompany: experienceCompany,
					experienceCont: experienceCont,
					experienceLink: experienceLink
		        },  
		        dataType:'json',      
		        success:function(data){    
		            if(data.retCode==200){
						alertOpnFn('操作成功！');
					}else{
						warnOpnFn(data.retDesc);
					}
		        },
		        error : function(data) {   
		            alertOpnFn('err');     
		        }        
	    	});
		}else{
			warnOpnFn('内容不能为空哦~');
		}
	}); 

	//article发布
	var $createArticle = $('#zy-createArticle');
	$createArticle.delegate('.articleFB', 'click', function(){
		var articleTitle=$.trim($(".articleTitle", $createArticle).val()),
			articleKeyword=$.trim($(".articleKeyword", $createArticle).val()),
			articleType=$.trim($(".articleType", $createArticle).val()),
			articleCont=$.trim($("#articleCont", $createArticle).html()),
			articleLink=$.trim($(".articleLink", $createArticle).val());
		if(articleTitle!='' && articleKeyword!='' && articleType!='' && articleCont!='' && articleLink!=''){
			$.ajax({    
				type:'post',        
				url:'/createarticle',   
				data: {
					tags:1,
					articleTitle:articleTitle,
					articleKeyword:articleKeyword,
					articleType:articleType,
					articleCont:articleCont,
					articleLink:articleLink
				},  
				dataType:'json',      
				success:function(data){    
					if(data.retCode==200){
						alertOpnFn('操作成功！');
					}else{
						warnOpnFn(data.retDesc);
					}
				},
				error : function(data) {   
				    alertOpnFn('err');      
				}        
			}); 
		}else{
			warnOpnFn('内容不能为空哦~');
		}
	});
	   
	//article存草稿
	var $createArticle = $('#zy-createArticle');
	$createArticle.delegate('.articleCG', 'click', function(){
		var articleTitle=$.trim($(".articleTitle", $createArticle).val()),
			articleKeyword=$.trim($(".articleKeyword", $createArticle).val()),
			articleType=$.trim($(".articleType", $createArticle).val()),
			articleCont=$.trim($(".articleCont", $createArticle).html()),
			articleLink=$.trim($(".articleLink", $createArticle).val());
		if(articleTitle!='' && articleKeyword!='' && articleType!='' && articleCont!='' && articleLink!=''){
			$.ajax({    
				type:'post',        
				url:'/createarticle',   
				data: {
					tags:2,
					articleTitle:articleTitle,
					articleKeyword:articleKeyword,
					articleType:articleType,
					articleCont:articleCont,
					articleLink:articleLink
				},  
				dataType:'json',      
				success:function(data){    
					if(data.retCode==200){
						alertOpnFn('操作成功！');
					}else{
						warnOpnFn(data.retDesc);
					}
				},
				error : function(data) {   
				    alertOpnFn('err');      
				}        
			}); 
		}else{
			warnOpnFn('内容不能为空哦~');
		}
	});  


	/***
		简历页面的js代码
	**/
	//个人基本信息
	var $myBaseinfo=$('#my-baseinfo');
	$myBaseinfo.delegate('#inputFile', 'change', function(){
		 $('.imgtip', $myBaseinfo).html($('#inputFile', $myBaseinfo).val());
	})

	$myBaseinfo.delegate('#upload', 'click', function(){
        $('#specialInstruc', $myBaseinfo).ajaxForm({
            url: $('#specialInstruc', $myBaseinfo).attr('action'),
            type: 'POST',
            success: function (res, status, xhr, $form) {
            	if(res.retCode!=200){
            		warnOpnFn(res.retDesc);
            	}else{
            		location.reload();
            	}
                $('#specialInstruc', $myBaseinfo).clearForm();
            },
            error: function (res, status, e) {
            	alertOpnFn('err'); 
                $('#specialInstruc', $myBaseinfo).clearForm();
            }
        });
    })

	//联系方式
	$myContactinfo=$('#my-contactinfo');
	$myContactinfo.delegate('.my-contactinfo-btn', 'click', function(){
		var mphone=$.trim($(".mphone", $myContactinfo).val()),
			phone=$.trim($(".phone", $myContactinfo).val()),
			address=$.trim($(".address", $myContactinfo).val()),
			identity=$.trim($(".identity", $myContactinfo).val()),
			email=$.trim($(".email", $myContactinfo).val()),
			qqnum=$.trim($(".qqnum", $myContactinfo).val());
        $.ajax({    
			type:'post',        
			url:'/resume/contactinfo',   
			data: {
				mphone:mphone,
				phone:phone,
				address:address,
				identity:identity,
				email:email,
				qqnum:qqnum
			},  
			dataType:'json',      
			success:function(data){    
				if(data.retCode==200){
					location.reload();
				}else{
					warnOpnFn(data.retDesc);
				}
			},
			error : function(err) {   
			  	alertOpnFn('err');   
			}        
      	}); 
    });

	//教育经历-添加
	var $myEducation=$('#my-education');
	$myEducation.delegate('.my-education1-btn', 'click', function(){
		var school=$.trim($(".school1", $myEducation).val()),
			educationtype=$.trim($(".educationtype1", $myEducation).val()),
			sdatetime=$.trim($(".sdatetime1", $myEducation).val()),
			edatetime=$.trim($(".edatetime1", $myEducation).val()),
			major=$.trim($(".major1", $myEducation).val()),
			majorinstr=$.trim($(".majorinstr1", $myEducation).val());
        $.ajax({    
          	type:'post',        
          	url:'/resume/education/add',   
          	data: {
	            school:school,
	            educationtype:educationtype,
	            sdatetime:sdatetime,
	            edatetime:edatetime,
	            major:major,
	            majorinstr:majorinstr
          	},  
          	dataType:'json',      
          	success:function(data){    
	            if(data.retCode==200){
					location.reload();
				}else{
					warnOpnFn(data.retDesc);
				}
          	},
          	error : function(err) {   
              	alertOpnFn('err');     
          	}        
      	}); 
    });   
  	//教育经历-更新
  	$myEducation.delegate('.my-education2-btn', 'click', function(){
  		var educationtypeA=$.trim($(".educationtype21", $myEducation).val()),
  			school=$.trim($(".school2", $myEducation).val()),
  			sdatetime=$.trim($(".sdatetime2",$myEducation).val()),
  			edatetime=$.trim($(".edatetime2", $myEducation).val()),
  			major=$.trim($(".major2", $myEducation).val()),
  			majorinstr=$.trim($(".majorinstr2", $myEducation).val());
        $.ajax({    
          	type:'post',        
          	url:'/resume/education/change',   
          	data: {
	            educationtypeA: educationtypeA,
	            school: school,
	            sdatetime: sdatetime,
	            edatetime: edatetime,
	            major: major,
	            majorinstr: majorinstr
          	},  
          	dataType:'json',      
          	success:function(data){    
              	if(data.retCode==200){
					location.reload();
				}else{
					warnOpnFn(data.retDesc);
				}
          	},
          	error : function(err) {   
              	alertOpnFn('err');    
          	}        
      	}); 
  	});   
    //教育经历-删除
  	$myEducation.delegate('.my-education3-btn', 'click', function(){
  		var educationtype=$.trim($(".educationtype", $myEducation).val());
        $.ajax({    
          	type:'post',        
          	url:'/resume/education/dele',   
          	data: {
            	educationtype:educationtype
          	},  
          	dataType:'json',      
          	success:function(data){    
              	if(data.retCode==200){
					location.reload();
				}else{
					warnOpnFn(data.retDesc);
				}
          	},
          	error : function(err) {   
              	alertOpnFn('err');    
          	}        
      	}); 
    });   
    //教育经历-操作类型事件
  	$myEducation.delegate('.educationtype21', 'change', function(){
  		var educationtype=$.trim($(".educationtype21", $myEducation).val());
	    $.ajax({    
	        type:'post',        
	        url:'/resume/education/changeType',   
	        data: {
	            educationtype:educationtype
	        },  
	        dataType:'json',      
	        success:function(data){    
	            $('.educationPart', $myEducation).show();
	            $(".school2", $myEducation).val(data.school);
	            $(".sdatetime2",$myEducation).val(data.sdatetime);
	            $(".edatetime2", $myEducation).val(data.edatetime);
	            $(".major2", $myEducation).val(data.major);
	            $(".majorinstr2", $myEducation).val(data.majorinstr);
	        },
	        error : function(err) {   
	            alertOpnFn('err');   
	        }        
	    }); 
    });
  	$('.educationtype',$myEducation).change(function(){
		if($(this).children('option:selected').val()==1){
			$('.delModule', $myEducation).hide();
			$('.changeModule', $myEducation).hide();
			$('.addModule', $myEducation).show();
		}else if($(this).children('option:selected').val()==2){
			$('.delModule', $myEducation).hide();
			$('.changeModule', $myEducation).show();
			$('.addModule', $myEducation).hide();
		}else if($(this).children('option:selected').val()==3){
			$('.delModule', $myEducation).show();
			$('.changeModule', $myEducation).hide();
			$('.addModule', $myEducation).hide();
		}else{
			$('.delModule', $myEducation).hide();
			$('.changeModule', $myEducation).hide();
			$('.addModule', $myEducation).hide();
		}
  	});




});