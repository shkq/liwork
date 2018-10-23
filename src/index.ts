import * as fs from "fs";
import * as path from "path";
import { CommandGetter, CommandLike } from "./lib/CMDGetter";
import MdBase from "./lib/ModeBase";
import logger from "./lib/Logger"

async function start() {
    const command = new CommandGetter(process.argv.slice(2));
    const main = command.getMain();
    if (main === "help") {
        let Mod = await import("./mods/" + command.getSub()[0].name);
        if (!Mod) throw `主命令${command.getMain()}不存在`;
        const mod: new (cmdLike: CommandLike[]) => MdBase = Mod.default;
        let runMod = new mod(command.getSub());
        await runMod.help();
    }
    else if (!main) {
        let modPaths = fs.readdirSync(path.join(process.argv[1], "../../dist/mods"));
        for (let i = 0; i < modPaths.length; ++i) {
            let Mod = await import("./mods/" + path.basename(modPaths[i], ".js"));
            const mod: new (cmdLike: CommandLike[]) => MdBase = Mod.default;
            let runMod = new mod(command.getSub());
            logger.wri("\n" + path.basename(modPaths[i], ".js") + ":");
            await runMod.help();
        }
    }
    else {
        let Mod = await import("./mods/" + main);
        if (!Mod) throw `主命令${command.getMain()}不存在`;
        const mod: new (cmdLike: CommandLike[]) => MdBase = Mod.default;
        let runMod = new mod(command.getSub());
        await runMod.run();
    }
}

start();