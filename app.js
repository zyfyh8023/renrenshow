var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ueditor = require("ueditor");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var moment = require('moment');

var config = require('./config');
var MongodbAPI = require('./models/dbserver');
var checkState = require('./routes/checkState');

var routes = require('./routes/mWebsite/index');
var faq = require('./routes/mWebsite/faq');
var resource = require('./routes/mWebsite/resource');
var talentpool = require('./routes/mWebsite/talentpool');
var about = require('./routes/mWebsite/about');
var login = require('./routes/mWebsite/login');
var register = require('./routes/mWebsite/register');
var allarticle = require('./routes/mWebsite/allarticle');
var allinfo = require('./routes/mWebsite/allinfo');

var myindex = require('./routes/uWebsite/myindex');
var introduction = require('./routes/uWebsite/introduction');
var resume = require('./routes/uWebsite/resume');
var navigation = require('./routes/uWebsite/navigation');
var managearticle = require('./routes/uWebsite/managearticle');
var manageExperience = require('./routes/uWebsite/manageExperience');
var createarticle = require('./routes/uWebsite/createarticle');
var createExperience = require('./routes/uWebsite/createExperience');
var seting = require('./routes/uWebsite/seting');
var privateSeting = require('./routes/uWebsite/privateSeting');
var changePassword = require('./routes/uWebsite/changePassword');
var blogAorE = require('./routes/uWebsite/blogAorE');
var comment = require('./routes/uWebsite/comment');
var seeuInfo = require('./routes/uWebsite/seeuInfo');

var allblogs = require('./routes/uWebsite/allblogs');
var alluArts = require('./routes/uWebsite/alluArts');
var alluExps = require('./routes/uWebsite/alluExps');
var demo = require('./routes/demo');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
    limit:'1000000kb'
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: null
    },
    secret: config.dbSession.cookieSecret,
    store: new MongoStore({
        db: config.dbSession.db,
    })
}));


app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url = '/upload/blogs/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/upload/blogs/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

var router = express.Router();
app.use(router);

//公共页——首页-问答中心-资源中心-人才中心
app.get('/', routes.page);
app.get('/index', routes.page);
app.get('/faq', faq.page);
app.get('/inf', resource.page);
app.get('/res', talentpool.page);
app.get('/inf_allarticle', allarticle.page);
app.get('/inf_allinfo', allinfo.page);
app.get('/login', login.page);
app.post('/login', login.doLogin);
app.post('/comment', comment.doPage);
//没登录的情况下提交退出
app.post('/loginOut', checkState.checkLogin);
app.post('/loginOut', login.loginOut);
//注册页面不需要限制
app.get('/register', register.page);
app.post('/register', register.doRegister);
app.get('/about', about.page);
app.post('/about', about.doPage);
//两种情况的访问
app.get('/resume_awd', seeuInfo.awards);
app.get('/resume_cmp1', seeuInfo.companys1);
app.get('/resume_cmp2', seeuInfo.companys2);
app.get('/resume_scl', seeuInfo.schools);
app.get('/resume_wok', seeuInfo.works);

//个人中心——首页
app.get('/myindex', myindex.page);
app.get('/blogs_art', blogAorE.artSee);
app.get('/blogs_exp', blogAorE.expSee);
//个人中心——个性介绍-v1.0
app.get('/instrc', introduction.page);
app.post('/introduction', checkState.checkLogin);
app.post('/introduction', introduction.doPage);
//个人中心——网页简历 -v1.0
app.get('/resume', resume.page);
app.post('/resume/allinfo', checkState.checkLogin);
app.post('/resume/allinfo', resume.allinfo);
app.post('/resume/desc/add', checkState.checkLogin);
app.post('/resume/desc/add', resume.desc1); //核心技能-add
app.post('/resume/desc/upd', checkState.checkLogin);
app.post('/resume/desc/upd', resume.desc3); //核心技能-update
app.post('/resume/desc/del', checkState.checkLogin);
app.post('/resume/desc/del', resume.desc2); //核心技能-del
app.post('/resume/paper/add', checkState.checkLogin);
app.post('/resume/paper/add', resume.paper1); //论文专利-add
app.post('/resume/paper/del', checkState.checkLogin);
app.post('/resume/paper/del', resume.paper2); //论文专利-del
app.post('/resume/paper/upd', checkState.checkLogin);
app.post('/resume/paper/upd', resume.paper3); //论文专利-update
app.post('/resume/undergo/add', checkState.checkLogin);
app.post('/resume/undergo/add', resume.undergo1); //add
app.post('/resume/undergo/del', checkState.checkLogin);
app.post('/resume/undergo/del', resume.undergo2); //del
app.post('/resume/undergo/upd', checkState.checkLogin);
app.post('/resume/undergo/upd', resume.undergo3); //update
app.post('/resume/works/add', checkState.checkLogin);
app.post('/resume/works/add', resume.works1); //add
app.post('/resume/works/del', checkState.checkLogin);
app.post('/resume/works/del', resume.works2); //del
app.post('/resume/works/upd', checkState.checkLogin);
app.post('/resume/works/upd', resume.works3); //update
app.post('/resume/projects/add', checkState.checkLogin);
app.post('/resume/projects/add', resume.projects1); //add
app.post('/resume/projects/del', checkState.checkLogin);
app.post('/resume/projects/del', resume.projects2); //del
app.post('/resume/projects/upd', checkState.checkLogin);
app.post('/resume/projects/upd', resume.projects3); //update
app.post('/resume/certificate/add', checkState.checkLogin);
app.post('/resume/certificate/add', resume.certificate1); //add
app.post('/resume/certificate/del', checkState.checkLogin);
app.post('/resume/certificate/del', resume.certificate2); //del
app.post('/resume/certificate/upd', checkState.checkLogin);
app.post('/resume/certificate/upd', resume.certificate3); //update
app.post('/resume/baseinfo', checkState.checkLogin);
app.post('/resume/baseinfo', resume.baseinfo); //基本信息
app.post('/resume/contactinfo', checkState.checkLogin);
app.post('/resume/contactinfo', resume.contactinfo); //联系方式
app.post('/resume/education/add', checkState.checkLogin);
app.post('/resume/education/add', resume.education1); //教育经历-add
app.post('/resume/education/del', checkState.checkLogin);
app.post('/resume/education/del', resume.education2); //教育经历-del
app.post('/resume/education/upd', checkState.checkLogin);
app.post('/resume/education/upd', resume.education3); //教育经历-update
app.post('/resume/practice/add', checkState.checkLogin);
app.post('/resume/practice/add', resume.practice1); //工作经历-add
app.post('/resume/practice/del', checkState.checkLogin);
app.post('/resume/practice/del', resume.practice2); //工作经历-del
app.post('/resume/practice/upd', checkState.checkLogin);
app.post('/resume/practice/upd', resume.practice3); //工作经历-update
app.post('/resume/repractice/add', checkState.checkLogin);
app.post('/resume/repractice/add', resume.repractice1); //re工作经历-add
app.post('/resume/repractice/del', checkState.checkLogin);
app.post('/resume/repractice/del', resume.repractice2); //re工作经历-del
app.post('/resume/repractice/upd', checkState.checkLogin);
app.post('/resume/repractice/upd', resume.repractice3); //re工作经历-update
//博文管理 -v1.0
app.get('/blogs_art_cre', checkState.checkLogin);
app.get('/blogs_art_cre', createarticle.page);
app.post('/createarticle', checkState.checkLogin);
app.post('/createarticle', createarticle.doPage);
app.get('/blogs_art_pub', checkState.checkLogin);
app.get('/blogs_art_pub', managearticle.page);
app.get('/blogs_art_pri', checkState.checkLogin);
app.get('/blogs_art_pri', managearticle.noPublicBW);
app.get('/blogs_art_rea', checkState.checkLogin);
app.get('/blogs_art_rea', managearticle.relatedMeBW);
app.post('/artPageSearch', checkState.checkLogin);
app.post('/artPageSearch', managearticle.pageSearch);
app.post('/delArticle', checkState.checkLogin);
app.post('/delArticle', managearticle.delArticle);
app.post('/pubArticle', checkState.checkLogin);
app.post('/pubArticle', managearticle.pubArticle);
//面试经验 -v1.0
app.get('/blogs_exp_cre', checkState.checkLogin);
app.get('/blogs_exp_cre', createExperience.page);
app.post('/createExperience', checkState.checkLogin);
app.post('/createExperience', createExperience.doPage);
app.get('/blogs_exp_pub', checkState.checkLogin);
app.get('/blogs_exp_pub', manageExperience.page);
app.get('/blogs_exp_pri', checkState.checkLogin);
app.get('/blogs_exp_pri', manageExperience.noPublicMJ);
app.get('/blogs_exp_rea', checkState.checkLogin);
app.get('/blogs_exp_rea', manageExperience.relatedMeMJ);
app.post('/expPageSearch', checkState.checkLogin);
app.post('/expPageSearch', manageExperience.pageSearch);
app.post('/delExper', checkState.checkLogin);
app.post('/delExper', manageExperience.delExper);
app.post('/pubExper', checkState.checkLogin);
app.post('/pubExper', manageExperience.pubExper);
//comment -v1.0
app.get('/blogs_com_mine', checkState.checkLogin);
app.get('/blogs_com_mine', comment.minePage);
app.get('/blogs_com_yours', checkState.checkLogin);
app.get('/blogs_com_yours', comment.yoursPage);
app.post('/comPageSearch', checkState.checkLogin);
app.post('/comPageSearch', comment.pageSearch);
//资源导航 -v1.0
app.get('/navs', navigation.page);
app.post('/navigationListAdd', checkState.checkLogin);
app.post('/navigationListAdd', navigation.listAdd);
app.post('/navigationListDel', checkState.checkLogin);
app.post('/navigationListDel', navigation.listDel);
app.post('/navigationListAddsun', checkState.checkLogin);
app.post('/navigationListAddsun', navigation.listAdd2);
app.post('/navigationListDelsun', checkState.checkLogin);
app.post('/navigationListDelsun', navigation.listDel2);
//公开设置 -v1.0
app.get('/sets_pub', checkState.checkLogin);
app.get('/sets_pub', seting.page);
app.post('/seting', checkState.checkLogin);
app.post('/seting', seting.doPage);
app.post('/setingInit', checkState.checkLogin);
app.post('/setingInit', seting.createInit);
//私人设置 -v1.0
app.get('/sets_pri', checkState.checkLogin);
app.get('/sets_pri', privateSeting.page);
app.post('/privateSeting/add', checkState.checkLogin);
app.post('/privateSeting/add', privateSeting.doPage);
app.post('/privateSeting/del', checkState.checkLogin);
app.post('/privateSeting/del', privateSeting.del);
app.post('/privateSeting/see', checkState.checkLogin);
app.post('/privateSeting/see', privateSeting.see);
app.post('/privateSeting/upd', checkState.checkLogin);
app.post('/privateSeting/upd', privateSeting.upd);
app.post('/privateSeting/chg', checkState.checkLogin);
app.post('/privateSeting/chg', privateSeting.chg);
//密码修改 -v1.0
app.get('/sets_pwd', checkState.checkLogin);
app.get('/sets_pwd', changePassword.page);
app.post('/changePassword', checkState.checkLogin);
app.post('/changePassword', changePassword.doPage);

//第三方的访问页面
app.get('/blogs_aart', allblogs.artSee);
app.get('/blogs_aexp', allblogs.expSee);
app.post('/pageSearchExp', allblogs.pageSearchExp);   //pageSearch不需要拦截登录
app.post('/pageSearchArt', allblogs.pageSearchArt);


app.get('/blogs_alluArts', alluArts.page);
app.get('/blogs_alluExps', alluExps.page);
//测试页面
app.get('/demo', demo.page);

//app的ahref格式化
app.locals.ahref2 = function(signed, uName, vCode) {
    var ret="";
        if(signed=='2'){
            ret='&vCode='+vCode+'&priId='+uName;
        }else{
            ret='&pubId='+uName;
        }
    
    return ret;
};

//app的ahref格式化
app.locals.ahref = function(signed, uName, vCode, hrefStr) {
    var ret="";
        if(signed=='2'){
            ret=hrefStr+'?vCode='+vCode+'&priId='+uName;
        }else if(signed=='3'){
            ret=hrefStr+'?pubId='+uName;
        }else{
            ret=hrefStr;
        }
    
    return ret;
};

//app的navs格式化
app.locals.navs = function(signed, uName, vCode, dat) {
    var ret="";
    
    for(var i=0,len=dat.length; i<len; i++){
        switch(dat[i].modelNam){
            case '个性简介':
                for(var j=0,lenj=dat[i].sunModels.length; j<lenj; j++){
                    if(dat[i].sunModels[j].sunNam=='公开' && dat[i].sunModels[j].sunYesNo==1){
                        if(signed=='2'){
                            ret+='<li><a data-src="/instrc" href="/instrc?priId='+uName+'&vCode='+vCode+'">简介</a></li>';
                        }else{
                            ret+='<li><a data-src="/instrc" href="/instrc?pubId='+uName+'">简介</a></li>';
                        }
                        break;
                    }
                }
                break;
            case '个人简历':
                for(var j=0,lenj=dat[i].sunModels.length; j<lenj; j++){
                    if(dat[i].sunModels[j].sunYesNo==1){
                        if(signed=='2'){
                            ret+='<li><a data-src="/resume" href="/resume?priId='+uName+'&vCode='+vCode+'">简历</a></li>';
                        }else{
                            ret+='<li><a data-src="/resume" href="/resume?pubId='+uName+'">简历</a></li>';
                        }
                        break;
                    }
                }
                break;
            case '资源导航':
                for(var j=0,lenj=dat[i].sunModels.length; j<lenj; j++){
                    if(dat[i].sunModels[j].sunNam=='公开' && dat[i].sunModels[j].sunYesNo==1){
                        if(signed=='2'){
                            ret+='<li><a data-src="/navs" href="/navs?priId='+uName+'&vCode='+vCode+'">资源</a></li>';
                        }else{
                            ret+='<li><a data-src="/navs" href="/navs?pubId='+uName+'">资源</a></li>';
                        }
                        break;
                    }
                }
                break;
            case '博文面经':
                for(var j=0,lenj=dat[i].sunModels.length; j<lenj; j++){
                    if(dat[i].sunModels[j].sunYesNo==1){
                        if(signed=='2'){
                            ret+='<li><a data-src="/blogs_" href="/blogs_aart?typ=0&priId='+uName+'&vCode='+vCode+'">博文</a></li>';
                        }else{
                            ret+='<li><a data-src="/blogs_" href="/blogs_aart?typ=0&pubId='+uName+'">博文</a></li>';
                        }
                        break;
                    }
                }
                break;
            default:
                break;
        }
    }
    return ret;
};

//app的artTyp格式化
app.locals.artTypsChg = function(dat) {
    var ret="";
    switch(dat){
        case 1:
            ret='技术博客';break;
        case 2:
            ret='行业远瞻';break;
        case 3:
            ret='随便写写';break;
        case 4:
            ret='生活日志';break;
        default:
            ret="";break;
    }
    return ret;
};
//app的awardTyp格式化
app.locals.awardTyp = function(dat) {
    var ret="";
    switch(dat){
        case '1':
            ret='班级';break;
        case '2':
            ret='院级';break;
        case '3':
            ret='校级';break;
        case '4':
            ret='市级';break;
        case '5':
            ret='省级';break;
        case '6':
            ret='国级';break;
        case '7':
            ret='国际';break;
        default:
            ret="";break;
    }
    return ret;
};
//app的学历格式化
app.locals.eduType = function(dat) {
    var ret="";
    switch(dat){
        case '1':
            ret='高中';break;
        case '2':
            ret='大专';break;
        case '3':
            ret='本科';break;
        case '4':
            ret='硕士';break;
        case '5':
            ret='博士';break;
        default:
            ret="";break;
    }
    return ret;
};
//app的日期格式化
app.locals.dateformat = function(obj, format) {
    if (format == undefined) {
        format = 'YYYY-MM-DD HH:mm:ss';
    }
    var ret = moment(obj).format(format);
    return ret;
};
//app的字符串截取
app.locals.cutStr = function(str, strLen, addStr){
    var allLen=0,
        len=str.length;
    for(var i=0; i<len; i++){
        allLen+=str.charCodeAt(i) > 128 ? 2 : 1; 
    }
    if(allLen<=strLen){
        return str;
    }
    var cutStr='', strNum=0;
    for(var j=0; j<len; j++){
        strNum+=str.charCodeAt(j) > 128 ? 2 : 1; 
        cutStr+=str[j];
        if(strNum>=strLen){
            break;
        }
    }
    if(addStr){
        cutStr+=addStr;
    }
    return cutStr;
}
//数据库的链接
MongodbAPI.connect(function(error) {
    if (error) throw error;
});
app.on('close', function(errno) {
    MongodbAPI.disconnect(function(err) {});
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('该页面不存在');
    err.status = 404;
    next(err);
});
// error handlers    mongod --dbpath F:\Mongodb\db
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: "错误页面-人人秀",
            uName: ""
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: "错误页面-人人秀",
        uName: ""
    });
});

module.exports = app;
