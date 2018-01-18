"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class elucidator {
    constructor(mdname) {
        this.mdname = '';
        this.showlog = true;
        this.showerr = true;
        this.showwri = true;
        this.mdname = mdname;
    }
    log(any) {
        if (!this.showlog)
            return;
        if (!elucidator.showlog)
            return;
        console.log(`${this.mdname}: ${any}`);
    }
    err(err) {
        if (!this.showerr)
            return;
        if (!elucidator.showerr)
            return;
        console.error('**********ERROR**********');
        console.error('');
        console.error(`${this.mdname}: ${err}`);
        console.error('');
        console.error('*************************');
    }
    wri(any) {
        if (!this.showwri)
            return;
        if (!elucidator.showwri)
            return;
        console.log(`${this.mdname}: ${any}`);
    }
}
elucidator.showlog = true;
elucidator.showerr = true;
elucidator.showwri = true;
exports.default = elucidator;
//# sourceMappingURL=elucidator.js.map