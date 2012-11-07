/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-15
 * Time: 上午10:44
 * To change this template use File | Settings | File Templates.
 */

var ExtModel = require('./extModel'),
    kutil = require('kutil')
    , kentitymanager = module.parent.exports;
module.exports = {
    load:function (api) {
        console.log('客户端生成');
        for (var k in api.entities) {
            var entity = api.entities[k];
            if (kutil.isNotNothing(entity)) {
                var handler = {
                    title:'管理' + entity.title,
                    path:kentitymanager.getBasePath(entity) + 'client',
                    roles:entity.roles,
                    returns:entity.name,
                    logicProcess:function (inputs, args, dataAccess, callback) {
                        callback(null, new ExtModel(entity));
                    }
                };
                api.addHandler(handler);
            } else {
                throw new Error('entity为空');
            }
        }
    }
};