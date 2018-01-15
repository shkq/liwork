import ProcessCenter from "../processCenter";
import { print } from "../lib/lib";

export default abstract class ModBase {
  constructor(center: ProcessCenter, modName: string) {
    this.center = center;
    this.modName = modName;
    this.init();
  }

  readonly modName: string = ''
  protected working: boolean = false

  protected init() {
    this.regFocus();
  }
  protected destroy() {

  }
  protected onFocus() {

  }
  protected onUnFocus() {

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
  private resDestroy() {
    this.center.once(this.getPbEvents(ProcessCenter.exit),()=>{
      this.destroy();
    });
  }
}