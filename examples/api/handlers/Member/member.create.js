/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-7
 * Time: 下午10:40
 */
module.exports = {
    title:'创建一个会员信息',
    path:'/member/create',
    roles:['gm'],
    type:'create',
    inputs:{
        name:'AMemberCreate',
        title:'新建会员信息',
        type:'object',
        properties:{
            uid:{title:'新浪用户ID', type:'string', required:true},
            username:{title:'昵称', type:'string'},
            area:{title:'地区', type:'string[]'},
            pop_attr:{title:'达人属性', type:'string[]'},
            followed_count:{title:'粉丝数', type:'uint'},
            gender:{title:'性别', type:'string', enum:['m', 'f']},
            age:{title:'年龄', type:'string', description:'年龄的范围'},
            attributes:{title:'属性', type:'string', description:'属性'},
            source:{title:'来源', type:'string', description:'来源'},
            profession:{title:'职业', type:'string', description:'职业'},
            description:{title:'说明', type:'string', description:'说明'}
        }
    },
    returns:'MMember',
    dataAccess:function (inputs, db, args, callback) {
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
    }
};