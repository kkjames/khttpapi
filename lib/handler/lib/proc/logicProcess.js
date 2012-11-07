/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-26
 * Time: 下午3:47
 * To change this template use File | Settings | File Templates.
 */
var kutil = require('kutil');
module.exports = function logicProcess(db, api) {
    return function logicProcess(req, res, next) {
        var createModel = function (name, instance, callback) {
                api.models[name].create(instance, callback);
            },
            createEntity = function (name, instance, callback) {
                api.entities[name].create(instance, callback);
            };

        console.log('业务处理开始--->');
        console.log('确定默认业务处理函数');
        var logicProcess = req.handler.logicProcess || function (inputs, args, dataAccess, callback) {
            dataAccess(callback);
        };
        console.log('执行业务处理');
        logicProcess.call(null, req.inputs, {
            models:api.models,
            handlers:api.handlers,
            passport:req.passport,
            projectName:api.settings.projectName,
            createModel:createModel
        }, function (logic_callback) {
            if (req.handler.dataAccess) {
                console.log('打开数据库连接');
                db.open(function () {
                    console.log('数据访问开始--->');
                    req.handler.dataAccess.call(null, req.inputs, db, {
                        handlers:api.handlers,
                        entities:api.entities,
                        models:api.models,
                        passport:req.passport,
                        createEntity:createEntity,
                        createModel:createModel
                    }, function (err, model) {
                        //console.log('关闭数据库连接');
                        //db.close();
                        logic_callback(err, model);
                    });
                });
            } else {
                logic_callback(null);
            }
        }, function (err, model) {
            res.send(api.result(err, model));
        });
    }
};