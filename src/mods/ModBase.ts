import * as fs from 'fs'
import * as Path from 'path'

import ProcessCenter from "../processCenter"
import elucidator from "../lib/js/elucidator"

const elu = new elucidator("ModBase");

export default abstract class ModBase {
  constructor(center: ProcessCenter, modName: string, dataPath: string) {
    this.center = center;
    this.modName = modName;
    this.dataPath = dataPath;
    this.init();
  }

  readonly modName: string = ''
  readonly dataPath: string = ''
  protected working: boolean = false
  protected data: any = ''

  protected init() {
    this.regFocus();
    this.loadData();
  }
  protected destroy() {
    this.writeData();
  }
  protected onFocus() {

  }
  protected onUnFocus() {
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
    return `${ProcessCenter.global}-${eventsName}`
  }
  protected getSfEvents(eventsName: string) {
    return `${this.modName}-${eventsName}`
  }
  protected loadData() {
    fs.readFile(this.dataPath, 'utf8', (err, data) => {
      if (err) {
        // print.err(err);
        return;
      }
      try {
        this.data = JSON.parse(data);
      }
      catch(err) {
        // print.err(err);
      }
    });
  }
  protected writeData() {
    fs.writeFile(this.dataPath, JSON.stringify(this.data), (err) => {
      if (err) {
        elu.err(err);
        return;
      }
    })
  }

  private regFocus() {
    this.center.once(this.getPbEvents(this.modName), () => {
      this.onFocus();
      this.getFocus();
      this.regUnFocus();
      elu.wri(`\`${this.modName}\`模块开始监听输入`);
    });
  }
  private regUnFocus() {
    this.center.once(this.getSfEvents(`~${this.modName}`), () => {
      this.onUnFocus();
      this.backFocus();
      this.regFocus();
      elu.wri(`\`${this.modName}\`模块结束监听输入`);
    });
  }
  private resDestroy() {
    this.center.once(this.getPbEvents(ProcessCenter.exit), () => {
      this.destroy();
    });
  }
}