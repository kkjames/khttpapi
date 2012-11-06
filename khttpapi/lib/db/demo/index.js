/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-15
 * Time: 上午11:16
 */
var settings = {
    db:{
        default:{
            name:'tsinamember',
            host:'192.168.8.26'
        }
    }
};
var db = require('../../db')(settings);
var temp_data = require('./temp_data');
var collection = db.collection('member');
temp_data.forEach(function (data) {
    collection.insert(data);
});

