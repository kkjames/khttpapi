/**
 * Created with JetBrains WebStorm.
 * User: james
 * Date: 12-9-5
 * Time: 下午5:32
 * 提供各种实用方法
 */
var crypto = require('crypto')
    , uuid = require('node-uuid');
var kutil = module.exports = {
    typeOf:function (o) {
        return o === undefined ? "undefined" : (o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase());
    },
    isArray:function (o) {
        return   kutil.typeOf(o) === 'array';
    },
    isMatch:function (str, reg) {
        return reg.test(str);
    },
    isNothing:function (obj) {
        return obj === null || obj === undefined;
    },
    isNotNothing:function (obj) {
        return obj !== null && obj !== undefined;
    },
    isEmpty:function (obj) {
        return kutil.isNothing(obj) || obj === '';
    },
    format:function () {
        var args = arguments;
        return args.length > 0 ? args[0].replace(/\{(\d+)\}/g, function (r, n) {
            return args[parseInt(n) + 1];
        }) : '';
    },
    hasEqualValue:function (arr1, arr2) {
        for (var i = 0; i < handler.roles; i++) {
            var role = handler.roles[i];
            if (_sf.session.passport.roles.indexOf(role) >= 0) {
                flag = true;
                break;
            }
        }
    },
    cloneArray:function (arr) {
        var newArr = new Array();
        this.copyArray(arr, newArr);
        return newArr;
    },
    copyArray:function (arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            arr2.push(arr1[i]);
        }
    },
    copyProperties:function (obj, targetObj, override) {
        for (var k in obj) {
            if (obj && (override === true || targetObj[k] === undefined)) {
                targetObj[k] = obj[k];
            }
        }
    },
    md5:function (val) {
        var md5 = crypto.createHash('md5');
        return md5.update(val).digest('base64');
    },
    createToken:function () {
        return uuid.v1();
    },
    isOn:function (obj, key) {   //判断k是否打开
        if (kutil.isNothing(obj)) {
            return false;
        } else if (kutil.isArray(obj)) {
            return obj.indexOf(key) >= 0;
        } else {
            return obj[key] === true || obj[key] === 1 || obj[key] === '1';
        }
    },
    isOff:function (obj, key) {   //判断k是否关闭
        return !kutil.isOn(obj, key);
    },
    is:function (obj, type) {
        var tp = obj;
        while (this.isNotNothing(tp)) {
            if (tp === type) {
                return true;
            }
            tp = tp.__proto__;
        }
        return false;
    }
}