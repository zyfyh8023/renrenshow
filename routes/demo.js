

/* GET demo page. */
exports.page = function(req, res) {

	res.render('demo1', {   // 瀑布流
		title: 'demo1',
		uName: ''
	});

};
