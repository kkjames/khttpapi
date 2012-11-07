#Not finished!

Sorry,this project is not finished! Coming soon!
Easy and Fast to build a lightweight,Full-featured http-api server from mobile,ajax apps. Base on express web framework.
在express基础上，简单快速的架设一个轻量，全功能的http-api服务器，适用于移动或ajax应用。
#Modify express app.js  修改express的app.js
Lossless plugin.
无损插件，不破坏原有结构
```js

var khttpapi = require('khttpapi');  // <-Here! declare 声明
//express code
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(khttpapi.apiHandle());  // <-Here! handle 处理api请求，就这么多。
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

```
#Define a model 定义一个模型

```js
{
    name:'MMember',
    title:'Member Info',
    type:'object',
    properties:{
        id:{type:'string'},
        username:{title:'Name', type:'string'},
        age:{title:'Name', type:'uint',min:17,max:40},
        tags:{title:'Tag', type:'string[]'}
    }
}
```

#Define a handler 定义一个处理器

```js
{
    path:'/member/all',
    type:'all',
    inputs:{
        properties:{
            id:{title:'_ID', type:'string', required:true},
            name:{title:'name', type:'string'},
        }
    },
    returns:'MMember',
    dataAccess:function (dataAccessArgs, callback) {
        var inputs=dataAccessArgs.inputs
        dataAccessArgs.db.Member.find({name:}, entity, function(err,members) {
            callback(err,members);
        });
    }
}
```
Receive A File
接受上传文件
```js
{
    path:'/file/upload',
    type:'file',
    dataAccess:function (dataAccessArgs, callback) {
        //dataAccessArgs.files
    }
}
```
#访问权限控制
```js
{
    path:'/member/create',
    roles:['gm'],
    type:'create',
    dataAccess:function (dataAccessArgs, callback) {
        //data access code
    }
}
```
#输入完整性检测
```js
api.inputs({
   properties:{
       id:{title:'_ID', type:'string', required:true},
       name:{title:'name', type:'string'},
   }
});
//or
{
    path:'/member/create',
    type:'create',
    inputs:{
        properties:{
            id:{title:'_ID', type:'string', required:true},
            name:{title:'name', type:'string'},
        }
    },
    dataAccess:function (dataAccessArgs, callback) {
        //data access code
    }
}
```
#OAUTH
```js
api.oauth(true);
//or
{
    oauth:true
}
```
#API文档生成
```js
api.openDoc(true);
//or
{
    open:{
        doc:true
    }
}
```
#SDK生成
```js
api.openSDK(true);
//or
{
    open:{
        sdk:true
    }
}
```

#动态管理Handler
```js
api.manageHandler(true);
{
    manageHandler:{
        sdk:true
    }
}
```
## License 
MIT