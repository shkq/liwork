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
        process.once("exit", () => {
            this.emit(this.getPbEvents(ProcessCenter.exit));
        });
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
    getPbEvents(eventsName) {
        return `${ProcessCenter.global}-${eventsName}`;
    }
    getSfEvents(modName, eventsName) {
        return `${modName}-${eventsName}`;
    }
}
ProcessCenter.global = 'global';
ProcessCenter.exit = 'exit';
exports.default = ProcessCenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc0NlbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9jZXNzQ2VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXNDO0FBR3RDLG9EQUE0QztBQUM1Qyw0Q0FBMkM7QUFFM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRTVDLG1CQUFtQyxTQUFRLHFCQUFZO0lBS3JEO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFnREYsYUFBUSxHQUFXLGFBQWEsQ0FBQyxNQUFNLENBQUE7UUEvQzdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEdBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsR0FBb0I7UUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUN2QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQzdDLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLE9BQU8scUJBQXFCLElBQUksQ0FBQyxRQUFRLFFBQVEsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDOUIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFXO1FBQ2hCLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxVQUFrQjtRQUM1QixNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxJQUFJLFVBQVUsRUFBRSxDQUFBO0lBQ2hELENBQUM7SUFDRCxXQUFXLENBQUMsT0FBYyxFQUFFLFVBQWtCO1FBQzVDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQTtJQUNuQyxDQUFDOztBQWxEZSxvQkFBTSxHQUFHLFFBQVEsQ0FBQTtBQUNqQixrQkFBSSxHQUFHLE1BQU0sQ0FBQTtBQUgvQixnQ0F1REMifQ==