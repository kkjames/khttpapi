/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-14
 * Time: 下午4:13
 */
var path = require('path');
var KSchema = require('../');
var aMember = new KSchema('aMember', require('./AMember').schema);

var inputs = {
    keyword:'asdf'
}

var errors = aMember.create(inputs);
console.log(errors);