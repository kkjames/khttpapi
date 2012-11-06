/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-17
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
module.exports = function (api, handler, entity) {
    //基本参数
    handler.path = handler.path + 'show';
    //输入
    handler.inputs = {
        name:'MI' + entity.name + '_show',
        title:'列出' + entity.title,
        type:'object',
        properties:{
            _id:{type:'string', require:1}
        }
    };

    var model = {
        name:'MO' + entity.name + '_show',
        type:'object',
        properties:{}
    };
    api.addModel(model);
    handler.returns = model.name;
    handler.dataAccess = function (inputs, args, dataAccess, callback) {
        db.collection(entityName).findById(req.body._id, queryColumns, function (err, item) {
            callback(err, item);
        });
    }
    return handler;
}