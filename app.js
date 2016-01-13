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
var routes = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var faq = require('./routes/faq');
var myindex = require('./routes/myindex');
var resume = require('./routes/resume');
var pageResume = require('./routes/pageResume');
var managearticle = require('./routes/managearticle');
var manageExperience = require('./routes/manageExperience');
var createarticle = require('./routes/createarticle');
var createExperience = require('./routes/createExperience');
var allarticle = require('./routes/allarticle');
var article = require('./routes/article');
var introduction = require('./routes/introduction');
var resource = require('./routes/resource');
var navigation = require('./routes/navigation');
var talentpool = require('./routes/talentpool');
var seting = require('./routes/seting');
var privateSeting = require('./routes/privateSeting');
var changePassword = require('./routes/changePassword');
var checkState = require('./routes/checkState');
var myError = require('./routes/myError');
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
    extended: false
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
        var img_url = '/images/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
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
app.get('/allarticle', allarticle.page);
app.get('/article', article.page);
app.get('/login', login.page);
app.post('/login', login.doLogin);
//没登录的情况下提交退出
app.post('/loginOut', checkState.checkLogin);
app.post('/loginOut', login.loginOut);
//注册页面不需要限制
app.get('/register', register.page);
app.post('/register', register.doRegister);



//个人中心——首页
app.get('/myindex', myindex.page);
//个人中心——个性介绍
app.get('/instrc', introduction.page);
app.post('/introduction', introduction.doPage);
//个人中心——网页简历
app.get('/resume', resume.page);
app.post('/resume/allinfo', resume.allinfo);
app.post('/resume/desc/add', resume.desc1); //核心技能-add
app.post('/resume/desc/upd', resume.desc3); //核心技能-update
app.post('/resume/desc/del', resume.desc2); //核心技能-del
app.post('/resume/paper/add', resume.paper1); //论文专利-add
app.post('/resume/paper/del', resume.paper2); //论文专利-del
app.post('/resume/paper/upd', resume.paper3); //论文专利-update
app.post('/resume/undergo/add', resume.undergo1); //add
app.post('/resume/undergo/del', resume.undergo2); //del
app.post('/resume/undergo/upd', resume.undergo3); //update
app.post('/resume/works/add', resume.works1); //add
app.post('/resume/works/del', resume.works2); //del
app.post('/resume/works/upd', resume.works3); //update
app.post('/resume/projects/add', resume.projects1); //add
app.post('/resume/projects/del', resume.projects2); //del
app.post('/resume/projects/upd', resume.projects3); //update
app.post('/resume/certificate/add', resume.certificate1); //add
app.post('/resume/certificate/del', resume.certificate2); //del
app.post('/resume/certificate/upd', resume.certificate3); //update

app.post('/resumeInit', resume.resumeInit);
app.post('/resume/baseinfo', resume.baseinfo); //基本信息
app.post('/resume/contactinfo', resume.contactinfo); //联系方式
app.post('/resume/education/add', resume.education1); //教育经历-add
app.post('/resume/education/del', resume.education2); //教育经历-del
app.post('/resume/education/upd', resume.education3); //教育经历-update
app.post('/resume/practice/add', resume.practice1); //工作经历-add
app.post('/resume/practice/del', resume.practice2); //工作经历-del
app.post('/resume/practice/upd', resume.practice3); //工作经历-update
app.post('/resume/repractice/add', resume.repractice1); //re工作经历-add
app.post('/resume/repractice/del', resume.repractice2); //re工作经历-del
app.post('/resume/repractice/upd', resume.repractice3); //re工作经历-update
//纸质简历
app.get('/pageResume', pageResume.page);
app.post('/pageResume', pageResume.doPage);
//博文管理
app.get('/blogs_art_cre', createarticle.page);
app.post('/createarticle', createarticle.doPage);
app.get('/blogs_art_pub', managearticle.page);
app.get('/blogs_art_pri', managearticle.noPublicBW);
app.get('/blogs_art_rea', managearticle.relatedMeBW);
app.post('/artPageSearch', managearticle.pageSearch);
//面试经验
app.get('/blogs_exp_cre', createExperience.page);
app.post('/createExperience', createExperience.doPage);
app.get('/blogs_exp_pub', manageExperience.page);
app.get('/blogs_exp_pri', manageExperience.noPublicMJ);
app.get('/blogs_exp_rea', manageExperience.relatedMeMJ);
app.post('/expPageSearch', manageExperience.pageSearch);
//资源导航
app.get('/navs', navigation.page);
app.post('/navigationListInit', navigation.listInit);
app.post('/navigationListAdd', navigation.listAdd);
app.post('/navigationListDel', navigation.listDel);
app.post('/navigationListAddsun', navigation.listAdd2);
app.post('/navigationListDelsun', navigation.listDel2);
//公开设置
app.get('/sets_pub', seting.page);
app.post('/seting', seting.doPage);
app.post('/setingInit', seting.createInit);
//私人设置
app.get('/sets_pri', privateSeting.page);
app.post('/privateSeting/add', privateSeting.doPage);
app.post('/privateSeting/del', privateSeting.del);
app.post('/privateSeting/see', privateSeting.see);
app.post('/privateSetingInit', privateSeting.createInit);
//密码修改
app.get('/sets_pwd', changePassword.page);
app.post('/changePassword', changePassword.doPage);
//错误页面
app.get('/myError', myError.page);
//测试页面
app.get('/demo', demo.page);
// ejs.filters.dateformat = function(obj, format) {
//     if (format == undefined) {
//         format = 'YYYY-MM-DD HH:mm:ss';
//     }
//     var ret = moment(obj).format(format);
//     return ret == 'Invalid date' ? '0000-00-00 00:00:00' : ret;
// };

MongodbAPI.connect(function(error) {
    if (error) throw error;
});
app.on('close', function(errno) {
    MongodbAPI.disconnect(function(err) {});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
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
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
