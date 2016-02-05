

/* GET demo page. */
exports.page = function(req, res) {

	res.render('demo1', {   // 瀑布流
		title: 'demo1',
		uName: ''
	});
	
	// res.render('demo2', {   //简单布局
	// 	title: 'demo2',
	// 	uName: ''
	// });

	// res.render('demo3', {    //文章预览的全屏模式
	// 	title: 'demo3',
	// 	uName: ''
	// });

};
