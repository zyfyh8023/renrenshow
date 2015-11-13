
/*
 * GET home page.
 */

var gm = require('gm')
,	fs = require('fs')
,	imageMagick = gm.subClass({ imageMagick : true });

function getDate(date) {
	var Y = date.getFullYear();
	var M = date.getMonth()+1;
	if (M < 10) M = '0' + M;
	var D = date.getDate();
	if (D < 10) D = '0' + D;
	var h = date.getHours();
	if (h < 10) h = '0' + h;
	var m = date.getMinutes();
	if (m < 10) m = '0' + m;
	var s = date.getSeconds();
	if (s < 10) s = '0' + s;
	return (Y+'-'+M+'-'+D+' '+h+':'+m+':'+s);
}

exports.index = function(req, res){
	//获取user文件夹里的所有文件名
	fs.readdir('public/images/user', function(err, files){
		res.render('index', { title: 'GMTest by KIDx.'
							, time: (new Date()).getTime()
							, files: files
		});
	});
};



exports.jcrop = function(req, res){
	//获取user文件夹里的所有文件名
	fs.readdir('public/images/user', function(err, files){
		res.render('jcrop', { title: 'GMTest by KIDx.'
							, time: (new Date()).getTime()
							// , files: files
		});
	});
};


exports.doJcrop = function(req, res){
	res.header('Content-Type', 'text/plain');
	var path = req.files.img.path;	//获取用户上传过来的文件的当前路径
	console.log(path);
	var sz = req.files.img.size;
	var x=req.body.x;
	var y=req.body.y;
	var W=req.body.w;
	var H=req.body.hg;
	if (sz > 2*1024*1024) {
		fs.unlink(path, function() {	//fs.unlink 删除用户上传的文件
			res.end('1');
		}); 
	} else if (req.files.img.type.split('/')[0] != 'image') {
		fs.unlink(path, function() {
			res.end('2');
		});
	} else {
				console.log("W---"+W);
		console.log("H---"+H);
		console.log("x---"+x);
		console.log("y---"+y);

		imageMagick(path)
		.crop(W,H,x,y,Math.random()+".png")
		//.resize(150, 150, '!') //加('!')强行把图片缩放成对应尺寸150*150！
		.autoOrient()
		.write('public/images/user/'+req.files.img.name, function(err){
			if (err) {
				console.log(err);
				res.end();
			}
			fs.unlink(path, function() {
				return res.end('3');
			});
		});
	}

};

exports.imgUpload = function(req, res) {
	res.header('Content-Type', 'text/plain');
	console.log(req.files.img.path+"---sss");
	var path = req.files.img.path;	//获取用户上传过来的文件的当前路径
	var sz = req.files.img.size;
	if (sz > 2*1024*1024) {
		fs.unlink(path, function() {	//fs.unlink 删除用户上传的文件
			res.end('1');
		});
	} else if (req.files.img.type.split('/')[0] != 'image') {
		fs.unlink(path, function() {
			res.end('2');
		});
	} else {
		imageMagick(path)
		.crop(100,100,0,0,"aaa.jpg")
		//.resize(150, 150, '!') //加('!')强行把图片缩放成对应尺寸150*150！
		.autoOrient()
		.write('public/images/user/'+req.files.img.name, function(err){
			if (err) {
				console.log(err);
				res.end();
			}
			fs.unlink(path, function() {
				return res.end('3');
			});
		});
	}
};