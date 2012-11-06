/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-4
 * Time: 下午9:47
 */
var kutil = require('kutil');
var typeValidators = module.exports = {

    "object":{
        check:function (instance) {
            return kutil.typeOf(instance) === "object";
        },
        message:'{0}的类型不正确'
    },

    "array":{
        check:function (instance) {
            return kutil.typeOf(instance) === "array";
        },
        message:'{0}的类型不正确'
    },

    "string":{
        check:function (instance) {
            return kutil.typeOf(instance) === "string";
        },
        message:'{0}的类型不正确'
    },

    "float":{
        check:function (instance) {
            return kutil.typeOf(instance) === "number";
        },
        message:'{0}的类型不正确'
    },

    "int":{
        check:function (instance) {
            return kutil.typeOf(instance) === "number" && instance % 1 === 0;
        },
        message:'{0}的类型不正确'
    },

    "digits":{
        check:function (instance) {
            return /^\d+$/.test(instance);
        },
        message:'{0}的类型不正确'
    },

    "unit":{
        check:function (instance) {
            return kutil.typeOf(instance) === "number" && instance % 1 === 0 && instance >= 0;
        },
        message:'{0}的类型不正确'
    },

    "bool":{
        check:function (instance) {
            return kutil.typeOf(instance) === "boolean";
        },
        message:'{0}的类型不正确'
    },

    "null":{
        check:function (instance) {
            return kutil.typeOf(instance) === "null";
        },
        message:'{0}的类型不正确'
    },

    "any":{
        check:function (instance) {
            return true;
        },
        message:'{0}的类型不正确'
    },
    "email":{
        check:function (instance) {
            var reg = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
            return kutil.isMatch(instance, reg);
        },
        message:'{0}的格式错误，应如:name@keaku.com'
    },

    "date":{
        check:function (instance) {
            var intDate = Date.parse(instance);
            return !isNaN(intDate);
        },
        message:'{0}的格式错误,应如:2012-01-01'
    },

    "url":{
        check:function (instance) {
            var reg = /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?(localhost|(?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,="'\(\)_\*]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i;
            return kutil.isMatch(instance, reg);
        },
        message:'{0}的格式错误,请输入有效的URL'
    },

    "zip":{
        check:function (instance) {
            return kutil.isMatch(instance, /^\d{6}$/);
        },
        message:'{0}的格式错误,应如:200123'
    },

    "phone":{
        check:function (instance) {
            return kutil.isMatch(instance, /^(\d{1,4}\-?){0,2}\d{7,8}$/);
        },
        message:'{0}的格式错误,应如:021-12345678'
    },

    "mobile":{
        check:function (instance) {
            return  kutil.isMatch(instance, /^1\d{10}$/);
        },
        message:'{0}的格式错误,应如:13900000000'
    },

    "password":{
        check:function (instance) {
            return  kutil.isMatch(instance, /^[\d\w\`\~\!\@\#\$\%\^\&\*\(\)\{\}\[\]\|\\\/\.\,\>\<\'\;\"\:\-\=\_\+]+$/);
        },
        message:'{0}的格式错误'
    }
};