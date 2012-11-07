/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-22
 * Time: 下午7:56
 * To change this template use File | Settings | File Templates.
 */
module.exports = {
    name:'MAPISDK',
    title:'api接口的SDK',
    type:'object',
    properties:{
        title:{title:'SDK名称', type:'string'},
        project:{title:'项目', type:'string'},
        platform:{title:'平台', type:'string'},
        code:{title:'代码', type:'any'}
    }
};