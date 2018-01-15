import * as fs from 'fs'
import ModBase from '../ModBase'
import ProcessCenter from '../../processCenter'
import { print } from '../../lib/lib'
import * as Path from 'path'
import * as strFunc from '../../lib/strFunc'

interface data {
  path: {}
}

export default class mdSynchronous extends ModBase {
  constructor(center: ProcessCenter) {
    super(center, 'syn', Path.join('./','data','syndata.data'));
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
      print.err(`${this.modName}: 正在工作中,切换路径请先关闭服务`);
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
      print.err(`${this.modName}: 正在工作中,切换路径请先关闭服务`);
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

  private setConstPath(pathName: string, path: string) {
    this.data.path[pathName] = Path.posix.normalize(path);
  }

  private startWork() {
    if (this.working) {
      print.err(`${this.modName}: 已经正在工作了`);
      return;
    }
    if (this.savePath === '') {
      print.err(`${this.modName}: 未设置保存路径`);
      return;
    }
    if (this.workPath === '') {
      print.err(`${this.modName}: 未设置工作路径`);
      return;
    }
  }

  private endWork() {
    if (!this.working) {
      print.err(`${this.modName}: 并没有在工作中`);
      return;
    }
  }
}