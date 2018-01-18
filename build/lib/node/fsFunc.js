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
// 复制路径下所有除额外列表内的文件至目标文件夹
function copyPath(originalPath, targetPath, extra) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.copyPath = copyPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnNGdW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9ub2RlL2ZzRnVuYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUJBQXdCO0FBQ3hCLDZCQUE0QjtBQUM1QixpREFBeUM7QUFFekMsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXJDLHlCQUF5QjtBQUN6QixlQUFzQixPQUFlO0lBQ25DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDO0lBRU4sQ0FBQztBQUNILENBQUM7QUFSRCxzQkFRQztBQUVELG1CQUFtQjtBQUNuQixpQkFBd0IsSUFBWSxFQUFFLFFBQWtCLEVBQUU7SUFDeEQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDYixHQUFHLEVBQUUsQ0FBQztnQkFDTixNQUFNLENBQUM7WUFDVCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixHQUFHLEVBQUUsQ0FBQztnQkFDTixNQUFNLENBQUM7WUFD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