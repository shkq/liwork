"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
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
//# sourceMappingURL=fsFunc.js.map