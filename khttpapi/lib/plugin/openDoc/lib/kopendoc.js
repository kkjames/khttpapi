/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-22
 * Time: 下午9:14
 * To change this template use File | Settings | File Templates.
 */
var generator = require('./generate')
    , path = require('path')
    , handlersFolder = 'handlers',
    modelsFolder = 'models',
    kutil = require('kutil');
module.exports = {
    load:function (api) {
        if (kutil.isNotNothing(api)) {
            console.log('装载opendoc的协议--->');
            api.appendModels(path.join(__dirname, modelsFolder));
            api.appendHandlers(path.join(__dirname, handlersFolder));
        }
    },
    generateSDK:function (protocol, fn) {
        generator.gen(protocol, function (err, code) {
            fn(err, code);
        });
    }
};