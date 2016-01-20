var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义User对象模型
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    headimg: {
        type: String,
        default: '/images/boyimg.jpg'
    },
    password: String,
    uimg: {
        type: String,
        default: '/images/seximg.jpg'
    },   
    uinstrc: {
        type: String,
        default: '<p>杨青，女，一个80后草根女站长！09年入行，从业已经有三四年。从搬砖一样的生活方式换成了现在有“单”而居的日子。' +
            '当然这个单不是单身的单，跟我的职业相比，爱情脱单并不是问题！虽然极尽苛刻的征婚条件但也远不及客户千奇百怪的要求。' +
            '告别了朝九晚五，躲过了风吹日晒，虽然不再有阶梯式的工资，但是偶尔可以给自己放放假，挽着老公，一起轻装旅行。</p>' +
            '<p>人生就是一个得与失的过程，而我却是一个幸运者，得到的永远比失去的多。生活的压力迫使我放弃了轻松的前台接待，' +
            '放弃了体面的编辑，换来虽有些蓬头垢面的工作，但是我仍然很享受那些熬得只剩下黑眼圈的日子，因为我在学习使用Photoshop、' +
            'Flash、Dreamweaver、ASP、PHP、JSP...中激发了兴趣，然后越走越远....</p><p>在这条路上，我要感谢三个人，第一个是我从事编辑的老板，' +
            '是他给了我充分学习研究div的时间，第二个人是我的老师，如果不是街上的一次偶遇，如果不是因为我正缺钱，我不会去强迫自己做不会的事情，' +
            '但是金钱的诱惑实在是抵挡不了，于是我选择了“接招”，东拼西凑的把一个网站做好了，当时还堪称佳作的网站至今已尘归尘土归土了。第三个人，' +
            '我总说他是我的伯乐，因为我当初应聘技术员的时候，我说我什么都不会，但是他却给了我机会，而我就牢牢的把握了那次机会，' +
            '直到现在如果不是我主动把域名和空间转出来，我会一直霸占着公司资源，免费下去（可我就偏偏不是喜欢爱占便宜的人，总感觉欠了就得还）...</p>' +
            '<p>还要特别感谢一个人，是我的老公。他是我的百科，我不会的，他会，最后我还是不会。博客能做到今天这样，一半都有他的功劳。' +
            '他不仅仅支持我的事业作为我有力的经济后盾，还毫无怨言的包容我所有工作、生活当中有理无理的坏脾气，曾经我是多么有自己原则的一个人，' +
            '但是遇到他，打破了我自己毕生坚持的原则，喜欢一句话“冥冥中该来则来，无处可逃”。</p>'
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        default: Date.now
    }
});

//访问User对象模型
mongoose.model('User', UserSchema);
var User = mongoose.model('User');
exports.User = User;


//添加新的user
exports.createUser = function(userObj, callback) {
    var newUser = userObj;
    newUser.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(uName, callback) {
    User.findOne({
        username: uName
    }, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//根据用户名查找   
exports.findByUnameAndPwd = function(uName, pwd, callback) {
    User.findOne({
        username: uName,
        password: pwd
    }, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//条件查找所有的结果集
exports.findAll = function(object, callback) {
    User.find(object, function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

//分页条件查找所有的结果集
exports.findAllByCon = function(object, pagenum, skipstep, callback) {
    var query = User.find(object).sort('create_date').skip(skipstep).limit(pagenum).sort('-create_date');
    query.exec(function(err, result) {
        if (err) {
            callback(err);
        } else {
            User.count(object, function(error, allnum) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result, allnum);
                }
            });
        }
    });
}

//删除操作
exports.delete = function(object, callback) {
    User.remove(object, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions, updates, callback) {
    User.update(conditions, updates, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}
