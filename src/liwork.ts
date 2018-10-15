import { CommandGetter, CommandLike } from "./lib/CMDGetter";
import MdBase from "./lib/mdBase";

export {
  start
}

async function start() {
  const command = new CommandGetter(process.argv.slice(2));
  const Mod: new (cmdLike: CommandLike[]) => MdBase = await import("./mods/" + command.getMain());
  let runMod = new Mod(command.getSub());
  if (runMod) {
    await runMod.run();
  }
  else {
    throw `主命令${command.getMain()}不存在`
  }
}