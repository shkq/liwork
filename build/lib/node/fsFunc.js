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
const elucidator_1 = require("../js/elucidator");
const elu = new elucidator_1.default('fsFunc');
elu.showlog = false;
// 复制路径结构
function copyDirPath(originalPath, targetPath) {
    return new Promise((res, rej) => {
        originalPath = Path.normalize(originalPath);
        targetPath = Path.normalize(targetPath);
        fs.readdir(originalPath, (err, file) => {
            if (err) {
                elu.err(err);
                res();
                return;
            }
            const next = function () {
                if (file.length === 0) {
                    res();
                    return;
                }
                let finishCount = 0;
                let fileCount = file.length;
                const finishThenCheck = function () {
                    finishCount++;
                    if (finishCount === fileCount) {
                        res();
                        return;
                    }
                };
                file.forEach(element => {
                    let childPath = Path.join(originalPath, element);
                    fs.stat(childPath, (err, stat) => {
                        if (err) {
                            elu.err(err);
                            finishThenCheck();
                            return;
                        }
                        if (stat.isDirectory()) {
                            let toChildPath = Path.join(targetPath, element);
                            copyDirPath(childPath, toChildPath).then(() => {
                                finishThenCheck();
                            });
                        }
                        else {
                            finishThenCheck();
                        }
                    });
                });
            };
            fs.access(targetPath, err => {
                if (err) {
                    fs.mkdir(targetPath, err => {
                        if (err) {
                            res();
                            return;
                        }
                        elu.log(`create dir ${targetPath}`);
                        next();
                    });
                }
                next();
            });
        });
    });
}
exports.copyDirPath = copyDirPath;
// 复制文件
// 需要保证复制路径下目录结构相同,如果不能确定,先使用`copyDirPath`
function copyFilePath(originalPath, targetPath, extra = []) {
    return new Promise((res, rej) => {
        originalPath = Path.normalize(originalPath);
        targetPath = Path.normalize(targetPath);
        fs.readdir(originalPath, (err, file) => {
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
            const finishThenCheck = function () {
                finishCount++;
                if (finishCount === fileCount) {
                    res();
                    return;
                }
            };
            file.forEach(element => {
                if (checkInextra(element, extra)) {
                    elu.log(`${element} is in extra , back`);
                    finishThenCheck();
                    return;
                }
                let childPath = Path.join(originalPath, element);
                let toChildPath = Path.join(targetPath, element);
                fs.stat(childPath, (err, stat) => {
                    if (err) {
                        elu.err(err);
                        finishThenCheck();
                        return;
                    }
                    if (stat.isDirectory()) {
                        copyFilePath(childPath, toChildPath, extra).then(() => {
                            finishThenCheck();
                        });
                    }
                    else {
                        fs.copyFile(childPath, toChildPath, err => {
                            if (err) {
                                elu.log(err);
                            }
                            else {
                                elu.log(`copy file ${toChildPath}`);
                            }
                            finishThenCheck();
                        });
                    }
                });
            });
        });
    });
}
exports.copyFilePath = copyFilePath;
// 删除文件夹文件,可以设置额外列表
function delFilePath(path, extra = []) {
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
            const finishThenCheck = function () {
                finishCount++;
                if (finishCount === fileCount) {
                    res();
                    return;
                }
            };
            file.forEach(element => {
                // elu.log(`deal ${element}`)
                if (checkInextra(element, extra)) {
                    elu.log(`${element} is in extra , back`);
                    finishThenCheck();
                    return;
                }
                else {
                    let childPath = Path.join(path, element);
                    fs.stat(childPath, (err, stat) => {
                        if (err) {
                            elu.err(err);
                            finishThenCheck();
                            return;
                        }
                        if (stat.isDirectory()) {
                            delFilePath(childPath, extra).then(() => {
                                finishThenCheck();
                            });
                        }
                        else {
                            fs.unlink(childPath, err => {
                                if (err) {
                                    elu.err(err);
                                    finishThenCheck();
                                    return;
                                }
                                elu.log(`delete ${childPath}`);
                                finishThenCheck();
                            });
                        }
                    });
                }
            });
        });
    });
}
exports.delFilePath = delFilePath;
// 删除路径下所有的空文件夹,如果本身为空,那会连自己都删除
function delEmptyDirPath(path) {
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
                file.forEach(element => {
                    let childPath = Path.join(path, element);
                    fs.stat(childPath, (err, stat) => {
                        if (err) {
                            elu.err(err);
                            finishThenCheck(false);
                            return;
                        }
                        if (stat.isDirectory()) {
                            delEmptyDirPath(childPath).then(isDeleted => {
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
exports.delEmptyDirPath = delEmptyDirPath;
function checkInextra(filename, extra) {
    let isExtra = false;
    extra.forEach(extraEle => {
        if (filename === extraEle) {
            isExtra = true;
        }
    });
    return isExtra;
}
exports.checkInextra = checkInextra;
// 删除路径下所有除额外列表内的文件,并删除所有空文件夹
function delPath(path, extra = []) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield delFilePath(path, extra);
            yield delEmptyDirPath(path);
        }
        catch (err) {
            elu.err(err);
        }
    });
}
exports.delPath = delPath;
// 复制路径下所有除额外列表内的文件至目标文件夹
function copyPath(originalPath, targetPath, extra = []) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield copyDirPath(originalPath, targetPath);
            yield copyFilePath(originalPath, targetPath, extra);
        }
        catch (err) {
            elu.err(err);
        }
    });
}
exports.copyPath = copyPath;
// 删除旧文件,并复制新文件到文件夹
function delThenCopyPath(originalPath, targetPath, extra = []) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield delPath(targetPath, extra);
            yield copyPath(originalPath, targetPath, extra);
        }
        catch (err) {
            elu.err(err);
        }
    });
}
exports.delThenCopyPath = delThenCopyPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnNGdW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9ub2RlL2ZzRnVuYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUJBQXdCO0FBQ3hCLDZCQUE0QjtBQUM1QixpREFBeUM7QUFHekMsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLFNBQVM7QUFDVCxxQkFBNEIsWUFBb0IsRUFBRSxVQUFrQjtJQUNsRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDOUIsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDckMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNiLEdBQUcsRUFBRSxDQUFDO2dCQUNOLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxNQUFNLElBQUksR0FBRztnQkFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLEdBQUcsRUFBRSxDQUFDO29CQUNOLE1BQU0sQ0FBQztnQkFDVCxDQUFDO2dCQUNELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDNUIsTUFBTSxlQUFlLEdBQUc7b0JBQ3RCLFdBQVcsRUFBRSxDQUFDO29C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