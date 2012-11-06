/**
 * created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-8-30
 * Time: 下午5:20
 * 提供可定义的json对象的结构，利用此结构可以对json对象进行验证
 */
var kutil = require('kutil')
    , messages = require('./validators/messages')
    , typePattern = /^(\w+)(\[\])?$/
    , kfs = require('kfs')
    , baseSchema = require('./base-schema');
var kschema = module.exports = function (json) {
    if (kschema.isSchema(json)) {
        return json;
    }
    return initSchema(json);
};
kschema.isSchema = function (json) {
    return kutil.is(json, baseSchema);
}
/**
 * 保存所有的schemas
 * @type {Object}
 */
kschema.schemas = baseSchema.schemas;
/**
 * schema的验证方法
 * 使用schema对instance进行验证
 * breakOnFirstError为true的情况下验证遇到第一个错误就会退出
 * @param {Object} instance
 * @param {Object} schema
 * @param {Boolean} [breakOnFirstError]
 * @return {String|Array}
 */
kschema.validate = function (instance, schema, breakOnFirstError) {
    return kschema(schema).validate(instance, breakOnFirstError);
};
/**
 * schema创建实例的方法
 * instance作为参数，创建符合schema的方法
 * 此方法是异步的
 * 如果出错则callback的第一个参数传回错误
 * @param {Object} instance
 * @param {Object} schema
 * @param {Function} callback
 */
kschema.create = function (instance, schema, callback) {
    kschema(schema).create(instance, callback);
};

/**
 * 装载某个目录下的所有Schema
 * @param {String} folder
 * @return {Object}
 */
kschema.loadSchema = function (folder) {
    var files = kfs.findFilesSync(folder, true, '.js');
    var schemas = {};
    //遍历所有路径并初始化schema
    files.forEach(function (modelFolder) {
        var t = kschema(require(modelFolder));
        if (kutil.isNotNothing(t)) {
            schemas[t.name] = t;
        }
    });
    return schemas;
};
/**
 * 添加一个Schema到系统中
 * @param {Object} schema
 */
kschema.addSchema = function (schema) {
    if (kutil.isNotNothing(kschema.schemas[schema.name])) {
        throw new Error('同名的schema已存在');
    }
    kschema.schemas[schema.name] = schema;
}

//私有方法------------------------



//遍历schema，不会遍历关联schema
function eachSchema(schema, callback) {
    if (callback(schema) === false) {
        return false;
    }
    if (schema.type === 'array') {
        //如果是array类型则检测itemSchema
        if (eachSchema(schema.itemSchema, callback) === false) {
            return false;
        }
    } else if (schema.type === 'object' && kutil.isNotNothing(schema.properties)) {

        //如果是object形，则进行递归
        for (var k in schema.properties) {
            if (eachSchema(schema.properties[k], callback) === false) {
                return false;
            }
        }

    }
}

//初始化schema
function initSchema(schema) {
    if (kutil.isNothing(schema.name)) {
        throw new Error('schema必须有一个名称');
    }
    eachSchema(schema, function (scma) {
        if (kutil.isNothing(scma)) {
            throw new Error('输入的schema不能为空');
        }
        //console.log(scma.type);
        var r = typePattern.exec(scma.type);
        if (kutil.isNothing(r)) {
            throw new Error('Schema定义错误，type的格式有误:' + scma.type);
        }
        //对数组形类型进行解析
        if (r[2] === '[]') {
            scma.type = 'array';
            scma.itemSchema = {type:r[1], title:scma.title};
        }
    });
    schema.__proto__ = baseSchema;
    kschema.addSchema(schema);
    return schema;
}
//
//function setOutType(schema, typeName) {
//    if (kschema.schemas[typeName]) {
//        schema.out_type = typeName;
//        schema.type = 'object';
//    }
//}