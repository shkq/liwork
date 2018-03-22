import { CommandGetter } from "./lib/node/commandGetter"
import { MdBase } from "./mods/mdBase"

const commandMods: { [name: string]: MdBase } = {}

// 此处注册命令



const command = CommandGetter.get();
const runMod = commandMods[command.main];
if (runMod) {
  runMod.run(command);
}
else {
  throw `主命令${command.main}不存在`
}