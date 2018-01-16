"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const print = require("./print");
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
// 删除整个文件夹
function delDir(path, extra = []) {
    path = Path.normalize(path);
    fs.readdir(path, (err, file) => {
        if (err) {
            print.err(err);
            return;
        }
        file.forEach((element, index) => {
            let indexpath = Path.join(path, element);
            fs.stat(indexpath, (err, stat) => {
                if (err) {
                    print.err(err);
                    return;
                }
                if (stat.isDirectory()) {
                    delDir(indexpath);
                }
                else {
                    let isExtra = false;
                    extra.forEach(extraEle => {
                        if (extraEle === element) {
                            isExtra = true;
                        }
                    });
                    if (isExtra) {
                        return;
                    }
                    else {
                        fs.unlink(indexpath, err => {
                            if (err) {
                                print.err(err);
                                return;
                            }
                        });
                    }
                }
            });
        });
    });
}
exports.delDir = delDir;
//# sourceMappingURL=fsFunc.js.map