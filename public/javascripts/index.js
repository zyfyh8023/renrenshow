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

	//warning提示框的关闭事件
	$("#zy-warning .am-close").click(function() {
		$("#zy-warning").addClass('zy-display-none');
	});


	//评论模块
	var $comm=$('#zy-blog-com');
	$comm.delegate('.zy-button1', 'click', function(event) {
		$.ajax({
			type: 'post',
			url: '/comment',
			data: {
				comCon: $('.comment', $comm).val(),
				comArt: $('.comFrom', $comm).data('artid'),
				artAuthor: $('.comFrom', $comm).data('authorid')
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

});

//warn的opn和cls
function warnOpnFn(message) {
	if (message) {
		$("#zy-warning p").html(message);
		$("#zy-warning").removeClass('zy-display-none');
	}
}

function warnClsFn() {
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