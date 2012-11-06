/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-4
 * Time: 下午9:48
 */
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-8-30
 * Time: 下午5:20
 */
var path = require('path');
var kschema = require('kschema');
kschema.loadSchema(path.join(__dirname, 'models'));

var article = {
    id:'sdf',
    text:'sadf',
    date:'2222-2-1',
    order:{
        count:1,
        date:'2012-08-19'
    },
    user:{
        id:'sdf',
        username:'jason3',
        email:'ads@sd.f',
        address:{
            country:'7',
            province:'s'
        },
        page:{
            limit:12
        }
    },
    comments:[
        {
            id:'sdf',
            text:'sdff'
        },
        {
            id:'1',
            text:'2'
        },
        {
            id:'1',
            text:'23'
        }
    ], category:[2, 3]
};

var errors = kschema.schemas.MArticle.validate(article);
console.log(errors);

//schemas.MArticle.Each(article, function () {

//});
//var begin = new Date().getTime();
//for (var i = 0; i < 100; i++) {
//    var article1 = schemas.MArticle.Create(article);
//}
//var end = new Date().getTime();
//console.log(end - begin);
//
//console.log(article1);

kschema.schemas.MArticle.create(article, function (err, atrl) {
    console.log(err);
    console.log(atrl);
});


//利用schema验证并创建对象，加性能测试

//for (var j = 0; j < 10; j++) {
//    var begin = new Date().getTime();
//    for (var i = 0; i < 10000; i++) {
//        kschema.schemas.MArticle.create(article, function (err, atrl) {
//            //console.log(err);
//            //console.log(atrl);
//        });
//    }
//    var end = new Date().getTime();
//    console.log(end - begin);
//}

