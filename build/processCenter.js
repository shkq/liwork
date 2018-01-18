"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const elucidator_1 = require("./lib/js/elucidator");
const strFunc = require("./lib/js/strFunc");
const elu = new elucidator_1.default("ProcessCenter");
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
                elu.err("设置handler只能使用继承自\`mdBase\`类型的对象");
            }
        }
        else {
            if (this._handler !== ProcessCenter.global) {
                elu.err(`\`${val.modName}\`模块尝试使用控制权限失败: \`${this._handler}\`正在占用`);
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
        str = strFunc.removeBlank(str);
        let args = str.split(' ');
        if (typeof args[0] === 'undefined' || args[0].length === 0) {
            return;
        }
        let command = args.splice(0, 1)[0];
        this.emit(`${this._handler}-${command}`, args);
    }
}
ProcessCenter.global = 'global';
ProcessCenter.exit = 'exit';
exports.default = ProcessCenter;
//# sourceMappingURL=processCenter.js.map