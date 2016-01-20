/* GET demo page. */
exports.page = function(req, res) {
	res.render('demo', {
		title: 'demo'
	});
};
