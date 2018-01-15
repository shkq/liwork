"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const lib = require("./lib/lib");
class ProcessCenter extends events_1.EventEmitter {
    constructor() {
        super();
        this._handler = ProcessCenter.global;
    }
    set handler(val) {
        if (!val) {
            this._handler = ProcessCenter.global;
        }
        else if (typeof val === "string") {
            if (val === ProcessCenter.global) {
                this._handler = ProcessCenter.global;
            }
            else {
                lib.print.err("设置handler只能使用继承自\`ModBase\`类型的对象");
            }
        }
        else {
            if (this._handler !== ProcessCenter.global) {
                lib.print.err(`\`${val.modName}\`模块尝试使用控制权限失败: \`${this._handler}\`正在占用`);
            }
            else {
                this._handler = val.modName;
            }
        }
    }
    get handler() {
        return this._handler;
    }
    accept(str) {
        str = lib.strFunc.removeBlank(str);
        let args = str.split(' ');
        if (typeof args[0] === 'undefined' || args[0].length === 0) {
            return;
        }
        this.emit(`${this._handler}-${args}`, args.splice(0, 1));
    }
}
ProcessCenter.global = 'global';
ProcessCenter.exit = 'exit';
exports.default = ProcessCenter;
//# sourceMappingURL=processCenter.js.map