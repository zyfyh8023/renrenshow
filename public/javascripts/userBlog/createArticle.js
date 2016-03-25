$(document).ready(function() {

	//缓存
	var $createArticle = $('#zy-createArticle'),
		$artTicle= $(".articleTitle", $createArticle),
		$artKeys=$(".articleKeyword", $createArticle),
		$artTyp=$(".articleType", $createArticle);

	//article发布
	$createArticle.delegate('.articleFB', 'click', function() {
		var articleTitle = $.trim($artTicle.val()),
			articleKeyword = $.trim($artKeys.val()),
			articleType = $.trim($artTyp.val()),
			articleAbstract = articleCon.getContentTxt(),
			articleCont = articleCon.getContent();
			articleAbstract=cutStr(articleAbstract,350,'...');

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
					articleAbstract: articleAbstract,
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
	$createArticle.delegate('.articleCG', 'click', function() {
		var articleTitle = $.trim($artTicle.val()),
			articleKeyword = $.trim($artKeys.val()),
			articleType = $.trim($artTyp.val()),
			articleAbstract = articleCon.getContentTxt(),
			articleCont = articleCon.getContent();
			articleAbstract=cutStr(articleAbstract,350,'...');

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
					tags: 0,
					articleTitle: articleTitle,
					articleKeyword: articleKeyword,
					articleType: articleType,
					articleAbstract: articleAbstract,
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
	
})