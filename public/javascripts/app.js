var jx1=0, jy1=0, jw=0, jh=0;  //不确定有没有使用到

$(document).ready(function() {

	//菜单导航条
	$('.zy-am-topbar-nav li a').each(function() {
		var str=window.location.pathname;
		if(str.indexOf($(this).data('src'))!=-1){
			$('.zy-am-topbar-nav li').removeClass('am-active');
			$(this).parent().addClass('am-active');
		}else if(str=='/'){
			$('.zy-am-topbar-nav li').removeClass('am-active');
			$($('.zy-am-topbar-nav li')[0]).addClass('am-active');
		}else{
			$(this).parent().removeClass('am-active');
		}
	});

	/**
	 * 退出登录
	 */
	$('#zy-loginOut').click(function() {
		$.ajax({
			type: 'post',
			url: '/loginOut',
			dataType: 'json',
			success: function(data) {
				location.href = "/login";
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});

	//博客的评论模块
	var $comm=$('#zy-blog-com');
	$comm.delegate('.zy-button1', 'click', function(event) {
		$.ajax({
			type: 'post',
			url: '/comment',
			data: {
				comCon: $('.comment', $comm).val(),
				comArt: $('.comFrom', $comm).data('artid'),
				artAuthor: $('.comFrom', $comm).data('authorid'),
				typ: '1'
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

	//面经的评论模块
	var $comm2=$('#zy-exp-com');
	$comm2.delegate('.zy-button1', 'click', function(event) {
		$.ajax({
			type: 'post',
			url: '/comment',
			data: {
				comCon: $('.comment', $comm2).val(),
				comArt: $('.comFrom', $comm2).data('expid'),
				artAuthor: $('.comFrom', $comm2).data('authorid'),
				typ: '2'
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
	
	//resume的评论部分1
	var $comm3=$('#zy-comment-awd');
	$comm3.delegate('.zy-button1', 'click', function(event) {
		$.ajax({
			type: 'post',
			url: '/comment',
			data: {
				comCon: $('.comment', $comm3).val(),
				comArt: $('.comFrom', $comm3).data('resid'),
				artAuthor: $('.comFrom', $comm3).data('authorid'),
				typ: '3'
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

	//resume的评论部分2
	var $comm4=$('#zy-comment-cmp');
	$comm4.delegate('.zy-button1', 'click', function(event) {
		$.ajax({
			type: 'post',
			url: '/comment',
			data: {
				comCon: $('.comment', $comm4).val(),
				comArt: $('.comFrom', $comm4).data('resid'),
				artAuthor: $('.comFrom', $comm4).data('authorid'),
				typ: '4'
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

	//resume的评论部分3
	var $comm5=$('#zy-comment-scl');
	$comm5.delegate('.zy-button1', 'click', function(event) {
		$.ajax({
			type: 'post',
			url: '/comment',
			data: {
				comCon: $('.comment', $comm5).val(),
				comArt: $('.comFrom', $comm5).data('resid'),
				artAuthor: $('.comFrom', $comm5).data('authorid'),
				typ: '5'
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

	//resume的评论部分4
	var $comm6=$('#zy-comment-wrk');
	$comm6.delegate('.zy-button1', 'click', function(event) {
		$.ajax({
			type: 'post',
			url: '/comment',
			data: {
				comCon: $('.comment', $comm6).val(),
				comArt: $('.comFrom', $comm6).data('resid'),
				artAuthor: $('.comFrom', $comm6).data('authorid'),
				typ: '6'
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
	

	//warning提示框的关闭事件
	$("#zy-warning .am-close").click(function() {
		if(warnTipTim){
			clearTimeout(warnTipTim);
		}
		$("#zy-warning").addClass('zy-display-none');
	});


});

var warnTipTim;

//warn的opn和cls
function warnOpnFn(message) {
	if (message) {
		if(warnTipTim){
			clearTimeout(warnTipTim);
		}
		$("#zy-warning p").html(message);
		$("#zy-warning").removeClass('zy-display-none');
		warnTipTim = setTimeout(function(){
			$("#zy-warning").addClass('zy-display-none');
		},3000); 
	}
}

function warnClsFn() {
	if(warnTipTim){
		clearTimeout(warnTipTim);
	}
	$("#zy-warning").addClass('zy-display-none');
}

//alert的opn和cls
function alertOpnFn(message) {
	if (message && message == 'err') {
		$('#my-alert .am-modal-bd').html('系统错误，请稍后再试！');
		$("#my-alert").modal("open");
	} else if (message) {
		$('#my-alert .am-modal-bd').html(message);
		$("#my-alert").modal("open");
	}
}

function alertClsFn() {
	$("#my-alert").modal("close");
}

//cutStr
function cutStr(str, strLen, addStr){
	var allLen=0,
	    len=str.length;
	for(var i=0; i<len; i++){
	    allLen+=str.charCodeAt(i) > 128 ? 2 : 1; 
	}
	if(allLen<=strLen){
	    return str;
	}
	var cutStr='', strNum=0;
	for(var j=0; j<len; j++){
	    strNum+=str.charCodeAt(j) > 128 ? 2 : 1; 
	    cutStr+=str[j];
	    if(strNum>=strLen){
	        break;
	    }
	}
	if(addStr){
	    cutStr+=addStr;
	}
	return cutStr;
}

//dateformat
function dateformat(timestr){
	var newTim=new Date(timestr);
	var newTim2=newTim.getFullYear()+'-'+
				(parseInt(newTim.getMonth())+1)+'-'+
				newTim.getDate()+' '+
				newTim.getHours()+':'+
				newTim.getMinutes()+':'+
				newTim.getSeconds();
	return newTim2;
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
		pagetipHtml+='<li class="J_pre-page"><a href="javascript:void(0);">&laquo;</a></li>';
		pagetipHtml+= pagebtnShow(clickNum);
		pagetipHtml+='<li class="J_next-page"><a href="javascript:void(0);">&raquo;</a></li>';
	}else{
		pagetipHtml+='<li class="J_pre-page"><a href="javascript:void(0);">&laquo;</a></li>';
		for(var i=1; i<=__data.allpage; i++){
			pagetipHtml+=comCon(i, clickNum);
		}
		pagetipHtml+='<li class="J_next-page"><a href="javascript:void(0);">&raquo;</a></li>';
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
		htmlS='<li class="am-active"><a href="javascript:void(0);">'+i+'</a></li>';
	}else{
		htmlS='<li><a href="javascript:void(0);">'+i+'</a></li>';
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