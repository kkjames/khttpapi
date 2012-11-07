/**
 * Created with JetBrains WebStorm.
 * User: james
 * Date: 12-9-12
 * Time: 上午9:23
 * To change this template use File | Settings | File Templates.
 */

var handler_define = require('./handler_define');
var processors = module.exports = {
    all:function (handler) {
        handler.httpMethods = ['post', 'get'];
    },
    show:function (handler) {
        if (!handler.inputs) {
            handler.inputs = handler_define.id_arguments;
        }
        handler.httpMethods = ['post', 'get'];
    },
    update:function (handler) {
        handler.httpMethods = ['post'];
    },
    create:function (handler) {
        handler.httpMethods = ['post'];
    },
    destroy:function (handler) {
        handler.httpMethods = ['post', 'get'];
        handler.inputs = handler_define.id_arguments;
    },
    lock:function (handler) {
        handler.httpMethods = ['post', 'get'];
        handler.inputs = handler_define.id_arguments;
    },
    unlock:function (handler) {
        handler.httpMethods = ['post', 'get'];
        handler.inputs = handler_define.id_arguments;
    },
    attr:function (handler) {
        handler.httpMethods = ['post', 'get'];
        handler.inputs = handler_define.id_arguments;
    },
    file:function (handler) {
        handler.httpMethods = ['post'];
//        app.post(handler.path, function (err, req, res, next) {
//            var file = req.files.file;
//            var id = kFs.createFileID();
//            var targetPath = fs.getTargetPath(id);
//            kFs.moveFile(file.path, targetPath);
//        });
    },
    json:function (handler) {
        handler.httpMethods = ['post'];
    }
}