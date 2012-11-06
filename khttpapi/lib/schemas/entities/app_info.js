/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-23
 * Time: 下午9:10
 * To change this template use File | Settings | File Templates.
 */
module.exports = {
    name:'app_info',
    title:'应用信息',
    type:'object',
    properties:{
        app_key:{type:'string', title:'APPKey', required:true},
        app_code:{type:'string', title:'APPCode', required:true},
        app_name:{type:'string', title:'APP名称', required:true},
        user:{type:'string', title:'用户', description:'用户的ID'}
    }
}