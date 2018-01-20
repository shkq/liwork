import * as fs from "fs"
import * as Path from "path"

import mdBase from "../mdBase"
import ProcessCenter from "../../processCenter"
import * as strFunc from "../../lib/js/strFunc"
import elucidator from "../../lib/js/elucidator"

interface data {
  path: {}
}

const elu = new elucidator("mdSynchronous");

export default class mdSynchronous extends mdBase {
  constructor(center: ProcessCenter) {
    super(center, 'syn', Path.join('./', 'data', 'syndata.data'));
    this.center.on(this.getSfEvents('start'), (args: string[]) => {
      this.startWork();
    });
    this.center.on(this.getSfEvents('end'), (args: string[]) => {
      this.endWork();
    });
    this.center.on(this.getSfEvents('save'), (args: string[]) => {
      this.setSavePath(args[0]);
    });
    this.center.on(this.getSfEvents('work'), (args: string[]) => {
      this.setWorkPath(args[0]);
    });
    this.center.on(this.getSfEvents('set'), (args: string[]) => {
      this.setConstPath(args[0], args[1]);
    });
  }

  protected data: data = {
    path: {}
  }
  private savePath: string = ''
  private workPath: string = ''
  private extra: string[] = []
  private readonly refrushTime = 1000 * 60 * 15
  private workIndex: NodeJS.Timer = null

  protected init() {
    super.init();
  }
  protected destroy() {
    super.destroy();
    if (this.working) {
      this.endWork();
    }
  }
  protected onFocus() {
    super.onFocus();

  }
  protected onUnFocus() {
    super.onUnFocus();
  }

  private setSavePath(path: string) {
    if (this.working) {
      elu.wri("正在工作中,切换路径请先关闭服务");
      return;
    }
    let variable = strFunc.isVariable(path);
    if (variable && typeof this.data[variable] !== 'undefined') {
      this.savePath = this.data[variable];
    }
    else {
      this.savePath = Path.normalize(path);
    }
  }

  private setWorkPath(path: string) {
    if (this.working) {
      elu.wri("正在工作中,切换路径请先关闭服务");
      return;
    }
    let variable = strFunc.isVariable(path);
    if (variable && typeof this.data[variable] !== 'undefined') {
      this.workPath = this.data[variable];
    }
    else {
      this.workPath = Path.normalize(path);
    }
  }

  private setExtra(extra: string) {
    if (this.working) {
      elu.wri("正在工作中,添加额外路径请先关闭服务");
      return;
    }
    this.extra.push(extra);
  }

  private setConstPath(pathName: string, path: string) {
    this.data.path[pathName] = Path.posix.normalize(path);
  }

  private startWork() {
    if (this.working) {
      elu.wri("已经正在工作了");
      return;
    }
    if (this.savePath === '') {
      elu.wri("未设置保存路径");
      return;
    }
    if (this.workPath === '') {
      elu.wri("未设置工作路径");
      return;
    }
    this.workIndex = setInterval(()=>{
      this.work();
    },this.refrushTime);
  }

  private endWork() {
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
        this.savePath = ini.savePath;
        this.workPath = ini.savePath;
        this.extra = ini.savePath;
      });
    }
    catch (err) {
      elu.err(err);
      elu.err("读取配置出错,请检查配置文件格式是否正确");
    }
  }
  
  private work() {
    
  }
}