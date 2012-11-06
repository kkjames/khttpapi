/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-26
 * Time: 下午3:46
 * To change this template use File | Settings | File Templates.
 */
module.exports = function handlerRoute(api) {
    return function handlerRoute(req, res, next) {
        console.log(req.path);
        req.handler = api.handlers[req.path];
        next();
    }
}