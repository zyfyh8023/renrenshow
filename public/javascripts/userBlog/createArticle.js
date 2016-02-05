$(document).ready(function() {

	//article发布
	var $createArticle = $('#zy-createArticle');
	$createArticle.delegate('.articleFB', 'click', function() {
		var articleTitle = $.trim($(".articleTitle", $createArticle).val()),
			articleKeyword = $.trim($(".articleKeyword", $createArticle).val()),
			articleType = $.trim($(".articleType", $createArticle).val()),
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
	var $createArticle = $('#zy-createArticle');
	$createArticle.delegate('.articleCG', 'click', function() {
		var articleTitle = $.trim($(".articleTitle", $createArticle).val()),
			articleKeyword = $.trim($(".articleKeyword", $createArticle).val()),
			articleType = $.trim($(".articleType", $createArticle).val()),
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
					tags: 2,
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