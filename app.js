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
var blog = require('./routes/mWebsite/blog');
var navs = require('./routes/mWebsite/navs');
var jobs = require('./routes/mWebsite/jobs');
var exps = require('./routes/mWebsite/exps');
var talentpool = require('./routes/mWebsite/talentpool');
var about = require('./routes/mWebsite/about');
var login = require('./routes/mWebsite/login');
var register = require('./routes/mWebsite/register');
var allarticle = require('./routes/mWebsite/allarticle');

var myindex = require('./routes/uWebsite/myindex');
var introduction = require('./routes/uWebsite/introduction');
var resume = require('./routes/uWebsite/resume');
var navigation = require('./routes/uWebsite/navigation');
var managearticle = require('./routes/uWebsite/managearticle');
var manageExperience = require('./routes/uWebsite/manageExperience');
var createarticle = require('./routes/uWebsite/createarticle');
var createExperience = require('./routes/uWebsite/createExperience');
var seting = require('./routes/uWebsite/seting');
var seting2 = require('./routes/uWebsite/seting2');
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

//主站 --GET请求
app.get('/', routes.page);   //首页
app.get('/index', routes.page);   //首页
app.get('/blog', blog.page);   //博文
app.get('/exps', exps.page);   //面经
app.get('/jobs', jobs.page);   //工作
app.get('/navs1', navs.page1);   //导航1
app.get('/navs2', navs.page2);   //导航2
app.get('/navs3', navs.page3);   //导航3
app.get('/navs4', navs.page4);   //导航4
app.get('/navs5', navs.page5);   //导航5
app.get('/navs6', navs.page6);   //导航6
app.get('/navs7', navs.page7);   //导航6
app.get('/res', talentpool.page);  //人才
app.get('/blog_typ', allarticle.page);   //所有文章
app.get('/login', login.page);   //登录
app.get('/register', register.page);   //注册
app.get('/faq', faq.page);      //介绍
app.get('/about', about.page);     //帮助

//主站  --AJAX请求
app.post('/login', login.doLogin);   //登录操作  
app.post('/register', register.doRegister);  //注册操作
app.post('/loginOut', login.loginOut);      //注销操作
app.post('/about', about.doPage);       //帮助操作
app.post('/allUserPS', talentpool.allUserPS);  //人才列表分页
app.post('/allArts', allarticle.allartPS);     //文章列表分页
app.post('/allExps', exps.allexpPS);        //面经列表分页

//个人主站  --GET请求
app.get('/:uid/index', myindex.page);          //首页
app.get('/:uid/instrc', introduction.page);    //自我介绍
app.get('/:uid/resume', resume.page);          //简历
app.get('/:uid/navs', navigation.page);        //资源导航
app.get('/sets_pub', seting.page);             //公开设置
app.get('/:uid/sets_pub2', seting2.page);      //公开设置2
app.get('/:uid/sets_apply', seting2.apply);    //申请特权
app.get('/sets_pri', privateSeting.page);      //半公开设置
app.get('/sets_pwd', changePassword.page);     //密码修改
app.get('/:uid/blogs_art', blogAorE.artSee);       //具体文章查看
app.get('/:uid/blogs_exp', blogAorE.expSee);       //具体面经查看
app.get('/:uid/resume_awd', seeuInfo.awards);      //简历中荣誉的查看
app.get('/:uid/resume_cmp1', seeuInfo.companys1);  //简历中实习的查看
app.get('/:uid/resume_cmp2', seeuInfo.companys2);  //简历中工作的查看
app.get('/:uid/resume_scl', seeuInfo.schools);     //简历中学校的查看
app.get('/:uid/resume_wok', seeuInfo.works);       //简历中作品的查看
app.get('/:uid/blogs_alluArts', alluArts.page);    //所有文章的列表
app.get('/:uid/blogs_alluExps', alluExps.page);    //所有面经的列表
app.get('/blogs_art_cre', createarticle.page);           //创建新博文------（自己看到的）
app.get('/blogs_art_pub', managearticle.page);           //发表的博文------（自己看到的）
app.get('/blogs_art_pri', managearticle.noPublicBW);     //未发布的博文------（自己看到的）
app.get('/blogs_art_rea', managearticle.relatedMeBW);    //与我相关的博文------（自己看到的）
app.get('/blogs_exp_cre', createExperience.page);        //创建新面经------（自己看到的）
app.get('/blogs_exp_pub', manageExperience.page);        //发布的面经------（自己看到的）
app.get('/blogs_exp_pri', manageExperience.noPublicMJ);  //未发布的面经------（自己看到的）
app.get('/blogs_exp_rea', manageExperience.relatedMeMJ); //与我相关的面经------（自己看到的）
app.get('/:uid/blogs_aart', allblogs.artSee);            //TA的博文------（别人看到的）
app.get('/:uid/blogs_aexp', allblogs.expSee);            //TA的面经------（别人看到的）
app.get('/blogs_com_mine', comment.minePage);            //我的评论------（自己看到的）
app.get('/blogs_com_yours', comment.yoursPage);          //评论我的------（自己看到的）

//个人主站  --AJAx请求
app.post('/allartPS', alluArts.allartPS);             //所有文章
app.post('/allexpPS', alluExps.allexpPS);             //所有面经
app.post('/introduction', introduction.doPage);       //自我介绍
app.post('/resume/allinfo', resume.allinfo);                 //简历
app.post('/resume/baseinfo', resume.baseinfo);               //基本信息
app.post('/resume/contactinfo', resume.contactinfo);         //联系方式
app.post('/resume/education/add', resume.education1);        //教育经历-add
app.post('/resume/education/del', resume.education2);        //教育经历-del
app.post('/resume/education/upd', resume.education3);        //教育经历-update
app.post('/resume/repractice/add', resume.repractice1);      //实习经历-add
app.post('/resume/repractice/del', resume.repractice2);      //实习经历-del
app.post('/resume/repractice/upd', resume.repractice3);      //实习经历-update
app.post('/resume/practice/add', resume.practice1);          //工作经历-add
app.post('/resume/practice/del', resume.practice2);          //工作经历-del
app.post('/resume/practice/upd', resume.practice3);          //工作经历-update
app.post('/resume/certificate/add', resume.certificate1);    //荣誉奖励-add
app.post('/resume/certificate/del', resume.certificate2);    //荣誉奖励-del
app.post('/resume/certificate/upd', resume.certificate3);    //荣誉奖励-update
app.post('/resume/works/add', resume.works1);                //个人作品-add
app.post('/resume/works/del', resume.works2);                //个人作品-del
app.post('/resume/works/upd', resume.works3);                //个人作品-update
app.post('/resume/projects/add', resume.projects1);          //项目经历-add
app.post('/resume/projects/del', resume.projects2);          //项目经历-del
app.post('/resume/projects/upd', resume.projects3);          //项目经历-update
app.post('/resume/undergo/add', resume.undergo1);            //实践经历-add
app.post('/resume/undergo/del', resume.undergo2);            //实践经历-del
app.post('/resume/undergo/upd', resume.undergo3);            //实践经历-update
app.post('/resume/paper/add', resume.paper1);                //论文专利-add
app.post('/resume/paper/del', resume.paper2);                //论文专利-del
app.post('/resume/paper/upd', resume.paper3);                //论文专利-update
app.post('/resume/desc/add', resume.desc1);                  //核心技能-add
app.post('/resume/desc/upd', resume.desc3);                  //核心技能-update
app.post('/resume/desc/del', resume.desc2);                  //核心技能-del
app.post('/createarticle', createarticle.doPage);       //创建博文
app.post('/artPageSearch', managearticle.pageSearch);   //分页查找
app.post('/delArticle', managearticle.delArticle);      //删除博文
app.post('/pubArticle', managearticle.pubArticle);      //发表博文
app.post('/createExperience', createExperience.doPage);       //创建面经
app.post('/expPageSearch', manageExperience.pageSearch);      //分页查找
app.post('/delExper', manageExperience.delExper);             //删除面经
app.post('/pubExper', manageExperience.pubExper);             //发表面经
app.post('/pageSearchExp', allblogs.pageSearchExp);      //博文分页查找
app.post('/pageSearchArt', allblogs.pageSearchArt);      //面经分页查找
app.post('/comPageSearch', comment.pageSearch);          //评论分页查找
app.post('/comment', comment.doPage);                    //新建评论
app.post('/navigationListAdd', navigation.listAdd);           //导航添加大标题
app.post('/navigationListDel', navigation.listDel);           //导航删除大标题
app.post('/navigationListAddsun', navigation.listAdd2);       //导航添加子元素
app.post('/navigationListDelsun', navigation.listDel2);       //导航添加子元素
app.post('/seting', seting.doPage);             //公开设置
app.post('/setingInit', seting.createInit);     //公开设置初始化
app.post('/doApply', seting2.doApply);          //申请特权
app.post('/privateSeting/add', privateSeting.doPage);     //私有设置添加
app.post('/privateSeting/del', privateSeting.del);        //私有设置删除
app.post('/privateSeting/see', privateSeting.see);        //私有设置查看
app.post('/privateSeting/upd', privateSeting.upd);        //私有设置更新
app.post('/privateSeting/chg', privateSeting.chg);        //私有设置修改
app.post('/changePassword', changePassword.doPage);  //密码修改

//测试页面
app.get('/demo', demo.page);

//app的navs格式化
app.locals.navs = function(signed, uName, vCode, dat) {
    var ret='<li><a data-src="/'+uName+'/index" href="/'+uName+'/index">我的首页</a></li>';
    for(var i=0,len=dat.length; i<len; i++){
        switch(dat[i].modelNam){
            case '个性简介':
                for(var j=0,lenj=dat[i].sunModels.length; j<lenj; j++){
                    if(dat[i].sunModels[j].sunNam=='公开' && dat[i].sunModels[j].sunYesNo==1){
                        if(signed=='2'){
                            ret+='<li><a data-src="/'+uName+'/instrc" href="/'+uName+'/instrc?vCode='+vCode+'">自我介绍</a></li>';
                        }else{
                            ret+='<li><a data-src="/'+uName+'/instrc" href="/'+uName+'/instrc">自我介绍</a></li>';
                        }
                        break;
                    }
                }
                break;
            case '个人简历':
                for(var j=0,lenj=dat[i].sunModels.length; j<lenj; j++){
                    if(dat[i].sunModels[j].sunYesNo==1){
                        if(signed=='2'){
                            ret+='<li><a data-src="/'+uName+'/resume" href="/'+uName+'/resume?vCode='+vCode+'">个人简历</a></li>';
                        }else{
                            ret+='<li><a data-src="/'+uName+'/resume" href="/'+uName+'/resume">个人简历</a></li>';
                        }
                        break;
                    }
                }
                break;
            case '资源导航':
                for(var j=0,lenj=dat[i].sunModels.length; j<lenj; j++){
                    if(dat[i].sunModels[j].sunNam=='公开' && dat[i].sunModels[j].sunYesNo==1){
                        if(signed=='2'){
                            ret+='<li><a data-src="/'+uName+'/navs" href="/'+uName+'/navs?vCode='+vCode+'">资源导航</a></li>';
                        }else{
                            ret+='<li><a data-src="/'+uName+'/navs" href="/'+uName+'/navs">资源导航</a></li>';
                        }
                        break;
                    }
                }
                break;
            case '博文面经':
                for(var j=0,lenj=dat[i].sunModels.length; j<lenj; j++){
                    if(dat[i].sunModels[j].sunYesNo==1 || dat[i].sunModels[j].sunYesNo==2){
                        if(signed=='2'){
                            ret+='<li><a data-src="/'+uName+'/blogs_" href="/'+uName+'/blogs_aart?vCode='+vCode+'&typ=0">博文面经</a></li>';
                        }else{
                            ret+='<li><a data-src="/'+uName+'/blogs_" href="/'+uName+'/blogs_aart?typ=0">博文面经</a></li>';
                        }
                        break;
                    }
                }
                break;
            default:
                break;
        }
    }
    if(signed=='1'){
        ret+='<li><a data-src="/'+uName+'/instrc" href="/'+uName+'/instrc">自我介绍</a></li>';
        ret+='<li><a data-src="/'+uName+'/resume" href="/'+uName+'/resume">个人简历</a></li>';
        ret+='<li><a data-src="/'+uName+'/navs" href="/'+uName+'/navs">资源导航</a></li>';
        ret+='<li><a data-src="/blogs_" href="/blogs_art_pub">博文面经</a></li>';
        ret+='<li><a data-src="/sets_" href="/sets_pub">设置中心</a></li>';
    }else{
        ret+='<li><a data-src="/'+uName+'/sets_" href="/'+uName+'/sets_pub2">设置中心</a></li>';
    }
    return ret;
};

//app的artTyp格式化
app.locals.artTypsChg = function(dat) {
    var ret="";
    switch(dat){
        case '01':
            ret='前端开发';break;
        case '02':
            ret='后端开发';break;
        case '03':
            ret='客户端开发';break;
        case '04':
            ret='数据库开发';break;
        case '05':
            ret='产品运营';break;
        case '06':
             ret='UI设计';break;   
        case '11':
            ret='行业远瞻';break;
        case '21':
            ret='生活日志';break;
        case '91':
            ret='随便写写';break;
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

//app的性别格式化
app.locals.sexType = function(dat) {
    var ret="";
    switch(dat){
        case '1':
            ret='男';break;
        case '2':
            ret='女';break;
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

//app的富文本图片自动获取img的路径
app.locals.imgUrl = function(utls) {
    var curl=utls.split('..'); 
    return curl[1];
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

//app的性别格式化
app.locals.uNameChg = function(str) {
    var  temp=str.split('@');
    var  reStr=temp[0];
    return reStr;
};

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
            title: "错误页面-助聘网",
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
        title: "错误页面-助聘网",
        uName: ""
    });
});

module.exports = app;
