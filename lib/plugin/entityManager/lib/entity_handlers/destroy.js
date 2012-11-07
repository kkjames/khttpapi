/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-17
 * Time: 下午4:14
 * To change this template use File | Settings | File Templates.
 */
module.exports = function (api, handler, entity) {
    //基本参数
    handler.path = handler.path + 'destroy';
    //输入
    handler.inputs = {
        name:'MI' + entity.name + '_destroy',
        title:'列出' + entity.title,
        type:'object',
        properties:{
            ids:{type:'string[]'}
        }
    };
    handler.returns = 'bool';
    handler.dataAccess = function (inputs, args, dataAccess, callback) {
        db.collection(entityName).remove({_id:{'$in':req.body['ids']}}, function (err) {
            callback(err, true);
        });
    }
    return handler;
}