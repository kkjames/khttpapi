/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-7
 * Time: 下午10:40
 */
var kutil = require('kutil');
module.exports = {
    title:'列出会员信息',
    path:'/member/all',
    roles:['gm', 'any'],
    level:'super',
    type:'all',
    inputs:{
        name:'AMember',
        title:'会员筛选信息',
        type:'object',
        properties:{
            uid:{title:'微博用户UID', type:'string'},
            keyword:{title:'关键字', type:'string'},
            area:{title:'地区', type:'string'},
            pop_attr:{title:'达人属性', type:'string[]'},
            followed_min:{title:'最小粉丝数', type:'uint'},
            followed_max:{title:'最大粉丝数', type:'uint'},
            gender:{title:'性别', type:'string', enum:['m', 'f']},
            age:{title:'年龄', type:'string', description:'年龄的范围'},
            attributes:{title:'属性', type:'string', description:'属性'},
            source:{title:'来源', type:'string', description:'来源'},
            profession:{title:'职业', type:'string', description:'职业'},
            description:{title:'说明', type:'string', description:'说明'},
            page_start:{title:'开始位置', type:'uint', description:'开始位置', default:1},
            page_size:{title:'每页显示数据量', type:'uint', description:'每页显示数据量', default:20}
        }
    },
    returns:'MMember[]',
    dataAccess:function (inputs, db, args, callback) {
        var selector = {};
        if (inputs.uid)
            selector.uid = inputs.uid;
        if (inputs.pop_attr)
            selector.pop_attr = inputs.pop_attr;
        if (inputs.age)
            selector.age = inputs.age;
        if (inputs.area)
            selector.area = inputs.area;
        if (inputs.keyword)
            selector.username = new RegExp('^.*' + inputs.keyword + '.*$', 'i');
        if (inputs.followed_max || inputs.followed_min)
            selector.followed_count = {};
        if (inputs.followed_max)
            selector.followed_count['$lte'] = parseInt(inputs.followed_max);
        if (inputs.followed_min)
            selector.followed_count['$gte'] = parseInt(inputs.followed_min);
        if (inputs.gender)
            selector.gender = inputs.gender;
        if (inputs.attributes)
            selector.attributes = inputs.attributes;
        if (inputs.source)
            selector.source = inputs.source;
        if (inputs.profession)
            selector.profession = inputs.profession;
        if (inputs.description)
            selector.description = inputs.description;

        var memberColl = db.collection('member');
        var cur = memberColl.find(selector);

        if (inputs.page_size && inputs.page_size > 0)
            cur.limit(inputs.page_size);
        if (inputs.page_start && inputs.page_start > 0)
            cur.skip(inputs.page_start);

        cur.toArray(function (err, docs) {
            if (kutil.isNothing(err)) {
                memberColl.count(selector, function (err, count) {
                    callback(err, {
                        members:docs,
                        count:count
                    });
                });
            } else {
                callback(err);
            }

        });
    }
}
;