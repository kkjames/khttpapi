/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-17
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
module.exports = function (api, handler, entity) {
    //基本参数
    handler.path = handler.path + 'all';
    //输入
    handler.inputs = {
        name:'MI' + entity.name + '_all',
        title:'列出' + entity.title,
        type:'object',
        properties:{}
    };
    var model = {
        name:'MO' + entity.name + '_all',
        properties:{},
        type:'object'
    };
    for (var k in entity.properties) {
        if (entity.properties[k].filter === 1) {
            handler.inputs.properties[k] = entity.properties[k];
        }
        model.properties[k] = entity.properties[k];
    }
    api.addModel(model);
    handler.returns = model.name + '[]';
    handler.dataAccess = function (inputs, args, dataAccess, callback) {
        var selector = {};
        var queryColumns = {};
        for (var k  in entity.properties) {
            queryColumns[k] = entity.properties[k].list === 1 ? 1 : -1;
            if (entity.properties[k].filter === 1) {
                entityType[entity.properties[k].type ].buildQuery(selector, k, req);
            }
        }
        var cur = db.collection(entityName).find(selector, queryColumns);
        if (req.body.page_size && req.body.page_size > 0)
            cur.limit(req.body.page_size);
        var skip = req.body.page_start * req.body.page_start + 1;
        if (req.body.page_start && req.body.page_start > 0)
            cur.skip(req.body.page_start);

        cur.toArray(function (err, docs) {
            if (kutil.isNothing(err)) {
                memberColl.count(selector, function (err, count) {
                    callback(err, {
                        members:docs,
                        count:count
                    });
                });
            } else {
                callback(err);
            }
        });
    }
    return handler;

}