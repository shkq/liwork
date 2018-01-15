import * as fs from 'fs'
import ModBase from "../ModBase";
import ProcessCenter from "../../processCenter";
import { print } from '../../lib/lib';

export default class mdSynchronous extends ModBase {
  test = '1111'
  constructor(center: ProcessCenter) {
    super(center,'syn');
  }

  protected init() {
    super.init();
  }
  protected destroy() {
    super.destroy();
  }
  protected onFocus() {
    super.onFocus();
  }
  protected onUnFocus() {
    super.onUnFocus();
  }
}