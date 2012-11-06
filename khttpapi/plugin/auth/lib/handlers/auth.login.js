/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-25
 * Time: 下午8:45
 * To change this template use File | Settings | File Templates.
 */
var kutil = require('kutil');
module.exports = {
    title:'登陆',
    path:'/auth/login',
    roles:['any'],
    type:'login',
    inputs:{
        name:'AAuthLogin',
        type:'object',
        properties:{
            username:{type:'string', title:'用户名', required:true},
            password:{type:'string', title:'密码', required:true}
        }
    },
    returns:'MPassport',
    dataAccess:function (inputs, db, args, callback) {
        var usercoll = db.collection('user');
        usercoll.findOne({
            username:inputs.username
        }, {_id:1, username:1, password:1}, function (err, user) {
            if (err) {
                callback(err);
            } else {
                if (kutil.md5(inputs.password) === user.password) {
                    var token = kutil.createToken();
                    usercoll.update({_id:user._id}, {
                        $set:{
                            token:token
                        }
                    }, function (err, user) {
                        callback(err, token);
                    });
                } else {
                    callback('输入的用户名或密码有误');
                }
            }
        });
    }
};