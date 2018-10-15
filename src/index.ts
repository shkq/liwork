import { CommandGetter, CommandLike } from "./lib/CMDGetter";
import MdBase from "./lib/ModeBase";

async function start() {
    const command = new CommandGetter(process.argv.slice(2));
    let Mod = await import("./mods/" + command.getMain());
    const mod: new (cmdLike: CommandLike[]) => MdBase = Mod.default;
    let runMod = new mod(command.getSub());
    if (runMod) {
        await runMod.run();
    }
    else {
        throw `主命令${command.getMain()}不存在`
    }
}

start();