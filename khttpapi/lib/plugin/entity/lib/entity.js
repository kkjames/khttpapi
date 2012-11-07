/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-16
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
var path = require('path'),
    kschema = require('kschema'),
    kutil = require('kutil');
module.exports = {
    load:function (api) {
        console.log('装载entities');
        var entitiesPath = (path.join(api.settings.homeDir, api.settings.protocol.entitiesFolder));
        api.entities = kschema.loadSchema(entitiesPath);
    }
}