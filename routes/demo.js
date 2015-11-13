
/* GET demo page. */
exports.page=function(req,res){  
    res.render('demo',{title:'demo'});  
} ; 


/* post demo/description page. */
exports.descriptionPage=function(req,res){  

	console.log(req.body.descriptioncon);
    
    return res.redirect('/demo');   
} ; 


/* post demo/undergo page. */
exports.undergoPage=function(req,res){  

	console.log(req.body.undergoname);
	console.log(req.body.undergotype);
	console.log(req.body.undergotime);
	console.log(req.body.undergoinstr);
	      
    return res.redirect('/demo');   
} ; 


/* post demo/paper page. */
exports.paperPage=function(req,res){  

	console.log(req.body.papername);
	console.log(req.body.papertype);
	console.log(req.body.papertime);
	console.log(req.body.paperinstr);
	      
    return res.redirect('/demo');   
} ; 


/* post demo/certificate page. */
exports.certificatePage=function(req,res){  

	console.log(req.body.certificatename);
	console.log(req.body.gettime);   
	console.log(req.body.cgrade);
	console.log(req.body.certificateinstr);
	console.log(req.body.cimages);
	      
    return res.redirect('/demo');   
} ; 



/* post demo/works page. */
exports.worksPage=function(req,res){  

	console.log(req.body.workname);
	console.log(req.body.worktime);   
	console.log(req.body.workduty);
	console.log(req.body.showink);
	console.log(req.body.codelink);  
	console.log(req.body.workdes);
	console.log(req.body.workimg);
	      
    return res.redirect('/demo');   
} ; 



/* post demo/education page. */
exports.educationPage=function(req,res){  

	console.log(req.body.school);
	console.log(req.body.educationtype);   
	console.log(req.body.sdatetime);
	console.log(req.body.edatetime);
	console.log(req.body.major);  
	console.log(req.body.majorinstr);
	      
    return res.redirect('/demo');   
} ; 


/* post demo/practice page. */
exports.practicePage=function(req,res){  

	console.log(req.body.practice);
	console.log(req.body.practicetype);   
	console.log(req.body.spracticetime);
	console.log(req.body.epracticetime);
	console.log(req.body.practiceposition);  
	console.log(req.body.practiceinstr);
	      
    return res.redirect('/demo');   
} ; 



/* post demo/contactinfo page. */
exports.contactinfoPage=function(req,res){  

	console.log(req.body.address);
	console.log(req.body.identity);   
	console.log(req.body.mphone);
	console.log(req.body.phone);
	console.log(req.body.email);  
	console.log(req.body.qqnum);   
	console.log(req.body.weixin); 
	      
    return res.redirect('/demo');   
} ; 



/* post demo/baseinfo page. */
exports.baseinfoPage=function(req,res){  

	console.log(req.body.uname);
	console.log(req.body.age);   
	console.log(req.body.sex);
	console.log(req.body.istatus);
	console.log(req.body.ieducation);  
	console.log(req.body.ischool);   
	console.log(req.body.imajor); 
	      
    return res.redirect('/demo');   
} ; 