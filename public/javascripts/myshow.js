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
		//console.log('1111111111111111111');
		//return;
	    // $.ajax({    
	    //     type:'post',        
	    //     url:'/navigationListDel',  	
	    //     data: {
	    //             navName:$(".addmodelNameD", $removenavmodel).val()
	    //           },    
	    //     dataType:'json',    
	    //     success:function(data){  
	    //       	if(data.retCode == 200){
	    //         	$(".zy-navTitle-list li").each(function(){
	    //           		if($(this).find("span").text()==data.modelName){
		   //              		$(this).remove();
	    //           		}
	    //         	});
		   //          $(".zy-navigation-list .zy-navigation-nav").each(function(){
		   //            	if($(this).find("button").text()==data.modelName){
		   //              	$($(this).next()).remove();
		   //              	$(this).remove();
		   //            	}
		   //          });
		   //          $(".addmodelNameD option", $removenavmodel).each(function(){
		   //            	if($(this).text()==data.modelName){
		   //              	$(this).remove();
		   //            	}
		   //          });
		   //          $("#my-removenavmodel").modal('close');
	    //       	}else{
	    //       		warnOpnFn('navigation的左侧列表的动态删除失败！');
	    //       	}
	    //     },
	    //     error : function() {  
	    //     	alertOpnFn('navigation的左侧列表的动态删除失败！');
	    //     }        
	    // });  
	});

	//navigation的左侧列表的动态插入
	var $addnavmodel=$('#my-addnavmodel');
	$addnavmodel.delegate('button', 'click', function(event) {
		// console.log('22222222222222');
	 //    $.ajax({    
	 //        type:'post',        
	 //        url:'/navigationListAdd',  
	 //        data: {
	 //                navName:$(".addmodelNameA", $addnavmodel).val()
	 //              },    
	 //        dataType:'json',    
	 //        success:function(data){   
	 //          	if(data.retCode == 200) {
		//             $("<li><a href='#''><span>"+$(".addmodelNameA").val()+"</span>（0）</a></li>").appendTo($(".zy-navTitle-list"));
		//             $("<div class='col-sm-12 am-u-sm-12 zy-navigation-nav'><button class='am-btn am-btn-primary am-btn-xl'>"+$(".addmodelNameA").val()+"</button></div><div class='col-md-4 am-u-md-4 col-sm-6 am-u-sm-6 zy-navigation-item zy-navigation-add-ele am-u-end addBtn'><div><button type='button' data-am-modal='{target: '#my-popup'}'><img src='/images/add.jpg'></button></div></div>").appendTo(".zy-navigation-list");
		//             $("<option value="+$(".addmodelNameA").val()+">"+$(".addmodelNameA").val()+"</option>").appendTo($("#addmodelNameD"));
		//             $("#my-addnavmodel").modal('close');
	 //          	}else{
	 //            	warnOpnFn('navigation的左侧列表的动态插入失败！');
	 //          	}
	 //        },
	 //        error : function() {   
	 //          	alertOpnFn('navigation的左侧列表的动态插入失败！');  
	 //       }        
	 //    });  
	});





	//experience发布
	$(".experienceFB").click(function(){
	      $.ajax({    
	        type:'post',        
	        url:'/createExperience',   
	        data: {tags:1,
	          experienceTitle:$("#experienceTitle").val(),
	          experienceCompany:$("#experienceCompany").val(),
	          experienceCont:$("#experienceCont").val(),
	          experienceLink:$("#experienceLink").val()
	        },  
	        dataType:'json',      
	        success:function(data){    
	            console.log(data+"experience发布操作成功！");
	        },
	        error : function(data) {   
	            console.log(data+"experience发布操作失败！");    
	        }        
	    }); 
	});   

	//experience存草稿
	$(".experienceCG").click(function(){
	      $.ajax({    
	        type:'post',        
	        url:'/createExperience',   
	        data: {tags:2,
	          experienceTitle:$("#experienceTitle").val(),
	          experienceCompany:$("#experienceCompany").val(),
	          experienceCont:$("#experienceCont").val(),
	          experienceLink:$("#experienceLink").val()
	        },  
	        dataType:'json',      
	        success:function(data){    
	            console.log(data+"experience存草稿操作成功！");
	        },
	        error : function(data) {   
	            console.log(data+"experience存草稿操作失败！");    
	        }        
	    }); 
	});  

	//article发布
	$(".articleFB").click(function(){
	      $.ajax({    
	        type:'post',        
	        url:'/createarticle',   
	        data: {tags:1,
	          articleTitle:$("#articleTitle").val(),
	          articleKeyword:$("#articleKeyword").val(),
	          articleType:$("#articleType").val(),
	          articleCont:$("#articleCont").val(),
	          articleLink:$("#articleLink").val()
	        },  
	        dataType:'json',      
	        success:function(data){    
	            console.log(data+"article发布操作成功！");
	        },
	        error : function(data) {   
	            console.log(data+"article发布操作失败！");    
	        }        
	    }); 
	});   

	//article存草稿
	$(".articleCG").click(function(){
	      $.ajax({    
	        type:'post',        
	        url:'/createarticle',   
	        data: {tags:2,
	          articleTitle:$("#articleTitle").val(),
	          articleKeyword:$("#articleKeyword").val(),
	          articleType:$("#articleType").val(),
	          articleCont:$("#articleCont").val(),
	          articleLink:$("#articleLink").val()
	        },  
	        dataType:'json',      
	        success:function(data){    
	            console.log(data+"article存草稿操作成功！");
	        },
	        error : function(data) {   
	            console.log(data+"article存草稿操作失败！");    
	        }        
	    }); 
	});  

	
    


});
