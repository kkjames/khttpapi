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
var collection = db.collection('member');
collection.find().toArray(function (err, arr) {
    console.log(arr);
});

