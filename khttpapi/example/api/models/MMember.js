/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-7
 * Time: 下午10:27
 */
module.exports = {
    name:'MMember',
    title:'新浪会员信息',
    type:'object',
    properties:{
        id:{title:'id主键', type:'string'},
        uid:{title:'新浪用户ID', type:'string'},
        username:{title:'昵称', type:'string'},
        area:{title:'地区', type:'string[]'},
        pop_attr:{title:'达人属性', type:'string[]'},
        followed_count:{title:'粉丝数', type:'uint'},
        gender:{title:'性别', type:'string', enum:['m', 'f']},
        age:{title:'年龄', type:'string', description:'年龄的范围'},
        attributes:{title:'属性', type:'string', description:'属性'},
        source:{title:'来源', type:'string', description:'来源'},
        profession:{title:'职业', type:'string', description:'职业'},
        description:{title:'说明', type:'string', description:'说明'},
        short_link:{title:'短链接', type:'string', description:'短链接'}
    }
};