/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-20
 * Time: 下午11:19
 * To change this template use File | Settings | File Templates.
 */
var kutil = require('kutil');
module.exports = {
    title:'导入会员信息',
    path:'/member/import',
    roles:['gm'],
    type:'json',
    inputs:{
        name:'AMemberImport',
        type:'object',
        properties:{
            members:{type:'any', title:'用户列表', required:true}
        }
    },
    returns:'bool',
    dataAccess:function (inputs, db, args, callback) {
        if (kutil.typeOf(inputs.members) === 'array') {
            console.log('将要导入的记录数' + inputs.members.length);
            console.log(inputs.members[50000]);
            var collection = db.collection('member');
            inputs.members.forEach(function (data) {
                process.nextTick(function () {
                    collection.insert(data);
                });
            });
            callback(null, true);
        } else {
            console.log('错误')
            callback(new Error('输入数据必须是一个数组'));
        }
    }
};