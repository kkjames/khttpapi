/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-23
 * Time: 下午9:11
 * To change this template use File | Settings | File Templates.
 */
module.exports = {
    name:'user_info',
    title:'用户信息',
    type:'object',
    properties:{
        username:{type:'string', title:'用户名', required:true},
        password:{type:'string', title:'密码', required:true},
        email:{type:'string', title:'邮箱'},
        roles:{type:'string[]', title:'角色'}
    }
}