$(document).ready(function() {

    //mongod --dbpath E:\renrenShow\Mongodb\data

});

//seting页面初始化数据事件
function setingInit(uName, callback) {
    $.ajax({
        type: 'post',
        url: '/setingInit',
        data: {
            uName: uName
        },
        dataType: 'json',
        success: function(data) {
            if (data.retCode != 200) {
                callback(data.retDesc);
            } else {
                callback(null);
            }
        },
        error: function(err) {
            callback(err);
        }
    });
}

//privateSeting页面初始化数据事件
function priSetingInit(uName, callback) {
    $.ajax({
        type: 'post',
        url: '/privateSetingInit',
        data: {
            uName: uName
        },
        dataType: 'json',
        success: function(data) {
            if (data.retCode != 200) {
                callback(data.retDesc);
            } else {
                callback(null);
            }
        },
        error: function(err) {
            callback(err);
        }
    });
}

//navigation的数据初始化
function navInit(uName, callback) {
    $.ajax({
        type: 'post',
        url: '/navigationListInit',
        data: {
            uName: uName
        },
        dataType: 'json',
        success: function(data) {
            if (data.retCode != 200) {
                callback(data.retDesc);
            } else {
                callback(null);
            }
        },
        error: function(err) {
            callback(err);
        }
    });
}

//resumeInit的数据初始化
function resumeInit(uName, callback) {
    $.ajax({
        type: 'post',
        url: '/resumeInit',
        data: {
            uName: uName
        },
        dataType: 'json',
        success: function(data) {
            if (data.retCode != 200) {
                callback(data.retDesc);
            } else {
                callback(null);
            }
        },
        error: function(err) {
            callback(err);
        }
    });
}
