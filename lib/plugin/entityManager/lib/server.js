/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-15
 * Time: 上午10:44
 * To change this template use File | Settings | File Templates.
 */
var db = require('khttpapi').db,
    entityType = require('./entityType')
    , kutil = require('kutil')
    , kentitymanager = module.parent.exports;
module.exports = {
    load:function (api) {
        for (var k in api.entities) {
            var entity = api.entities[k];
            if (kutil.isNotNothing(entity)) {
                if (kutil.isNotNothing(entity.attr)) {
                    //create
                    if (entity.attr.create === 1) {
                        api.addHandler(require('./entity_handlers/create')(api, createBaseHandler(entity), entity));
                    }
                    //destroy
                    if (entity.attr.destroy === 1) {
                        api.addHandler(require('./entity_handlers/destroy')(api, createBaseHandler(entity), entity));
                    }
                    //update
                    if (entity.attr.update === 1) {
                        api.addHandler(require('./entity_handlers/update')(api, createBaseHandler(entity), entity));
                    }
                    //all
                    if (entity.attr.all === 1) {
                        api.addHandler(require('./entity_handlers/all')(api, createBaseHandler(entity), entity));
                    }
                    //show
                    if (entity.attr.show === 1) {
                        api.addHandler(require('./entity_handlers/show')(api, createBaseHandler(entity), entity));
                    }
                }
            } else {
                throw new Error('entity为空');
            }
        }
    }
};


function createBaseHandler(entity) {
    return {
        title:entity.title,
        path:kentitymanager.getBasePath(entity),
        roles:entity.roles,
        dataAccess:function (inputs, args, dataAccess, callback) {
            callback(null, new ExtModel(entity));
        }
    };
}