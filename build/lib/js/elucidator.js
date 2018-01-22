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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWx1Y2lkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvanMvZWx1Y2lkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBS0UsWUFBWSxNQUFjO1FBRzFCLFdBQU0sR0FBVyxFQUFFLENBQUE7UUFFbkIsWUFBTyxHQUFHLElBQUksQ0FBQTtRQU9kLFlBQU8sR0FBRyxJQUFJLENBQUE7UUFXZCxZQUFPLEdBQUcsSUFBSSxDQUFBO1FBdEJaLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFJRCxHQUFHLENBQUMsR0FBRztRQUNMLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBR0QsR0FBRyxDQUFDLEdBQUc7UUFDTCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUdELEdBQUcsQ0FBQyxHQUFHO1FBQ0wsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O0FBaENNLGtCQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ2Ysa0JBQU8sR0FBRyxJQUFJLENBQUM7QUFDZixrQkFBTyxHQUFHLElBQUksQ0FBQztBQUh4Qiw2QkFrQ0MifQ==