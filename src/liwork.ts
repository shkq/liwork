import { CommandGetter } from "./lib/commandGetter";
import MdBase from "./lib/mdBase";

export {
  start
}

async function start() {

  const command = CommandGetter.get();
  const runMod = await import("./mods/" + command.main);
  if (runMod) {
    await (<MdBase>new runMod(command)).run();
  }
  else {
    throw `主命令${command.main}不存在`
  }
}