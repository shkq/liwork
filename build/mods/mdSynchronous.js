"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModBase_1 = require("./ModBase");
class mdSynchronous extends ModBase_1.default {
    constructor(center) {
        super(center);
        this.modName = 'mdSynchronous';
    }
    init() {
        this.center.on();
        {
        }
    }
}
exports.default = mdSynchronous;
//# sourceMappingURL=mdSynchronous.js.map