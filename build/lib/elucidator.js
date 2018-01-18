"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class elucidator {
    constructor(mdname) {
        this.mdname = '';
        this.showlog = true;
        this.showerr = true;
        this.mdname = mdname;
    }
    log(any) {
        if (!this.showlog)
            return;
        console.log(`${this.mdname}: ${any}`);
    }
    err(err) {
        if (!this.showerr)
            return;
        console.error('**********ERROR**********');
        console.error('');
        console.error(`${this.mdname}: ${err}`);
        console.error('');
        console.error('*************************');
    }
}
exports.default = elucidator;
//# sourceMappingURL=elucidator.js.map