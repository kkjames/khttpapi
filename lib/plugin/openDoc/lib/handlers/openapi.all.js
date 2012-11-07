/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-17
 * Time: 下午4:26
 */
var env = require('khttpapi').env
    , kutil = require('kutil');
module.exports = {
    title:'列出api',
    path:'/openapi/all',
    roles:['any'],
    type:'all',
    inputs:{
        name:'AOpenAPIAll',
        type:'object',
        properties:{
            project:{type:'string', title:'项目名'}
        }
    },
    returns:'MAPIDoc[]',
    logicProcess:function (inputs, args, dataAccess, callback) {
        var harr = new Array();
        //throw new Error('aasdf');
        for (var k in args.handlers) {
            var handler = args.handlers[k];
            args.createModel('MAPIDoc', {
                title:handler.title,
                path:handler.path
            }, function (err, model) {
                harr.push(model);
            });
        }
        callback(null, harr);
    }
};