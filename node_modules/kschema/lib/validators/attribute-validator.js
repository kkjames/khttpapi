/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-4
 * Time: 下午11:15
 */

var kutil = require('kutil');
var validators = module.exports = {
    max:{
        check:function (num, max) {
            var number = parseFloat(num);
            return isNaN(number) || number <= max;
        },
        message:'{0}的值不能大于{2}'
    },

    min:{
        check:function (num, min) {
            var number = parseFloat(num);
            return isNaN(number) || number >= min;
        },
        message:'{0}的值不能小于{2}'
    },

    maxlen:{
        check:function (str, max) {
            return  str.length <= max;
        },
        message:'{0}的长度不能大于{2}'
    },

    minlen:{
        check:function (str, min) {
            return  str.length >= min;
        },
        message:'{0}的长度不能小于{2}'
    },

    pattern:{
        check:function (str, pattern) {
            return kutil.isMatch(str, pattern);
        },
        message:'{0}的格式有误'
    },

    in:{
        check:function (instance, options) {
            var validOptions = options && typeof options.indexOf === 'function';
            return validOptions && ~options.indexOf(instance);
        },
        message:'{1}不是可接受的值'
    },

    notin:{
        check:function (instance, options) {
            var validOptions = options && typeof options.indexOf === 'function';
            return validOptions && options.indexOf(instance) === -1;
        },
        message:'{1}不是可接受的值'
    }
};