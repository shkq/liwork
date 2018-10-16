import { CommandLike } from "./CMDGetter";
import elucidator from "./Elucidator";

const logger = new elucidator("ModeBase");

export default abstract class {
    constructor(
        command: CommandLike[]
    ) {
        this.command = command;
        process.on("exit", (code) => {
            await this.onDestroy();
        });
    }

    private command: CommandLike[] = null

    public async run() {
        try {
            await this.onLoad();
            await this.runHook();
            await this.onMain();
        }
        catch (err) {
            console.error(err);
        }
    }

    protected async onLoad() { }
    protected async onMain() { }
    protected async onDestroy() { }

    private async runHook(command?: CommandLike[], funcName?: string) {
        command = command || this.command;
        for (let i = 0; i < command.length; ++i) {
            let _funcName = funcName || "";
            if (_funcName.length !== 0) {
                _funcName = _funcName + "_" + command[i].name;
            }
            else {
                _funcName = command[i].name;
            }
            if (command[i].child.length > 0) {
                await this.runHook(command[i].child, _funcName);
            }
            if (this[_funcName]) {
                await this[_funcName](command[i].argv);
            }
            else {
                logger.wri(`子命令 ${command[i].name} 不存在`);
            }
        }
    }
}