/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-22
 * Time: 上午8:02
 * To change this template use File | Settings | File Templates.
 */
var ejs = require('ejs')
    , fs = require('kfs')
    , path = require('path')
    , templatesFolder = 'templates';
var generator = module.exports = {
    gen:function (protocol, fn) {
        var templatePath = path.join(__dirname, templatesFolder);
        var dirs = fs.findDirsSync(templatePath);
        var code = {};
        dirs.forEach(function (dirPath) {
            console.log('sdk模板目录:'+dirPath);
            var files = fs.findFilesSync(dirPath, false, '.ejs');
            var codes = [];
            files.forEach(function (filePath) {
                ejs.renderFile(filePath, protocol, function (err, codeStr) {
                    codes.push(codeStr);
                });
            });
            code[path.basename(dirPath)] = codes;
        });
        fn(null, code);
    }
}