"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const print = require("./lib/print");
const processCenter_1 = require("./processCenter");
class createProcessInteraction {
    constructor(center) {
        this.center = null;
        this.center = center;
    }
    load() {
        // 初始化
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        print.wri("liwork 已经启动");
        print.wri('请输入需要执行的命令,输入help获取帮助');
        rl.on('line', (line) => {
            this.center.accept(line);
        }).on('close', () => {
            this.center.accept(processCenter_1.default.exit);
        });
    }
}
exports.default = createProcessInteraction;
//# sourceMappingURL=processInteraction.js.map