import * as fs from 'fs'
import * as Path from 'path'

import liwork from '../liwork'
import ProcessCenter from "../processCenter"
import elucidator from "../lib/js/elucidator"
import * as strFunc from "../lib/js/strFunc"

const elu = new elucidator("mdBase");

export default abstract class mdBase {
  constructor(center: ProcessCenter, modName: string, dataPath: string) {
    this.center = center;
    this.modName = modName;
    elu.mdname = modName;
    this.dataPath = dataPath;
    this.init();
  }

  readonly modName: string = ''
  readonly dataPath: string = ''
  protected data: liwork.dataBase = null

  protected init() {
    this.regFocus();
    this.regVar();
    this.regDestroy();
    this.loadData();
  }

  // 在destroy方法中,不要使用任何异步的方法
  protected destroy() {
    this.writeDataSync();
  }
  protected onFocus() {
    this.regUnFocus();
  }
  protected onUnFocus() {
    this.regFocus();
    this.writeData();
  }

  protected center: ProcessCenter = null
  protected getFocus() {
    this.center.handler = this;
  }
  protected backFocus() {
    this.center.handler = null;
  }
  protected getPbEvents(eventsName: string) {
    return this.center.getPbEvents(eventsName);
  }
  protected getSfEvents(eventsName: string) {
    return this.center.getSfEvents(this.modName,eventsName);
  }
  protected initData() {
    this.data = {
      vars: {}
    }
  }
  protected getVariable(str: string) {
    let variable = strFunc.isVariable(str);
    if (variable && typeof this.data.vars[variable] !== 'undefined') {
      return this.data.vars[variable];
    }
    else {
      return str;
    }
  }

  private regFocus() {
    this.center.once(this.getPbEvents(this.modName), () => {
      this.getFocus();
      this.onFocus();
      elu.wri(`\`${this.modName}\`模块开始监听输入`);
    });
  }
  private regUnFocus() {
    this.center.once(this.getSfEvents(`~${this.modName}`), () => {
      this.backFocus();
      this.onUnFocus();
      elu.wri(`\`${this.modName}\`模块结束监听输入`);
    });
  }
  private regDestroy() {
    this.center.once(this.getPbEvents(ProcessCenter.exit), () => {
      this.destroy();
    });
  }
  private regVar() {
    this.center.on(this.getSfEvents('var'), (args: string[]) => {
      this.setVariable(args[0], args[1]);
    });
  }
  private setVariable(varName: string, varValue: string) {
    this.data.vars[varName] = varValue;
    elu.wri(`成功设置 变量 \`${varName}\` \`${varValue}\``)
  }
  private loadData() {
    fs.readFile(this.dataPath, 'utf8', (err, data) => {
      if (err) {
        this.initData();
        return;
      }
      try {
        this.data = JSON.parse(data);
      }
      catch(err) {
        this.initData();
      }
    });
  }
  private writeData() {
    fs.writeFile(this.dataPath, JSON.stringify(this.data),err=>{
      if (err) {
        elu.err(err);
        return;
      }
    });
  }
  private writeDataSync() {
    fs.writeFileSync(this.dataPath, JSON.stringify(this.data));
  }
}