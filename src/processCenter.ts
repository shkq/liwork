import { EventEmitter } from "events";

import mdBase from "./mods/mdBase"
import elucidator from "./lib/js/elucidator"
import * as strFunc from "./lib/js/strFunc"

const elu = new elucidator("ProcessCenter");

export default class ProcessCenter extends EventEmitter {

  static readonly global = 'global'
  static readonly exit = 'exit'

  constructor() {
    super();
    process.once("exit", () => {
      this.emit(this.getPbEvents(ProcessCenter.exit));
    });
  }

  set handler(val: mdBase | string) {
    if (!val) {
      this._handler = ProcessCenter.global;
    }
    else if (typeof val === "string") {
      if (val === ProcessCenter.global) {
        this._handler = ProcessCenter.global;
      }
      else {
        elu.err("设置handler只能使用继承自\`mdBase\`类型的对象");
      }
    }
    else {
      if (this._handler !== ProcessCenter.global) {
        elu.err(`\`${val.modName}\`模块尝试使用控制权限失败: \`${this._handler}\`正在占用`);
      }
      else {
        this._handler = val.modName;
      }
    }
  }
  get handler() {
    return this._handler;
  }

  accept(str: string) {
    str = strFunc.removeBlank(str);
    let args = str.split(' ');
    if (typeof args[0] === 'undefined' || args[0].length === 0) {
      return;
    }
    let command = args.splice(0, 1)[0];
    this.emit(`${this._handler}-${command}`, args);
  }

  getPbEvents(eventsName: string) {
    return `${ProcessCenter.global}-${eventsName}`
  }
  getSfEvents(modName: string, eventsName: string) {
    return `${modName}-${eventsName}`
  }

  private _handler: string = ProcessCenter.global
}