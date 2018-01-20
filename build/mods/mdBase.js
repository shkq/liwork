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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHMvbWRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXdCO0FBR3hCLG9EQUE0QztBQUM1QyxxREFBNkM7QUFFN0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXJDO0lBQ0UsWUFBWSxNQUFxQixFQUFFLE9BQWUsRUFBRSxRQUFnQjtRQU8zRCxZQUFPLEdBQVcsRUFBRSxDQUFBO1FBQ3BCLGFBQVEsR0FBVyxFQUFFLENBQUE7UUFDcEIsU0FBSSxHQUFRLEVBQUUsQ0FBQTtRQWdCZCxXQUFNLEdBQWtCLElBQUksQ0FBQTtRQXhCcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQU1TLElBQUk7UUFDWixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDUyxPQUFPO1FBQ2YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDUyxPQUFPO0lBRWpCLENBQUM7SUFDUyxTQUFTO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBR1MsUUFBUTtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNTLFNBQVM7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFDUyxXQUFXLENBQUMsVUFBa0I7UUFDdEMsTUFBTSxDQUFDLEdBQUcsdUJBQWEsQ0FBQyxNQUFNLElBQUksVUFBVSxFQUFFLENBQUE7SUFDaEQsQ0FBQztJQUNTLFdBQVcsQ0FBQyxVQUFrQjtRQUN0QyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLFVBQVUsRUFBRSxDQUFBO0lBQ3hDLENBQUM7SUFDUyxRQUFRO1FBQ2hCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDL0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUixrQkFBa0I7Z0JBQ2xCLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxJQUFJLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFDRCxLQUFLLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNWLGtCQUFrQjtZQUNwQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ1MsU0FBUztRQUNqQixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM3RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxDQUFDO1lBQ1QsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVPLFFBQVE7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sWUFBWSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ08sVUFBVTtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFO1lBQzFELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxZQUFZLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTyxVQUFVO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDMUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkZELHlCQW1GQyJ9