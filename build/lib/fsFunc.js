"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function delFile(path, extra = []) {
    return new Promise((res, rej) => {
        path = Path.normalize(path);
        fs.readdir(path, (err, file) => {
            if (err) {
                elu.err(err);
                res();
                return;
            }
            if (file.length === 0) {
                res();
                return;
            }
            let finishCount = 0;
            let fileCount = file.length;
            const finshThenCheck = function () {
                finishCount++;
                if (finishCount === fileCount) {
                    res();
                    return;
                }
            };
            file.forEach((element, index) => {
                // elu.log(`deal ${element}`)
                let isExtra = false;
                extra.forEach(extraEle => {
                    if (element === extraEle) {
                        isExtra = true;
                    }
                });
                if (isExtra) {
                    elu.log(`${element} is in extra , back`);
                    finshThenCheck();
                    return;
                }
                else {
                    let childPath = Path.join(path, element);
                    fs.stat(childPath, (err, stat) => {
                        if (err) {
                            elu.err(err);
                            finshThenCheck();
                            return;
                        }
                        if (stat.isDirectory()) {
                            delFile(childPath, extra).then(() => {
                                finshThenCheck();
                            });
                        }
                        else {
                            fs.unlink(childPath, err => {
                                if (err) {
                                    elu.err(err);
                                    finshThenCheck();
                                    return;
                                }
                                elu.log(`delete ${childPath}`);
                                finshThenCheck();
                            });
                        }
                    });
                }
            });
        });
    });
}
exports.delFile = delFile;
// 删除路径下所有的空文件夹,如果本身为空,那会连自己都删除
function delDir(path) {
    return new Promise((res, rej) => {
        path = Path.normalize(path);
        fs.readdir(path, (err, file) => {
            if (err) {
                elu.err(err);
                res(false);
                return;
            }
            if (file.length === 0) {
                fs.rmdir(path, err => {
                    if (err) {
                        elu.err(err);
                        res(false);
                        return;
                    }
                    elu.log(`remove empty dir ${path}`);
                    res(true);
                });
            }
            else {
                let fileCount = file.length;
                let finishCount = 0;
                const finishThenCheck = function (isDeleted) {
                    if (isDeleted) {
                        fileCount--;
                    }
                    else {
                        finishCount++;
                    }
                    if (fileCount === 0) {
                        fs.rmdir(path, err => {
                            if (err) {
                                elu.err(err);
                                res(false);
                                return;
                            }
                            elu.log(`remove empty dir ${path}`);
                            res(true);
                        });
                    }
                    else if (finishCount === fileCount) {
                        res(false);
                    }
                };
                file.forEach((element, index) => {
                    let childPath = Path.join(path, element);
                    fs.stat(childPath, (err, stat) => {
                        if (err) {
                            elu.err(err);
                            finishThenCheck(false);
                            return;
                        }
                        if (stat.isDirectory()) {
                            delDir(childPath).then(isDeleted => {
                                finishThenCheck(isDeleted);
                            });
                        }
                        else {
                            finishThenCheck(false);
                        }
                    });
                });
            }
        });
    });
}
exports.delDir = delDir;
// 删除路径下所有除额外列表内的文件,并删除所有空文件夹
function delPath(path, extra = []) {
    return __awaiter(this, void 0, void 0, function* () {
        yield delFile(path, extra);
        yield delDir(path);
    });
}
exports.delPath = delPath;
//# sourceMappingURL=fsFunc.js.map