/**
 * Created with JetBrains WebStorm.
 * User: james
 * Date: 12-9-7
 * Time: 上午9:59
 * To change this template use File | Settings | File Templates.
 */
module.exports = {
    name:'MUser',
    type:'object',
    title:'用户',
    properties:{
        id:{title:'ID', type:'string', required:true, description:'ID'},
        username:{title:'用户名', type:'string', maxlen:50, minlen:6, pattern:/^\w+$/, required:true, description:'标题'},
        age:{title:'年龄', type:'int', max:150, min:10, default:20, description:'年龄'},
        gender:{title:'性别', type:'string', enum:['f', 'm']},
        email:{title:'邮箱', type:'email', required:true},
        birthday:{title:'生日', type:'date'},
        password:{title:'密码', type:'password', description:'密码'},
        address:{
            title:'地址',
            type:'object',
            properties:{
                country:{type:'string', required:true, description:'国家'},
                province:{type:'string', required:true}
            }
        },
        page:{
            type:'object',
            title:'页面',
            properties:{
                limit:{title:'limit', type:'uint'},
                skip:{title:'skip', type:'uint'}
            }
        }
    }
}