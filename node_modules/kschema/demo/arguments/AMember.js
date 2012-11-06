/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-14
 * Time: 下午4:13
 */
module.exports = {
    name:'AMember',
    type:'model',
    schema:{
        title:'会员筛选信息',
        type:'object',
        properties:{
            keyword:{title:'关键字', type:'string'},
            uid:{title:'新浪用户ID', type:'string'},
            area:{title:'地区', type:'string'},
            pop_attr:{title:'达人属性', type:'string[]'},
            followed_min:{title:'最小粉丝数', type:'uint'},
            followed_max:{title:'最大粉丝数', type:'uint'},
            gender:{title:'性别', type:'string', enum:['m', 'f']},
            age:{title:'年龄', type:'string', description:'年龄的范围'}
        }
    }
};