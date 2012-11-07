/**
 * Created with JetBrains WebStorm.
 * User: James
 * Date: 12-8-29
 * Time: 下午3:09
 * 描述: 提供自动处理的框架
 */
var express = require('express')
    , http = require('http')
    , path = require('path')
    , fs = require('kfs')
    , kutil = require('kutil')
    , DB = require('./db')
    , KSchema = require('kschema')
    , cluster = require('cluster')
    , numCPUs = require('os').cpus().length
    , plugin_path = path.join(__dirname, '../plugin')
    , khandler = require('./handler');

var khttpapi = module.exports = function (settings) {
    var api = {
        settings:settings,
        /**
         * 创建一个khttpapi服务
         * @param {Object} settings
         */
        createServer:function (settings) {
            var _this = this;
            _this.settings = settings;
            ensureStartArgs(_this);
            startServer(_this, function () {
                loadProject(_this);
                loadPlugin(_this);
                startExpress(_this);
            });
        },
        /**
         * 将返回值转化为json型的结果
         * @param {Object|String}err
         * @param {Object|String}data
         * @return {Object}
         */
        result:function (err, data) {
            var r = {};
            if (kutil.isNothing(err)) {
                r.success = true;
                r.data = data;
            } else {
                r.success = false;
                if (kutil.typeOf(err) === 'error') {
                    r.msg = err.message;
                } else {
                    r.msg = err;
                }
            }
            return r;
        },
        /**
         * 加载插件
         * @param {Object} plugin
         */
        plugin:function (plugin) {
            plugin.load(this);
        },
        /**
         * 保存所有的模型
         */
        models:{},
        /**
         * 保存所有的输入模型
         */
        handlers:{},
        /**
         * 添加一个输出模型
         * @param model
         */
        addModel:function (model) {
            if (kutil.isNotNothing(model)) {
                if (kutil.isNothing(this.models[model.name])) {
                    this.models[model.name] = model;
                } else {
                    throw new Error('同名的model已经存在');
                }
            } else {
                throw new Error('传入的model为空');
            }
        },
        /**
         * 添加一个handler
         * @param {Object}handler
         */
        addHandler:function (handler) {
            if (kutil.isNotNothing(handler)) {
                if (kutil.isNothing(this.handlers[handler.path])) {
                    this.handlers[handler.path] = handler;
                } else {
                    throw new Error('同名的handler已经存在');
                }
            } else {
                throw new Error('传入的handler为空');
            }
        },
        /**
         * 将models追加到项目
         * @param {String}path
         */
        appendModels:function (path) {
            console.log('装载models');
            var models = path ? KSchema.loadSchema(path) : undefined;
            kutil.copyProperties(models, this.models);
        },
        /**
         * 将handler追加到项目
         * @param path
         */
        appendHandlers:function (path) {
            var _this = this;
            if (path) {
                console.log('取得所有Handlers路径');
                var files = fs.findFilesSync(path, true);
                console.log('遍历所有handler路径并初始化');
                files.forEach(function (handlerPath) {
                    khandler.load(handlerPath, function (handler) {
                        _this.handlers[handler.path] = handler;
                    });
                });
            }
        },
        /**
         * express 插件，监听api
         * @return {Function}
         */
        apiHandle:function () {
            console.log('启用监听api插件');
            loadProject(this);
            return function (req, res, next) {
                khandler.handlerRoute(this)(req, res, next);
                khandler.accessCheck(this)(req, res, next);
                express.bodyParser()(req, res, next);
                express.cookieParser()(req, res, next);
                khandler.inputsCheck(this)(req, res, next);
                //next();
            }
        },
        /**
         * express 插件 开放doc
         * 在express中通过启用这个插件来开放api的doc页面
         * @return {Function}
         */
        openDoc:function () {
            console.log('启用开放doc插件-未实现');
            return function (req, res, next) {
                next();
            }
        }
    }
    return  api;
};

/**
 * 获得KHandler类型
 * @type {Function}
 */
khttpapi.handler = khandler;

/**
 * 获得db的实例
 * @type {Object}
 */
khttpapi.db = DB;


//确定启动参数
function ensureStartArgs(api) {
    var settings = api.settings;
    console.log('根据启动参数，修改配置');
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
        if (val === 'runMode=production') {
            settings.runMode = 'production';
        } else if (val === 'runMode=development') {
            settings.runMode = 'development';
        }
    });
    //设置express内置全局变量
    process.env.NODE_ENV = settings.runMode;
}

//启动服务
function startServer(api, fn) {
    var forkWork = function () {
        var worker = cluster.fork();
        console.log('sub process:' + worker.process.pid + ' forked');
    }
    if (api.settings.runMode === 'production' && cluster.isMaster) {
        console.log('生产模式下启动多进程，进程数：' + numCPUs)
        for (var i = 0; i < numCPUs; i++) {
            forkWork();
        }
        console.log(numCPUs + ' processes forked !');
        cluster.on('exit', function (worker, code, signal) {
            worker.destroy();
            console.log('worker ' + worker.process.pid + ' destroyed');
            forkWork();
        });
        process.on('exit', function () {
            console.log('主进程退出 ');
            for (id in cluster.workers) {
                worker.destroy();
            }
            process.exit(0);
        });
    } else {
        fn();
    }
}
//装载项目
function loadProject(api) {
    var settings = api.settings;
    console.log('装载协议--->');
    api.appendModels(path.join(settings.homeDir, settings.protocol.modelsFolder));
    api.appendHandlers(path.join(settings.homeDir, settings.protocol.handlersFolder));
}
//装载项目
function loadPlugin(api) {
    console.log('装载插件--->');
    var settings = api.settings;
    var dirs = fs.findDirsSync(plugin_path);
    dirs.forEach(function (dir) {
        api.plugin(require(dir));
    });
}

////装载文档系统
//function loadApiDoc(api) {

//}

function startExpress(api) {
    var settings = api.settings;
    //创建数据连接
    var db = new DB(settings);
    console.log('设置expressjs');
    var app = express();
    app.configure(function () {
        app.use(khandler.handlerRoute(api));
        app.use(khandler.accessCheck(api));
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(khandler.inputsCheck(api));
        app.use(khandler.logicProcess(db, api));
        app.use(function (err, req, res, next) {
            res.send(api.result(err));
        });
    });
    if (settings.runMode === 'development') {
        //开发模式下的设置
        app.configure('development', function () {
            app.use(express.errorHandler());
        });
    } else if (settings.runMode === 'production') {
        //生产模式下的设置
//        app.configure('production', function(){
//            var oneYear = 31557600000;
//            app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
//            app.use(express.errorHandler());
//        });
    }
    http.createServer(app).listen(settings.port, function () {
        console.log("Express server listening on port " + settings.port);
    });
}
