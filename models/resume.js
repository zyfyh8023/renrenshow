var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义User对象模型
var ResumeScheme = new Schema({
    author: {
        type: String,
        unique: true
    },
    headimg: String,
    baseInfo1: {
        uname: String,
        gender: String,
        age: String,
        identity: String,
        education: String,
        school: String,
        major: String,
        headImg: String
    },
    contact2: {
        mPhone: String,
        phoneNum: String,
        populationAddr: String,
        permanentAddr: String,
        email: String,
        qqNum: String
    },
    schools3: [{
        school: String,
        educationtype: String,
        sdatetime: Date,
        edatetime: Date,
        major: String,
        majorinstr: String,
        schoolLogo: String
    }],
    experience4: [{
        practice: String,
        spracticetime: String,
        epracticetime: String,
        practiceposition: String,
        practiceinstr: String,
        companyLogo: String
    }],
    work5: [{
        practice: String,
        spracticetime: String,
        epracticetime: String,
        practiceposition: String,
        practiceinstr: String,
        companyLogo: String
    }],
    Certificate6: [{
        certificatename: String,
        gettime: String,
        cgrade: String,
        certificateinstr: String,
        cimages: String
    }],
    pWorks7: [{
        workname: String,
        worktime: String,
        workduty: String,
        showink: String,
        codelink: String,
        workdes: String,
        workimg: []
    }],
    projects8: [{
        pName: String,
        pTime: String,
        addt: String
    }],
    trys9: [{
        tName: String,
        tTime: String,
        tType: String,
        addt: String
    }],
    PatentPaper10: [{
        ppName: String,
        ppTime: String,
        ppType: String,
        addt: String
    }],
    Technology11: [],
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
mongoose.model('Resume', ResumeScheme);
var Resume = mongoose.model('Resume');
exports.Resume = Resume;

//添加功能
exports.create = function(obj, callback) {
    var newResume = obj;
    newResume.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(author, callback) {
    Resume.findOne({
        author: author
    }, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

//条件查找所有结果集
exports.findAll = function(object, callback) {
    Resume.find(object, function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

//删除操作
exports.delete = function(object, callback) {
    Resume.remove(object, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions, updates, options, callback) {
    Resume.update(conditions, updates, options, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}
