import { CommandGetter } from "./lib/node/commandGetter"
import { MdBase } from "./mods/mdBase"
import { mdSynchronous } from "./mods/syn/mdSynchronous";

export {
  start
}

function start() {
  const commandMods: { [name: string]: MdBase } = {}

  // 此处注册命令

  commandMods[mdSynchronous.name] = new mdSynchronous();

  const command = CommandGetter.get();
  const runMod = commandMods[command.main];
  if (runMod) {
    runMod.run(command);
  }
  else {
    throw `主命令${command.main}不存在`
  }
}