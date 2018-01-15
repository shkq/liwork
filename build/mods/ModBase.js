"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processCenter_1 = require("../processCenter");
const lib_1 = require("../lib/lib");
class ModBase {
    constructor(center) {
        this.center = null;
        this.center = center;
        this.init();
        this.regFocus();
    }
    getFocus() {
        this.center.handler = this;
    }
    backFocus() {
        this.center.handler = null;
    }
    getPbEvents(eventsName) {
        return `${processCenter_1.default.global}-${eventsName}`;
    }
    getSfEvents(eventsName) {
        return `${this.modName}-${eventsName}`;
    }
    regFocus() {
        this.center.once(this.getPbEvents(this.modName), () => {
            this.onFocus();
            this.getFocus();
            this.regUnFocus();
            lib_1.print.wri(`\`${this.modName}\`模块开始监听输入`);
        });
    }
    regUnFocus() {
        this.center.once(this.getSfEvents(`~${this.modName}`), () => {
            this.onUnFocus();
            this.backFocus();
            this.regFocus();
            lib_1.print.wri(`\`${this.modName}\`模块结束监听输入`);
        });
    }
}
exports.default = ModBase;
//# sourceMappingURL=ModBase.js.map