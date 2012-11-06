/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-17
 * Time: 下午4:14
 * To change this template use File | Settings | File Templates.
 */
module.exports = function (api, handler, entity) {
    //基本参数
    handler.path = handler.path + 'create';
    //输入
    handler.inputs = {
        name:'MI' + entity.name + '_create',
        title:'列出' + entity.title,
        type:'object',
        properties:{
            ids:{type:'string[]'}
        }
    };

    var model = {
        name:'MO' + entity.name + '_create',
        type:'object',
        properties:{}
    };
    for (var k in entity.properties) {
        if (entity.properties[k].create === 1) {
            handler.inputs.properties[k] = entity.properties[k];
        }
        model.properties[k] = entity.properties[k];
    }
    handler.returns = model.name;
    api.addModel(model);
    handler.dataAccess = function (inputs, args, dataAccess, callback) {
        db.collection(entityName).save(obj, function (err, item) {
            callback(err, item);
        });
    }
    return handler;
}