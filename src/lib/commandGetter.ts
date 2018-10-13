import { getArrCopy } from "./arrFunc"

export {
  CommandGetter,
  CommandLike
}

class CommandLike {
  constructor() { }
  main: string = null
  subsidiary: string[] = []
  global: string[] = []

  getSub(str: string) {
    let returner = {
      have: false,
      argv: ""
    }
    for (let i = 0; i < this.subsidiary.length; i++) {
      if (this.subsidiary[i].indexOf(str) !== -1) {
        returner.have = true;
        str += "=";
        if (this.subsidiary[i].indexOf(str) !== -1) {
          returner.argv = this.subsidiary[i].replace(str, "");
        }
        break;
      }
    }
    return returner;
  }

  getGlo(str: string) {
    let returner = {
      have: false,
      argv: ""
    }
    for (let i = 0; i < this.global.length; i++) {
      if (this.global[i].indexOf(str) !== -1) {
        returner.have = true;
        str += "=";
        if (this.global[i].indexOf(str) !== -1) {
          returner.argv = this.global[i].replace(str, "");
        }
        break;
      }
    }
    return returner;
  }
}

class CommandGetter {
  static get(argv: string[] = process.argv) {
    let command = new CommandLike();
    for (let i = 2; i < argv.length; i++) {
      if (/^--/.test(argv[i])) {
        command.subsidiary.push(argv[i]);
      }
      else if (/^-/.test(argv[i])) {
        if (!command.main) {
          command.main = argv[i];
        }
        else {
          command.global.push(argv[i]);
        }
      }
    }
    return command;
  }

  protected static getArgv() {
    return getArrCopy(process.argv);
  }
}