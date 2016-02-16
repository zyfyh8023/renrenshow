var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义User对象模型
var ResumeScheme = new Schema({
    author: {
        type: String,
        unique: true
    },
    baseInfo1: {
        uname: String,
        gender: String,
        age: String,
        identity: String,
        education: String,
        school: String,
        major: String
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
        collegeName: String,
        educationtype: String,
        sdatetime: Date,
        edatetime: Date,
        major: String,
        majorinstr: String,
        schoolLogo: {
            type: String,
            default: '/images/school.jpg'
        }
    }],
    experience4: [{
        practice: String,
        departmentName: String,
        spracticetime: String,
        epracticetime: String,
        practiceposition: String,
        practiceinstr: String,
        companyLogo: {
            type: String,
            default: '/images/hw.jpg'
        }
    }],
    work5: [{
        practice: String,
        departmentName: String,
        spracticetime: String,
        epracticetime: String,
        practiceposition: String,
        practiceinstr: String,
        companyLogo: {
            type: String,
            default: '/images/hw.jpg'
        }
    }],
    Certificate6: [{
        certificatename: String,
        gettime: String,
        cgrade: String,
        certificateinstr: String,
        cimages: {
            type: String,
            default: '/images/exp1.jpg'
        }
    }],
    pWorks7: [{
        workname: String,
        worktime: String,
        relationlink: String,
        workdes: String,
        workimg: {
            type:[],
            default:['/images/exp3.jpg', '/images/exp4.jpg']
        }
    }],
    projects8: [{
        pName: String,
        pTime: String,
        addt: String,
        pnum: String,
        myPos: String,
        myworks: String
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
        allAuthors: String,
        ppAddr: String,
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
