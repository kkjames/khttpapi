/**
 * Created with JetBrains WebStorm.
 * User: zhanganle
 * Date: 12-10-16
 * Time: 下午1:20
 * To change this template use File | Settings | File Templates.
 */
module.exports = {
    int:{
        xtype:"numberfield",
        buildQuery:function (selector, k, req) {
            selector[k]['$lte'] = parseInt(req.body['end' + k]);
            selector[k]['$gte'] = parseInt(req.body['start_' + k]);
        }
    },
    string:{
        xtype:"textfield",
        buildQuery:function (selector, k, req) {
            selector[k] = req.body[k];
        }
    },
    date:{
        xtype:"datefield",
        buildQuery:function (selector, k, req) {
            selector[k]['$lte'] = req.body['end' + k];
            selector[k]['$gte'] = req.body['start_' + k];
        }
    },
    keyWord:{
        xtype:'textfield',
        buildQuery:function (selector, k, req) {
            selector[k] = new RegExp('^.*' + req.body[k] + '.*$', 'i');
        }
    },
    default:{
        xtype:"textfield",
        buildQuery:function (selector, k, req) {
            selector[k] = req.body[k];
        }
    }
};
