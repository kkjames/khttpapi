/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-17
 * Time: 下午4:26
 */
var env = require('khttpapi').env
    , kutil = require('kutil');
module.exports = {
    title:'显示一个Api',
    path:'/openapi/show',
    roles:['any'],
    type:'show',
    inputs:{
        type:'object',
        properties:{
            path:{type:'string', title:'API地址', required:true},
            project:{type:'string', title:'项目名', required:true}
        }
    },
    returns:'MAPIDoc',
    logicProcess:function (inputs, args, dataAccess, callback) {
        var handler = args.handlers[inputs.path];
        args.createModel('MAPIDoc', {
            title:handler.title,
            path:handler.path,
            roles:handler.roles,
            inputs:handler.inputs,
            httpMethods:handler.httpMethods,
            returns:(function (modelName) {
                if (args.models[modelName]) {
                    return args.models[modelName];
                } else {
                    return modelName;
                }
            })(handler.returns)
        }, function (err, model) {
            callback(err, model);
        });
    }
};
