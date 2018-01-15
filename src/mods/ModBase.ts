import ProcessCenter from "../processCenter";
import { print } from "../lib/lib";

export default abstract class ModBase {
  constructor(center: ProcessCenter) {
    this.center = center;
    this.init();
    this.regFocus();
  }

  abstract readonly modName: string
  protected abstract init()
  protected abstract destroy()
  protected abstract onFocus()
  protected abstract onUnFocus()

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

  private regFocus() {
    this.center.once(this.getPbEvents(this.modName),()=>{
      this.onFocus();
      this.getFocus();
      this.regUnFocus();
      print.wri(`\`${this.modName}\`模块开始监听输入`);
    });
  }
  private regUnFocus() {
    this.center.once(this.getSfEvents(`~${this.modName}`),()=>{
      this.onUnFocus();
      this.backFocus();
      this.regFocus();
      print.wri(`\`${this.modName}\`模块结束监听输入`);
    });
  }
}