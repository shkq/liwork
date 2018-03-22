import * as fs from "fs"
import * as Path from "path"

import { MdBase } from "../mdBase"
import * as strFunc from "../../lib/js/strFunc"
import elucidator from "../../lib/js/elucidator"
import * as fsFunc from "../../lib/node/fsFunc"
import { CommandLike } from "../../lib/node/commandGetter";

interface workConfig {
  list: {
    originalPath: string
    targetPath: string
    extra: string[]
  }[]
  interval?: number
}

interface workListItem {
  originalPath: string
  targetPath: string
  extra: string[]
  timerIdentifier: NodeJS.Timer
}

const defConfigName = "liworkSyn.json";
const elu = new elucidator("mdSynchronous");
const mainName = "-syn"
const subAppoint = "--appoint"
const subCopy = "--copy"

export {
  mdSynchronous
}

class mdSynchronous extends MdBase {

  static readonly mainName = mainName

  constructor() {
    super();
  }

  private command: CommandLike = null
  private workList: workListItem[] = []
  private config: workConfig = null

  async run(command: CommandLike) {
    this.command = command;
    this.config = await this.getRunConfig();
    if (this.startCopy()) return;
    this.startSyn();
  }

  private getRunConfig() {
    return new Promise<workConfig>((reject, resolve) => {
      let appoint = this.command.getSub(subAppoint);
      let configPath = ""
      if (appoint.have && appoint.argv.length > 0) {
        configPath = Path.normalize(appoint.argv);
      }
      else {
        configPath = Path.join(process.cwd(), defConfigName);
      }
      fs.readFile(configPath, { encoding: "utf8" }, (err, data) => {
        if (err) {
          resolve(err);
        }
        try {
          let config: workConfig = JSON.parse(data);
          for (let i = 0; i < config.list.length; ++i) {
            config.list[i].originalPath = Path.normalize(config.list[i].originalPath);
            config.list[i].targetPath = Path.normalize(config.list[i].targetPath);
          }
          reject(config);
        }
        catch (err) {
          resolve(err);
        }
      })
    })
  }

  private startSyn() {
    this.checkListRight();
    for (let i = 0; i < this.config.list.length; i++) {
      const work = this.config.list[i];
      const originalPath = work.originalPath;
      const targetPath = work.targetPath;
      const extra = work.extra;
      let timerIdentifier = setInterval(() => {
        fsFunc.delThenCopyPath(originalPath, targetPath, extra).then(() => {
          elu.wri(`已将 \`${originalPath}\` 同步至 \`${targetPath}\``);
        });
      }, this.config.interval);
      this.workList.push({
        originalPath: originalPath,
        targetPath: targetPath,
        extra: extra,
        timerIdentifier: timerIdentifier
      });
      elu.wri(`开启服务从 \`${originalPath}\` 同步至 \`${targetPath}\``);
      elu.wri(`额外列表: \`${extra}\``);
      elu.wri(`刷新时间: \`${this.config.interval}\``);
    }
  }

  private startCopy() {
    let copyCommand = this.command.getSub(subCopy);

    if (!copyCommand.have) {
      return false;
    }

    this.checkListRight();

    for (let i = 0; i < this.config.list.length; ++i) {
      let originalPath = "";
      let targetPath = "";
      let extra = this.config.list[i].extra;
      if (copyCommand.argv === "false") {
        originalPath = this.config.list[i].targetPath;
        targetPath = this.config.list[i].originalPath;
      }
      else {
        originalPath = this.config.list[i].originalPath;
        targetPath = this.config.list[i].targetPath;
      }
      fsFunc.delThenCopyPath(originalPath, targetPath, extra).then(() => {
        elu.wri(`已将 \`${originalPath}\` 复制至 \`${targetPath}\``);
      });
    }

    return true;
  }

  private checkListRight() {
    for (let i = 0; i < this.config.list.length; ++i) {
      let work = this.config.list[i];
      if (typeof work.originalPath === "undefined" ||
        work.originalPath === '') {
        elu.thr("未设置保存路径");
      }
      if (typeof work.targetPath === "undefined" ||
        work.targetPath === '') {
        elu.thr("未设置工作路径");
      }
      if (typeof work.extra === "undefined" ||
        !(work.extra instanceof Array)) {
        work.extra = [];
      }
    }
    if (typeof this.config.interval === "undefined") {
      this.config.interval = 10 * 60 * 1000;
    } 
  }

  // 无用,暂且保留
  private showList() {
    this.workList.forEach((ele, index) => {
      elu.wri(`服务 \`${index}\` 从 \`${ele.originalPath}\` 同步至 \`${ele.targetPath}\``);
    });
  }

  private closeWork(identifier: string) {
    let identifierNum = parseInt(identifier);
    if (typeof this.workList[identifierNum] === "undefined") {
      elu.wri("无效的列表标示");
      return;
    }
    clearInterval(this.workList[identifierNum].timerIdentifier);
    fsFunc.delThenCopyPath(this.workList[identifierNum].targetPath,
      this.workList[identifierNum].originalPath, this.workList[identifierNum].extra);
    this.workList.splice(identifierNum, 1);
    elu.wri(`已关闭服务 \`${identifier}\``);
  }

  private closeAll() {
    this.workList.forEach((ele, ind) => {
      let identifierNum = ind;
      clearInterval(this.workList[identifierNum].timerIdentifier);
      fsFunc.delThenCopyPath(this.workList[identifierNum].targetPath,
        this.workList[identifierNum].originalPath, this.workList[identifierNum].extra);
      elu.wri(`已关闭服务 \`${identifierNum}\``);
    });
    this.workList = [];
  }
}