/**
 * Created with JetBrains WebStorm.
 * User: James
 * Date: 12-8-29
 * Time: 下午3:09
 * 描述: 对系统fs功能进行扩展
 */
var path = require('path')
    , fs = require('fs');
fs.findFilesSync = function (folder, findSubDir, extname) {
    if (!fs.existsSync(folder)) {
        throw new Error('目录' + folder + '不存在');
    }
    folder = path.resolve(folder);
    var res = [] , files = fs.readdirSync(folder);
    files.forEach(function (file) {
        var filePath = path.join(folder, file)
            , stat = fs.lstatSync(filePath);
        if (!stat.isDirectory()) {
            if (extname === null || extname === undefined || path.extname(file) === extname)
                res.push(filePath);
        } else {
            if (findSubDir === true) {
                res = res.concat(fs.findFilesSync(filePath, true));
            }
        }
    });
    return res
};
fs.findDirsSync = function (folder, findSubDir) {
    if (!fs.existsSync(folder)) {
        throw new Error('目录' + folder + '不存在');
    }
    folder = path.resolve(folder);
    var res = [] , files = fs.readdirSync(folder);
    files.forEach(function (file) {
        var filePath = path.join(folder, file)
            , stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            res.push(filePath);
            if (findSubDir === true) {
                res = res.concat(fs.findDirsSync(filePath, true));
            }
        }
    });
    return res
};
module.exports = fs;