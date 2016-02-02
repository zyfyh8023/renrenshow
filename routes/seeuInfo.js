/* GET demo page. */
exports.awards = function(req, res) {

	res.render('./userResume/userSCI/awardInfo', {
		title: 'awards',
		uName: ''
	});

};
