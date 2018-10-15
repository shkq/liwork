import { CommandLike } from "./CMDGetter";

export default abstract class {
    constructor(
        command: CommandLike[]
    ) {
        this.command = command;
    }

    private command: CommandLike[] = null

    public async run() {
        try {
            await this.onLoad();
            await this.runHook();
            await this.onDestroy();
        }
        catch (err) {
            console.error(err);
        }
    }

    protected async onLoad() { }

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
                await this[_funcName]();
            }
        }
    }
}