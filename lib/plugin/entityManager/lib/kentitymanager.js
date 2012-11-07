/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-15
 * Time: 上午10:43
 * To change this template use File | Settings | File Templates.
 */

module.exports = {
    dependence:[ 'entity' ],
    load:function (api) {
        require('./client').load(api);
        require('./server').load(api);
    },
    getBasePath:function (entity) {
        return '/admin_manage/' + entity.name + '/';
    }
}