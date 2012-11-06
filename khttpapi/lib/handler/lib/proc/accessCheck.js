/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-26
 * Time: 下午3:46
 * To change this template use File | Settings | File Templates.
 */
var defineKey = {
        appkey:'keaku-appkey',
        token:'keaku-token',
        secret:'keaku-token'
    }
    , kutil = require('kutil');
module.exports = function accessCheck(db, api) {
    return function accessCheck(req, res, next) {
        console.log('检查权限--->');
        var appkey = req.header(defineKey.appkey);
        var token = req.header(defineKey.token);
        var secret = req.header(defineKey.secret);
        if (kutil.isNothing(appkey)) {
            //return next('APPKey是必须的');
        }
        if (kutil.isNothing(secret)) {
            //return next('APPSecret是必须的');
        }
        if (kutil.isOff(req.handler.roles, 'any')) {
            if (kutil.isNothing(token)) {
                return next('不允许匿名用户访问');
            }
            db.open(function (err) {
                db.collection('user').findOne({
                    token:token,
                    expires:{
                        $gt:new Date().getTime()
                    }
                }, {username:1, roles:1}, function (err, user) {
                    if (err) {
                        next(err);
                    } else if (!kutil.hasEqualValue(req.handler.roles, user.roles)) {
                        next('权限不足');
                    } else {
                        req.passport = {
                            username:user.username
                        };
                        next();
                    }
                });
            });
        }
//        if (!req.session.passport) {
//            if (!options.metadata.roles.indexOf('any') < 0) {
//                next.error('不允许匿名用户访问');
//            }
//        } else {
//            if (!kutil.hasEqualValue(options.metadata.roles, options.req.session.passport.roles)) {
//                next.error('权限不足');
//            } else {
//                next();
//            }
//        }
        next();
    }
}