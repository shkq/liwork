"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class elucidator {
    constructor(mdname) {
        this.mdname = '';
        this.mdname = mdname;
    }
    log(any) {
        console.log(`${this.mdname}: ${any}`);
    }
    err(err) {
        console.error('**********ERROR**********');
        console.error(`${this.mdname}: ${err}`);
        console.error('*************************');
    }
}
exports.default = elucidator;
//# sourceMappingURL=elucidator.js.map