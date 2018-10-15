/**
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows
 * 
 * UseTo: 
 * Author: lijj
 * Remark: 
 */


import { getArrCopy } from "./arrFunc"

export interface CommandLike {
    /**
     * 命令
     */
    cmd: string
    /**
     * 命令参数
     */
    argv: string[]
    /**
     * 子命令
     */
    child: CommandLike[]
    /**
     * 命令的层级
     */
    level: number
}

export class Command {
    constructor(
        private _cmd: CommandLike[]
    ) { }
}

export class CommandGetter {

    getMain() {
        return process.argv[2];
    }

    getSub() {
        let argv = this.getArgv();
        let cmd: CommandLike[] = [];
        let lastCmd: CommandLike = null;
        for (let i = 3; i < argv.length; i++) {
            let current = argv[i];
            if (this.isArgv(current) && lastCmd) {
                lastCmd.argv.push(current);
            }
            else {
                let newCmd: CommandLike = this.getCmd(current);
                if (newCmd.level === lastCmd.level + 1) {
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
        return process.argv.slice();
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
            cmd: current,
            argv: [],
            child: [],
            level: level
        }
    }
}