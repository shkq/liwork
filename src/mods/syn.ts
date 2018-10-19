/**
 * When I wrote this, only God and I understood what I was doing
 * Now, God only knows
 * 
 * UseTo: 
 * Author: lijj
 * Remark: 
 */

import * as fs from "fs";
import * as Path from "path";

import ModeBase from "../lib/ModeBase";
import logger from "../lib/Logger";
import * as fsFunc from "../lib/FsTool";
import { checkArr } from "../lib/ArrayFunc";

interface workConfig {
    list: {
        originalPath: string
        targetPath: string
        extra?: string[]
    }[]
    interval?: number
    extra?: string[]
}

interface workListItem {
    originalPath: string
    targetPath: string
    extra: string[]
    timerIdentifier: NodeJS.Timer
}

const defConfigName = "liworkSyn.json";

export default class extends ModeBase {

    private workList: workListItem[] = []
    private config: workConfig = null

    protected async onLoad() {
        this.config = await this.getRunConfig(Path.join(process.cwd(), defConfigName));
    }

    protected async appoint(argv: string[]) {
        if (!argv[0]) return;
        this.config = await this.getRunConfig(Path.normalize(argv[0]));
    }

    private getRunConfig(configPath: string) {
        return new Promise<workConfig>((resolve, reject) => {
            fs.readFile(configPath, { encoding: "utf8" }, (err, data) => {
                if (err) {
                    reject(err);
                }
                try {
                    let config: workConfig = JSON.parse(data);
                    config = this.normalizeCfg(config);
                    resolve(config);
                }
                catch (err) {
                    reject(err);
                }
            })
        })
    }

    private async auto() {
        for (let i = 0; i < this.config.list.length; i++) {
            const work = this.config.list[i];
            const originalPath = work.originalPath;
            const targetPath = work.targetPath;
            const extra = work.extra;
            let timerIdentifier = setInterval(() => {
                fsFunc.delThenCopyPath(originalPath, targetPath, extra).then(() => {
                    let time = new Date().toLocaleTimeString();
                    logger.wri(`${time} Copy \`${originalPath}\` To \`${targetPath}\``);
                });
            }, this.config.interval);
            this.workList.push({
                originalPath: originalPath,
                targetPath: targetPath,
                extra: extra,
                timerIdentifier: timerIdentifier
            });
            logger.wri(`Start Sever: Copy \`${originalPath}\` To \`${targetPath}\``);
            logger.wri(`Extra List: \`${extra}\``);
            logger.wri(`Interval: \`${this.config.interval}\``);
        }
    }

    private async copy(argv: string[]) {
        for (let i = 0; i < this.config.list.length; ++i) {
            let originalPath = "";
            let targetPath = "";
            let extra = this.config.list[i].extra;
            if (argv[0] === "false") {
                originalPath = this.config.list[i].targetPath;
                targetPath = this.config.list[i].originalPath;
            }
            else {
                originalPath = this.config.list[i].originalPath;
                targetPath = this.config.list[i].targetPath;
            }
            fsFunc.delThenCopyPath(originalPath, targetPath, extra).then(() => {
                let time = new Date().toLocaleTimeString();
                logger.wri(`${time} Copy \`${originalPath}\` To \`${targetPath}\``);
            });
        }
    }

    private normalizeCfg(config: workConfig) {
        config.extra = checkArr(config.extra);
        for (let i = 0; i < config.list.length; ++i) {
            let work = config.list[i];
            if (typeof work.originalPath === "undefined" ||
                work.originalPath === '') {
                logger.thr(`\`${i}\`Unsetted Save Path`);
            }
            if (typeof work.targetPath === "undefined" ||
                work.targetPath === '') {
                logger.thr(`\`${i}\`Unsetted Work Path`);
            }
            work.originalPath = Path.normalize(config.list[i].originalPath);
            work.targetPath = Path.normalize(config.list[i].targetPath);
            work.extra = checkArr(config.list[i].extra);
            work.extra = work.extra.concat(config.extra);
        }
        if (typeof config.interval === "undefined") {
            config.interval = 10 * 60 * 1000;
        }
        return config;
    }

    // 无用,暂且保留
    private showList() {
        this.workList.forEach((ele, index) => {
            logger.wri(`服务 \`${index}\` 从 \`${ele.originalPath}\` 同步至 \`${ele.targetPath}\``);
        });
    }

    private closeWork(identifier: string) {
        let identifierNum = parseInt(identifier);
        if (typeof this.workList[identifierNum] === "undefined") {
            logger.wri("无效的列表标示");
            return;
        }
        clearInterval(this.workList[identifierNum].timerIdentifier);
        fsFunc.delThenCopyPath(this.workList[identifierNum].targetPath,
            this.workList[identifierNum].originalPath, this.workList[identifierNum].extra);
        this.workList.splice(identifierNum, 1);
        logger.wri(`已关闭服务 \`${identifier}\``);
    }

    private closeAll() {
        this.workList.forEach((ele, ind) => {
            let identifierNum = ind;
            clearInterval(this.workList[identifierNum].timerIdentifier);
            fsFunc.delThenCopyPath(this.workList[identifierNum].targetPath,
                this.workList[identifierNum].originalPath, this.workList[identifierNum].extra);
            logger.wri(`已关闭服务 \`${identifierNum}\``);
        });
        this.workList = [];
    }
}