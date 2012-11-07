/**
 * Created with JetBrains WebStorm.
 * User: zhanganle
 * Date: 12-10-16
 * Time: 下午2:12
 * To change this template use File | Settings | File Templates.
 * 通过输入参数构造一个合法的handler
 */
var KHandler = module.exports = function (options) {
}
var typeInitializer = require('./typeInitializer'),
    kschema = require('kschema'),
    kutil = require('kutil');

KHandler.handlerRoute = require('./proc/handlerRoute');
KHandler.accessCheck = require('./proc/accessCheck');
KHandler.inputsCheck = require('./proc/inputsCheck');
KHandler.logicProcess = require('./proc/logicProcess');
KHandler.load = function (path, callback) {
    var metadata = require(path);
    if (metadata && metadata.path) {
        try {
            typeInitializer[metadata.type](metadata);
            if (kutil.isNotNothing(metadata.inputs) && kutil.isNothing(metadata.inputs.name)) {
                metadata.inputs.name = 'MI' + metadata.name;
            }
            metadata.inputsSchema = kschema(metadata.inputs, 'inputModel');
            callback(metadata);
        } catch (e) {
            console.log('装载handler：' + metadata.path + '失败\n!!错误:' + e.message);
        }
    } else {
        console.log('装载handler：' + path + '失败');
    }
};