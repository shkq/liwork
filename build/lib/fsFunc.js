"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const elucidator_1 = require("./elucidator");
const elu = new elucidator_1.default('fsFunc');
// 同步查看路径是否正确,如果有路径不存在则创建
function mkdir(dirpath) {
    let dirname = Path.dirname(dirpath);
    if (fs.existsSync(dirname)) {
        return;
    }
    else {
    }
}
exports.mkdir = mkdir;
// 删除文件夹文件,可以设置额外列表
function delDir(path, extra = []) {
    path = Path.normalize(path);
    fs.readdir(path, (err, file) => {
        if (err) {
            elu.err(err);
            return;
        }
        file.forEach((element, index) => {
            elu.log(`deal ${element}`);
            let isExtra = false;
            extra.forEach(extraEle => {
                if (element === extraEle) {
                    isExtra = true;
                }
            });
            if (isExtra) {
                elu.log(`${element} is in extra , back`);
                return;
            }
            else {
                let indexpath = Path.join(path, element);
                fs.stat(indexpath, (err, stat) => {
                    if (err) {
                        elu.err(err);
                        return;
                    }
                    if (stat.isDirectory()) {
                        delDir(indexpath, extra);
                    }
                    else {
                        elu.log(`delete ${indexpath}`);
                        fs.unlink(indexpath, err => {
                            if (err) {
                                elu.err(err);
                                return;
                            }
                        });
                    }
                });
            }
        });
    });
}
exports.delDir = delDir;
// 清除所有空文件夹
function delEmptyDirectory(path) {
    path = Path.normalize(path);
    fs.readdir(path, (err, file) => {
        if (err) {
            elu.err(err);
            return;
        }
        file.forEach((element, index) => {
        });
    });
}
exports.delEmptyDirectory = delEmptyDirectory;
//# sourceMappingURL=fsFunc.js.map