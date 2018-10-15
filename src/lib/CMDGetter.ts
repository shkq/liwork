/**
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows
 * 
 * UseTo: 
 * Author: lijj
 * Remark: 
 */

export interface CommandLike {
    /**
     * 命令
     */
    name: string
    /**
     * 命令的层级
     */
    level: number
    /**
     * 命令参数
     */
    argv: string[]
    /**
     * 子命令
     */
    child: CommandLike[]
}

export class CommandGetter {

    constructor(
        private argv: string[]
    ) { }

    getMain() {
        return this.argv[0];
    }

    getSub() {
        let argv = this.getArgv();
        let cmd: CommandLike[] = [];
        let lastCmd: CommandLike = null;
        for (let i = 1; i < argv.length; i++) {
            let current = argv[i];
            if (this.isArgv(current) && lastCmd) {
                lastCmd.argv.push(current);
            }
            else {
                let newCmd: CommandLike = this.getCmd(current);
                if (lastCmd && newCmd.level === lastCmd.level + 1) {
                    lastCmd.child.push(newCmd);
                }
                else {
                    if (newCmd.level === 1) {
                        cmd.push(newCmd);
                    }
                    else {
                        let levelIndex = 2;
                        lastCmd = cmd[cmd.length - 1];
                        while (levelIndex < newCmd.level) {
                            lastCmd = lastCmd.child[lastCmd.child.length - 1];
                        }
                        lastCmd.child.push(newCmd);
                    }
                }
                lastCmd = newCmd;
            }
        }
        return cmd;
    }

    private getArgv() {
        return this.argv.slice();
    }

    private isArgv(current: string) {
        if (current[0] === "-") return false;
        else return true;
    }

    private getCmd(current: string) {
        let level = 0;
        while (current[0] === "-") {
            level++;
            current = current.substr(1);
        }
        return {
            name: current,
            argv: [],
            child: [],
            level: level
        }
    }
}