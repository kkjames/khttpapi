/**
 * Created with JetBrains WebStorm.
 * User: zhanganle
 * Date: 12-10-16
 * Time: 下午2:12
 * To change this template use File | Settings | File Templates.
 * 通过输入参数构造一个合法的handler
 */
var KHandler = module.exports = function (options) {
//    this.title = options.title ? options.title : '';
//    this.roles = options.roles ? options.roles : ['any'];
//    this.level = options.level ? options.level : 'super';
//    if (kutil.isNothing(options.type)) {
//        throw new Error('type不能为空');
//    } else {
//        this.type = options.type;
//    }
//    if (kutil.isNothing(options.path)) {
//        throw new Error('path不能为空');
//    } else {
//        this.path = options.path;
//    }
//    this.inputs = options.inputs ? options.inputs : {};
//    if (kutil.isNothing(options.returns)) {
//        throw new Error('返回类型不能为空');
//    } else {
//        this.returns = options.returns;
//    }
//    if (kutil.isNothing(options.dataAccess)) {
//        throw new Error('dataAccess方法未实现');
//    } else {
//        this.dataAccess = options.dataAccess;
//    }
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