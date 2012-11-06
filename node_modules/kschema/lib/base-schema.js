/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-21
 * Time: 下午10:33
 * To change this template use File | Settings | File Templates.
 */

var kutil = require('kutil')
    , messages = require('./validators/messages')
    , typeValidator = require('./validators/type-validator')
    , attributeValidator = require('./validators/attribute-validator');

var baseSchema = module.exports = {
    /**
     * schema的验证方法
     * 使用schema对instance进行验证
     * breakOnFirstError为true的情况下验证遇到第一个错误就会退出
     * @param {Object} instance
     * @param {Boolean} [breakOnFirstError]
     * @return {String|Array}
     */
    validate:function (instance, breakOnFirstError) {
        if (breakOnFirstError === true) {
            var error;
            eachValidate(instance, this, function (err) {
                if (kutil.isNotNothing(err)) {
                    error = err;
                    return false;
                }
            });
            return error;
        } else {
            var errors = new Array();
            eachValidate(instance, this, function (err) {
                if (err) errors.push(err);
            });
            return errors.length > 0 ? errors : null;
        }
    },
    /**
     * schema创建实例的方法
     * instance作为参数，创建符合schema的方法
     * 此方法是异步的
     * 如果出错则callback的第一个参数传回错误
     * @param {Object} instance
     * @param {Function} callback
     */
    create:function (instance, callback) {
        var result
            , error = null
            , objContainer = {};//一个对象容器，保存过程对象
        eachValidate(instance, this, function (err, val, scma, degree, key) {
            //console.log(degree);
            if (kutil.isNotNothing(err)) {
                error = err;
                result = null;
                return false;
            }
            var obj = objContainer[degree];
            if (degree === 0) {
                objContainer[degree + 1] = result = {};
            } else if (baseSchema.getType(scma.type) === 'object') {
                objContainer[degree + 1] = obj[key] = {};
            } else if (scma.type === 'array') {
                //console.log(key);
                objContainer[degree + 1] = obj[key] = [];
            } else {
                //console.log(scma.type);
                //console.log(degree);
                obj[key] = val;
            }
        });
        callback(error, result);
    }
}


function eachValidate(instance, schema, callback) {
    eachInstance(instance, schema, function (val, scma, degree, key) {
        //是否为空
        if (kutil.isEmpty(val)) {
            if (scma.required) {
                if (callbackFailed(messages.required, val, scma, degree, key, true, callback) === false) {
                    return false;
                }
            }
            return;
        }
        //检查类型
        var checker = typeValidator[scma.type];
        if (checker) {
            if (!checker.check(val)) {
                if (callbackFailed(checker.message, val, scma, degree, key, scma.type, callback) === false) {
                    return false;
                }
                return;
            }
        }
        //检查其他属性
        for (var k in scma) {
            if (k === 'required' || k === 'type')continue;
            var ruleVal = scma[k];
            var checker = attributeValidator[k];
            if (checker && !checker.check(val, ruleVal)) {
                if (callbackFailed(checker.message, val, scma, degree, key, ruleVal, callback) === false) {
                    return false;
                }
                return;
            }
        }
        callback(null, val, scma, degree, key);
    });
}

function callbackFailed(message, val, schema, degree, key, ruleVal, callback) {
    return callback({
        property:key,
        message:kutil.format(message, schema.title, val, ruleVal)
    }, val, schema, degree, key);
}

//通过schema遍历实例
function eachInstance(instance, schema, callback, degree, key) {   //遍历schema并进行初始化
    degree = degree === undefined ? 0 : degree + 1;
    if (callback(instance, schema, degree, key) === false) {
        return false;
    }
    if (kutil.isNothing(instance)) {
        return;
    }
    if (schema.type === 'array') {
        for (var i = 0; i < instance.length; i++) {
            //如果是array类型则检测itemSchema
            if (eachInstance(instance[i], schema.itemSchema, callback, degree, i) === false) {
                return false;
            }
        }
    } else {
        //检测是否外接类型
        var s = baseSchema.schemas[schema.type];
        if (kutil.isNotNothing(s)) {
            schema = s;
        }
        //递归object对象
        if (schema.type === 'object' && kutil.isNotNothing(schema.properties)) {
            for (var k in schema.properties) {
                if (eachInstance(instance[k], schema.properties[k], callback, degree, k) === false) {
                    return false;
                }
            }
        }
    }
}
/**
 * 保存所有的schemas
 * @type {Object}
 */
baseSchema.schemas = {};
/**
 * 获得真正的类型名
 * @param {String} typeName
 */
baseSchema.getType = function (typeName) {
    var t = this.schemas[typeName];
    if (kutil.isNothing(t)) {
        return typeName;
    } else {
        return t.type;
    }
}