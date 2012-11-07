/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-22
 * Time: 下午7:45
 * To change this template use File | Settings | File Templates.
 */
var env = require('khttpapi').env
    , kopendoc = require('../kopendoc')
    , kutil = require('kutil');
module.exports = {
    title:'列出api',
    path:'/openapi/sdk/all',
    roles:['any'],
    type:'all',
    inputs:{
        name:'AOpenAPISDKAll',
        type:'object',
        properties:{
            project:{type:'string', title:'项目名', required:true}
        }
    },
    returns:'MAPISDK[]',
    logicProcess:function (inputs, args, dataAccess, callback) {
        kopendoc.generateSDK({
            models:args.models,
            entities:args.entities,
            handlers:args.handlers
        }, function (err, code) {
            var m = [];
            for (var platform in code) {
                args.createModel('MAPISDK', {
                    title:'SDK',
                    project:inputs.project,
                    platform:platform,
                    code:code[platform]
                }, function (err, model) {
                    if (kutil.isNothing(err)) {
                        m.push(model);
                    }
                })
            }
            callback(null, m);
        });
    }
};