"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const processCenter_1 = require("../processCenter");
const elucidator_1 = require("../lib/js/elucidator");
const elu = new elucidator_1.default("mdBase");
class mdBase {
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
            try {
                this.data = JSON.parse(data);
            }
            catch (err) {
                // print.err(err);
            }
        });
    }
    writeData() {
        fs.writeFile(this.dataPath, JSON.stringify(this.data), (err) => {
            if (err) {
                elu.err(err);
                return;
            }
        });
    }
    regFocus() {
        this.center.once(this.getPbEvents(this.modName), () => {
            this.onFocus();
            this.getFocus();
            this.regUnFocus();
            elu.wri(`\`${this.modName}\`模块开始监听输入`);
        });
    }
    regUnFocus() {
        this.center.once(this.getSfEvents(`~${this.modName}`), () => {
            this.onUnFocus();
            this.backFocus();
            this.regFocus();
            elu.wri(`\`${this.modName}\`模块结束监听输入`);
        });
    }
    resDestroy() {
        this.center.once(this.getPbEvents(processCenter_1.default.exit), () => {
            this.destroy();
        });
    }
}
exports.default = mdBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHMvbWRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXdCO0FBR3hCLG9EQUE0QztBQUM1QyxxREFBNkM7QUFFN0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXJDO0lBQ0UsWUFBWSxNQUFxQixFQUFFLE9BQWUsRUFBRSxRQUFnQjtRQU8zRCxZQUFPLEdBQVcsRUFBRSxDQUFBO1FBQ3BCLGFBQVEsR0FBVyxFQUFFLENBQUE7UUFDcEIsWUFBTyxHQUFZLEtBQUssQ0FBQTtRQUN4QixTQUFJLEdBQVEsRUFBRSxDQUFBO1FBZ0JkLFdBQU0sR0FBa0IsSUFBSSxDQUFBO1FBekJwQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBT1MsSUFBSTtRQUNaLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNTLE9BQU87UUFDZixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNTLE9BQU87SUFFakIsQ0FBQztJQUNTLFNBQVM7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFHUyxRQUFRO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBQ1MsU0FBUztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNTLFdBQVcsQ0FBQyxVQUFrQjtRQUN0QyxNQUFNLENB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