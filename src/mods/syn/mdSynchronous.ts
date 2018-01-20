import * as fs from "fs"
import * as Path from "path"

import mdBase from "../mdBase"
import ProcessCenter from "../../processCenter"
import * as strFunc from "../../lib/js/strFunc"
import elucidator from "../../lib/js/elucidator"
import * as fsFunc from "../../lib/node/fsFunc"

interface data {
  path: {}
}
interface workListItem {
  originalPath: string
  targetPath: string
  extra: string
  timerIdentifier: NodeJS.Timer
}

const elu = new elucidator("mdSynchronous");

export default class mdSynchronous extends mdBase {
  constructor(center: ProcessCenter) {
    super(center, 'syn', Path.join('./', 'data', 'syndata.data'));
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
    this.center.on(this.getSfEvents('set'), (args: string[]) => {
      this.setConstPath(args[0], args[1]);
    });
    this.center.on(this.getSfEvents('list'), (args: string[]) => {
      this.setConstPath(args[0], args[1]);
    });
  }

  protected data: data = {
    path: {}
  }
  private originalPath: string = ''
  private targetPath: string = ''
  private extra: string[] = []
  private readonly refrushTime = 1000 * 60 * 15
  private workList: workListItem[] = []

  protected init() {
    super.init();
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
    let variable = strFunc.isVariable(path);
    if (variable && typeof this.data[variable] !== 'undefined') {
      this.originalPath = this.data[variable];
    }
    else {
      this.originalPath = Path.normalize(path);
    }
  }

  private setWorkPath(path: string) {
    let variable = strFunc.isVariable(path);
    if (variable && typeof this.data[variable] !== 'undefined') {
      this.targetPath = this.data[variable];
    }
    else {
      this.targetPath = Path.normalize(path);
    }
  }

  private setExtra(extra: string) {
    this.extra.push(extra);
  }

  private setConstPath(pathName: string, path: string) {
    this.data.path[pathName] = Path.normalize(path);
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
    let originalPath = this.originalPath;
    let targetPath = this.targetPath;
    let extra = this.extra;
    fsFunc.delThenCopyPath(targetPath,originalPath,extra).then(()=>{
      elu.wri(`已将 \`${targetPath}\` 同步至 \`${originalPath}\``);
      let workIdentifier = setInterval(()=>{
        fsFunc.delThenCopyPath(originalPath,targetPath,extra).then(()=>{
          elu.wri(`已将 \`${originalPath}\` 同步至 \`${targetPath}\``);
        });
      },this.refrushTime);
      elu.wri(`开启服务从 \`${originalPath}\` 同步至 \`${targetPath}\``);
      elu.wri(`额外列表: \`${extra}\``);
      elu.wri(`刷新时间: \`${this.refrushTime}\``);
    })
  }

  private closeWork(identifier: string) {

  }

  private closeAll() {
    if (!this.working) {
      elu.wri("并没有在工作中");
      return;
    }
    clearInterval(this.workIndex);
    this.workIndex = null;
    this.work();
  }

  private loadIni(path: string) {
    try {
      if (this.working) {
        elu.wri("正在工作中,读取配置请先关闭服务");
        return;
      }
      path = Path.normalize(path);
      fs.readFile(this.dataPath, 'utf8', (err, data) => {
        if (err) {
          elu.err(err);
          return;
        }
        let ini = JSON.parse(data);
        this.originalPath = ini.savePath;
        this.targetPath = ini.savePath;
        this.extra = ini.savePath;
      });
    }
    catch (err) {
      elu.err(err);
      elu.err("读取配置出错,请检查配置文件格式是否正确");
    }
  }

  private checkWorkRepeat() {
    this.workList.forEach(ele=>{
      if (ele.targetPath === this.targetPath && ele.originalPath === this.originalPath) {
        return true;
      }
    });
    return false;
  }
}