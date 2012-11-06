/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-7
 * Time: 上午8:41
 * 未使用，改进中
 */
var SchemaSchema = module.exports = {
    title:'Schema的Schema',
    type:'object',
    properties:{
        type:{type:'string', required:true, title:'类型'},
        properties:{
            title:'所有属性',
            type:'object',
            properties:{

            }
        }
    }
}