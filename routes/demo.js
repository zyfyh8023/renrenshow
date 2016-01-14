/* GET demo page. */
exports.page = function(req, res) {
	res.render('demo', {
		title: 'demo'
	});
	//res.redirect('/myError?retDesc=abcdefg不存在');
	// res.render('demo2', {
	// 	title: 'demo2'
	// });

};
