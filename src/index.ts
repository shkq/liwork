import { CommandGetter, CommandLike } from "./lib/CMDGetter";
import MdBase from "./lib/ModeBase";

async function start() {
    const command = new CommandGetter(process.argv.slice(2));
    const main = command.getMain();
    if (main !== "help") {
        let Mod = await import("./mods/" + main);
        const mod: new (cmdLike: CommandLike[]) => MdBase = Mod.default;
        let runMod = new mod(command.getSub());
        if (runMod) {
            await runMod.run();
        }
        else {
            throw `主命令${command.getMain()}不存在`
        }
    }
    else {
        let Mod = await import("./mods/" + command.getSub()[0].name);
        const mod: new (cmdLike: CommandLike[]) => MdBase = Mod.default;
        let runMod = new mod(command.getSub());
        if (runMod) {
            await runMod.help();
        }
        else {
            throw `主命令${command.getMain()}不存在`
        }
    }
}

start();