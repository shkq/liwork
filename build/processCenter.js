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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc0NlbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9jZXNzQ2VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXNDO0FBR3RDLG9EQUE0QztBQUM1Qyw0Q0FBMkM7QUFFM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRTVDLG1CQUFtQyxTQUFRLHFCQUFZO0lBS3JEO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFzQ0YsYUFBUSxHQUFXLGFBQWEsQ0FBQyxNQUFNLENBQUE7SUFyQy9DLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxHQUFvQjtRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDdkMsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ3ZDLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDSixHQUFHLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsT0FBTyxxQkFBcUIsSUFBSSxDQUFDLFFBQVEsUUFBUSxDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUM5QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLEVBQUUsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDOztBQXhDZSxvQkFBTSxHQUFHLFFBQVEsQ0FBQTtBQUNqQixrQkFBSSxHQUFHLE1BQU0sQ0FBQTtBQUgvQixnQ0E2Q0MifQ==