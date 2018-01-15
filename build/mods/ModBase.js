"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processCenter_1 = require("../processCenter");
const lib_1 = require("../lib/lib");
const fs = require("fs");
class ModBase {
    constructor(center, modName, dataPath) {
        this.modName = '';
        this.dataPath = '';
        this.working = false;
        this.data = '';
        this.center = null;
        this.center = center;
        this.modName = modName;
        this.dataPath = dataPath;
        this.init();
    }
    init() {
        this.regFocus();
        this.loadData();
    }
    destroy() {
        this.writeData();
    }
    onFocus() {
    }
    onUnFocus() {
        this.writeData();
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
    loadData() {
        fs.readFile(this.dataPath, 'utf8', (err, data) => {
            if (err) {
                // print.err(err);
                return;
            }
            this.data = JSON.parse(data);
        });
    }
    writeData() {
        fs.writeFile(this.dataPath, JSON.stringify(this.data), (err) => {
            if (err) {
                lib_1.print.err(err);
                return;
            }
        });
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
    resDestroy() {
        this.center.once(this.getPbEvents(processCenter_1.default.exit), () => {
            this.destroy();
        });
    }
}
exports.default = ModBase;
//# sourceMappingURL=ModBase.js.map