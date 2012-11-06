/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-17
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
module.exports = function (api,handler, entity) {
    //基本参数
    handler.path = handler.path + 'update';
    //输入
    handler.inputs = {
        name:'MI' + entity.name + '_update',
        title:'列出' + entity.title,
        type:'object',
        properties:{
            _id:{type:'string', require:1}
        }
    };
    handler.returns = 'bool';
    handler.dataAccess = function (inputs, args, dataAccess, callback) {
        db.collection(entityName).updateById(req.body['_id'], obj, {safe:true}, function (err) {
            callback(err, true);
        });
    }
    return handler;
}