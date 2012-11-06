/**
 * Created with JetBrains WebStorm.
 * User: james
 * Date: 12-9-5
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */
module.exports = {
    name:'MArticle',
    type:'object',
    title:'文章',
    properties:{
        id:{title:'ID', type:'string', required:true, description:'ID'},
        text:{title:'内容', type:'string', required:true},
        date:{title:'日期', type:'date' },
        score:{title:'分数', type:'int', default:0},
        user:{title:'作者', type:'MUser', required:true},
        comments:{title:'评论', type:'MComment[]', required:true},
        order:{
            title:'订单', type:'object', required:true,
            properties:{
                count:{title:'数量', type:'int', required:true},
                date:{title:'下单时间', type:'date', required:true}
            }
        },
        category:{title:'分类', type:'int[]', required:true}
    }
}