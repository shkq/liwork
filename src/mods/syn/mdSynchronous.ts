import * as fs from "fs"
import * as Path from "path"

import mdBase from "../mdBase"
import ProcessCenter from "../../processCenter"
import * as strFunc from "../../lib/js/strFunc"
import elucidator from "../../lib/js/elucidator"
import * as fsFunc from "../../lib/node/fsFunc"
import liwork from "../../liwork";

interface data extends liwork.dataBase {

}
interface workListItem {
  originalPath: string
  targetPath: string
  extra: string[]
  timerIdentifier: NodeJS.Timer
}

const elu = new elucidator("mdSynchronous");

export default class mdSynchronous extends mdBase {
  constructor(center: ProcessCenter) {
    super(center, 'syn', Path.join('./', 'data', 'syndata.data'));
  }

  protected data: data = null
  private originalPath: string = ''
  private targetPath: string = ''
  private extra: string[] = []
  private reverseBeforeStart = false
  private readonly refrushTime = 1000 * 60 * 5
  private workList: workListItem[] = []

  protected init() {
    super.init();
    this.center.on(this.getSfEvents('start'), (args: string[]) => {
      this.startWork();
    });
    this.center.on(this.getSfEvents('close'), (args: string[]) => {
      this.closeWork(args[0]);
    });
    this.center.on(this.getSfEvents('save'), (args: string[]) => {
      this.setSavePath(args[0]);
    });
    this.center.on(this.getSfEvents('work'), (args: string[]) => {
      this.setWorkPath(args[0]);
    });
    this.center.on(this.getSfEvents('extra'), (args: string[]) => {
      this.setExtra(args[0]);
    });
    this.center.on(this.getSfEvents('list'), (args: string[]) => {
      this.showList();
    });
    this.center.on(this.getSfEvents('json'), (args: string[]) => {
      this.loadIni(args[0]);
    });
  }
  protected destroy() {
    super.destroy();
    this.closeAll();
  }
  protected onFocus() {
    super.onFocus();

  }
  protected onUnFocus() {
    super.onUnFocus();
  }

  private setSavePath(path: string) {
    this.originalPath = Path.normalize(this.getVariable(path));
  }

  private setWorkPath(path: string) {
    this.targetPath = Path.normalize(this.getVariable(path));
  }

  private setExtra(extra: string) {
    this.extra.push(this.getVariable(extra));
  }

  private startWork() {
    if (this.originalPath === '') {
      elu.wri("未设置保存路径");
      return;
    }
    if (this.targetPath === '') {
      elu.wri("未设置工作路径");
      return;
    }
    if (this.checkWorkRepeat()) {
      elu.wri(`已有进行中的工作 从 \`${this.originalPath}\` 同步至 \`${this.targetPath}\``);
      return;
    }
    const originalPath = this.originalPath;
    const targetPath = this.targetPath;
    const extra = this.extra;
    let firstSynOriginalPath = originalPath;
    let firstSynTargetPath = targetPath;
    if (this.reverseBeforeStart) {
      firstSynOriginalPath = targetPath;
      firstSynTargetPath = originalPath;
    }
    fsFunc.delThenCopyPath(firstSynOriginalPath, firstSynTargetPath, extra).then(() => {
      elu.wri(`已将 \`${firstSynOriginalPath}\` 同步至 \`${firstSynTargetPath}\``);
      let timerIdentifier = setInterval(() => {
        fsFunc.delThenCopyPath(originalPath, targetPath, extra).then(() => {
          elu.wri(`已将 \`${originalPath}\` 同步至 \`${targetPath}\``);
        });
      }, this.refrushTime);
      elu.wri(`开启服务从 \`${originalPath}\` 同步至 \`${targetPath}\``);
      elu.wri(`额外列表: \`${extra}\``);
      elu.wri(`刷新时间: \`${this.refrushTime}\``);
      this.workList.push({
        originalPath: originalPath,
        targetPath: targetPath,
        extra: extra,
        timerIdentifier: timerIdentifier
      })
      this.clean();
    });
  }

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

  private loadIni(path: string) {
    try {
      path = Path.normalize(this.getVariable(path));
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          elu.err(err);
          return;
        }
        let ini = JSON.parse(data);
        for (let i = 0; i < ini.list.length; i++) {
          let ele = ini.list[i]
          this.originalPath = ele.originalPath;
          this.targetPath = ele.targetPath;
          this.extra = ele.extra;
          this.reverseBeforeStart = ele.reverseBeforeStart;
          this.startWork();
        }
      });
    }
    catch (err) {
      elu.err(err);
      elu.err("读取配置出错,请检查配置文件格式是否正确");
    }
  }

  private checkWorkRepeat() {
    this.workList.forEach(ele => {
      if (ele.targetPath === this.targetPath && ele.originalPath === this.originalPath) {
        return true;
      }
    });
    return false;
  }

  private clean() {
    this.originalPath = '';
    this.targetPath = '';
    this.extra = [];
    this.reverseBeforeStart = false;
  }
}