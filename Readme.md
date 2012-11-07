#Not finished!

Sorry,this project is not finished! Coming soon!
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
#define a model

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

#define a handler

```js
{
    title:'Update a member',
    path:'/member/update',
    roles:['gm'],
    type:'update',
    inputs:{
        name:'AMemberUpdate',
        title:'Update a member',
        type:'object',
        properties:{
            id:{title:'_ID', type:'string', required:true},
            name:{title:'name', type:'string'},
        }
    },
    returns:'MMember',
    dataAccess:function (inputs, db, args, callback) {
        args.createEntity('member', {
            username:inputs.name,
        }, function (err, entity) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                db.collection('member').updateById(inputs.id, entity, {safe:true}, function (err) {
                    console.log(err);
                    callback(err);
                });
            }
        });
    }
}
```

## License 
MIT