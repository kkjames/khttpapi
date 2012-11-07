/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-15
 * Time: 上午11:13
 */
var mongoskin = require("mongoskin");
var db = module.exports = function (settings) {
    if (settings.runMode === 'production') {
        return mongoskin.db(settings.db.default.user + ':'
            + settings.db.default.pw + '@' + settings.db.default.host
            + ':' + settings.db.default.port + '/' + settings.db.default.name);
    } else {
        return mongoskin.db(settings.db.default.host + ':27017/' + settings.db.default.name);
    }
    // return  mongoskin.db(settings.dbHost, { database:settings.dbName });
}


