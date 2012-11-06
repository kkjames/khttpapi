/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-12
 * Time: 下午2:19
 * To change this template use File | Settings | File Templates.
 */
require('.');
var handler = khandler.create('/article/create');
var MMember = require('./MMember')
handler.title('创建一个会员信息').roles(['gm']).addRole('any').removeRole('gm').type('create').returns(MMember);
handler.inputs.name('AMemberCreate').title('新建会员信息').addProperty('uid', {
    title:'新浪用户ID', type:'string', required:true
}).addProperty('username', {
        title:'昵称', type:'string'
    }).removeProperty('username');
handler.dataAccess(function (inputs, db, args, callback) {
    console.log('创建实体');
    args.createEntity('member', {
        uid:inputs.uid,
        username:inputs.username,
        area:inputs.area,
        pop_attr:inputs.pop_attr,
        followed_count:inputs.followed_count,
        gender:inputs.gender,
        age:inputs.age,
        attributes:inputs.attributes,
        source:inputs.source,
        profession:inputs.profession,
        description:inputs.description,
        short_link:inputs.short_link
    }, function (err, entity) {
        if (err) {
            callback(err);
        } else {
            console.log('插入实体');
            db.collection('member').save(entity, function (err, item) {
                callback(err, item);
            });
        }
    });
});
module.exports = handler;