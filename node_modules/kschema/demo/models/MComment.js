/**
 * Created with JetBrains WebStorm.
 * User: james
 * Date: 12-9-7
 * Time: 上午10:10
 * To change this template use File | Settings | File Templates.
 */
module.exports = {
    name:'MComment',
    type:'object',
    description:'评论',
    properties:{
        id:{title:'ID', type:'string', required:true, description:'ID'},
        date:{title:'日期', type:'date'},
        text:{title:'内容', type:'string', required:true},
        states:{title:'状态', type:'string', enum:['1', '2', '3']}
    }
}