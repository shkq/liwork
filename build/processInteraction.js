"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const processCenter_1 = require("./processCenter");
const elucidator_1 = require("./lib/js/elucidator");
const elu = new elucidator_1.default("processInteraction");
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
        elu.wri("liwork 已经启动");
        elu.wri('请输入需要执行的命令,输入help获取帮助');
        rl.on('line', (line) => {
            this.center.accept(line);
        }).on('close', () => {
            this.center.accept(processCenter_1.default.exit);
        });
    }
}
exports.default = createProcessInteraction;
//# sourceMappingURL=processInteraction.js.map