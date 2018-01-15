import * as fs from 'fs'
import ModBase from "../ModBase";
import ProcessCenter from "../../processCenter";

export default class mdSynchronous extends ModBase {
  constructor(center: ProcessCenter) {
    super(center);
  }

  readonly modName = 'syn'
  protected init() {
    
  }
  protected destroy() {
    
  }
  protected onFocus() {

  }
  protected onUnFocus() {

  }
}