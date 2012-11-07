Sorry,Not Finished! Coming soon!
 Easy and Fast to build a lightweight,Full-featured http-api server from mobile,ajax apps. Base on express web framework.

#modify express app.js
```js

var khttpapi = require('.');  // <-declare
//express code
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(khttpapi.apiHandle());  // <-handle
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

```
#define a handler
```js
{
    title:'更新一个会员信息',
    path:'/member/update',
    roles:['gm'],
    type:'update',
    inputs:{
        name:'AMemberUpdate',
        title:'修改会员信息',
        type:'object',
        properties:{
            id:{title:'_ID', type:'string', required:true},
            uid:{title:'新浪用户ID', type:'string', required:true},
            name:{title:'昵称', type:'string'},
        }
    },
    returns:'MMember',
    dataAccess:function (inputs, db, args, callback) {
        console.log('创建实体');
        args.createEntity('member', {
            uid:inputs.uid,
            username:inputs.username,
            area:inputs.area,
            pop_attr:inputs.pop_attr,
            followed_count:inputs.followed_count,
            gender:inputs.gender,
            age:inputs.age,
            attributes:inputs.attributes,
            source:inputs.source,
            profession:inputs.profession,
            description:inputs.description,
            short_link:inputs.short_link
        }, function (err, entity) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                console.log('更新实体');
                db.collection('member').updateById(inputs.id, entity, {safe:true}, function (err) {
                    console.log(err);
                    callback(err);
                });
            }
        });
    }
}
```
 #define a model
```js
{
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
}
```
## License 
MIT