"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const processCenter_1 = require("./processCenter");
const processInteraction_1 = require("./processInteraction");
// mods
const mdSynchronous_1 = require("./mods/syn/mdSynchronous");
// 初始化日志文件夹
const dataPath = Path.join('./', 'data');
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
}
// 初始化处理模块
const center = new processCenter_1.default();
// 注册处理模块
const syn = new mdSynchronous_1.default(center);
// 初始化交互器
const interaction = new processInteraction_1.default(center).load();
//# sourceMappingURL=index.js.map