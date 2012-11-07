/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-27
 * Time: 上午11:13
 * To change this template use File | Settings | File Templates.
 */
module.exports = function inputsCheck(api) {
    return function inputsCheck(req, res, next) {
        console.log('检查输入参数开始--->');
        var params = {};
        for (var key in req.query) {
            params[key] = req.query[key];
        }
        for (var key in req.body) {
            params[key] = req.body[key];
        }
        if (req.handler.inputs) {
            console.log('验证并生成inputs位于：' + req.handler.path);
            req.handler.inputsSchema.create(params, function (err, _inputs) {
                req.inputs = _inputs
                next(err);
            });
        } else {
            next();
        }
    }
}