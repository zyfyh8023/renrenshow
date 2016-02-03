var resume = require('../models/resume');
var url = require('url');

/* GET demo page. */
exports.awards = function(req, res) {
	res.render('./userResume/userSCI/awardInfo', {
		title: '荣誉奖励',
		uName: ''
	});
};

exports.companys = function(req, res) {
	res.render('./userResume/userSCI/companyInfo', {
		title: '工作经历',
		uName: ''
	});
};

exports.schools = function(req, res) {
	var urls=url.parse(req.url, true).query;

	resume.findByUname(urls.uname, function(err, rs) {
		if (err) {
			res.redirect('/error');
		} else {
			if (rs) {
				console.log(rs.schools3[urls.ids]);
				allres=rs;
				res.render('./userResume/userSCI/schoolInfo', {
					title: '教育经历',
					uName: urls.uname,
					rs: rs.schools3[urls.ids]
				});
			} else {
				res.redirect('/error');
			}
		}
	});

};

exports.works = function(req, res) {
	res.render('./userResume/userSCI/worksInfo', {
		title: '作品展示',
		uName: ''
	});
};
