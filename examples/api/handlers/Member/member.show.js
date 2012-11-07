/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-7
 * Time: 下午10:38
 */
module.exports = {
    title:'获取一个会员信息',
    path:'/member/show',
    roles:['gm'],
    type:'show',
    returns:'MMember',
    dataAccess:function (inputs, db, args, callback) {
        //console.log('id是' + inputs.id);
        db.collection('member').findById(inputs.id, function (err, entity) {
            if (entity) {
                args.createModel('MMember', {
                    id:entity._id,
                    uid:entity.uid,
                    nickname:entity.nickname,
                    area:entity.area,
                    pop_attr:entity.pop_attr,
                    followed_count:entity.followed_count,
                    gender:entity.gender,
                    age:entity.age,
                    attributes:inputs.attributes,
                    source:inputs.source,
                    profession:inputs.profession,
                    description:inputs.description,
                    short_link:inputs.short_link
                }, function (err, model) {
                    callback(err, model);
                });
            } else {
                callback(new Error('没有找到对应的实体'));
            }
        });
    }
};