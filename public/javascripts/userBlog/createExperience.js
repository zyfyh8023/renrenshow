$(document).ready(function() {

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
	
})