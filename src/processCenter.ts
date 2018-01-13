import { EventEmitter } from "events";
import * as lib from './lib/lib'
import ModBase from "./mods/ModBase"

export default class ProcessCenter extends EventEmitter {

  static readonly globalEvents = {
    close: 'global-close',
  }

  constructor() {
    super();
  }

  set handler(val: ModBase | string) {
    if (!val) {
      this._handler = this.global;
    }
    else if (typeof val === "string") {
      if (val === this.global) {
        this._handler = this.global;
      }
      else {
        lib.print.err("设置handler只能使用继承自\`ModBase\`类型的对象");
      }
    }
    else {
      if (this._handler !== this.global) {
        lib.print.err(`\`${val.modName}\`模块尝试使用控制权限失败: \`${this._handler}\`正在占用`);
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
    str = lib.strFunc.removeBlank(str);
    let args = str.split(' ');
    if (typeof args[0] === 'undefined' || args[0].length === 0) {
      return;
    }
    this.emit(`${this._handler}-${args}`,args.splice(0,1));
  }

  private readonly global = 'global'
  private _handler: string = this.global
}