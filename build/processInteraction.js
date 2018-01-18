"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const processCenter_1 = require("./processCenter");
const elucidator_1 = require("./lib/js/elucidator");
const elu = new elucidator_1.default("processInteraction");
class createProcessInteraction {
    constructor(center) {
        this.center = null;
        this.center = center;
    }
    load() {
        // 初始化
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        elu.wri("liwork 已经启动");
        elu.wri('请输入需要执行的命令,输入help获取帮助');
        rl.on('line', (line) => {
            this.center.accept(line);
        }).on('close', () => {
            this.center.accept(processCenter_1.default.exit);
        });
    }
}
exports.default = createProcessInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc0ludGVyYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Byb2Nlc3NJbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFvQztBQUVwQyxtREFBMkM7QUFDM0Msb0RBQTRDO0FBRTVDLE1BQU0sR0FBRyxHQUFHLElBQUksb0JBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRWpEO0lBQ0UsWUFBWSxNQUFxQjtRQW1CekIsV0FBTSxHQUFrQixJQUFJLENBQUE7UUFsQmxDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTTtRQUNOLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDbEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHVCQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBR0Y7QUFyQkQsMkNBcUJDIn0=