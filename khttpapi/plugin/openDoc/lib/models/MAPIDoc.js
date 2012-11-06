/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-17
 * Time: 下午4:19
 */
module.exports = {
    name:'MAPIDoc',
    title:'api接口',
    type:'object',
    properties:{
        title:{title:'接口名', type:'string'},
        path:{title:'路径', type:'string', required:true},
        roles:{title:'角色', type:'string[]'},
        inputs:{title:'输入', type:'any'},
        returns:{title:'路径', type:'any'},
        httpMethods:{title:'http请求方式', type:'string[]'}
    }
};