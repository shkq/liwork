import { CommandGetter } from "./lib/node/commandGetter"
import { MdBase } from "./mods/mdBase"
import { CommandLike } from "./lib/node/commandGetter"

import { mdSynchronous } from "./mods/syn/mdSynchronous"
import { mdImagemin } from "./mods/syn/mdImagemin"
import { mdSever } from "./mods/syn/mdSever"

export {
  start
}

async function start() {
  const commandMods: { [name: string]: new (command: CommandLike) => MdBase } = {}

  // 此处注册命令

  commandMods[mdSynchronous.mainName] = mdSynchronous;
  commandMods[mdImagemin.mainName] = mdImagemin;
  commandMods[mdSever.mainName] = mdSever;

  const command = CommandGetter.get();
  const runMod = commandMods[command.main];
  if (runMod) {
    await new runMod(command).run();
  }
  else {
    throw `主命令${command.main}不存在`
  }
}