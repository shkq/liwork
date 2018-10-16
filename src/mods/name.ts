import * as Fs from "fs";
import * as Path from "path";

import ModeBase from "../lib/ModeBase";
import Elucidator from "../lib/Elucidator";

const logger = new Elucidator("img");

export default class extends ModeBase {

    private targetFolder: string = ""
    private nameString: string = ""
    private mainFunc: () => void = null

    protected async onLoad() {
        this.targetFolder = process.cwd();
        this.nameString = "autoRename";
        this.mainFunc = this.onMainDef;
    }

    protected async path(argv: string[]) {
        if (argv[0]) {
            this.targetFolder = Path.normalize(argv[0]);
        }
    }

    protected async name(argv: string[]) {
        if (argv[0]) {
            this.nameString = argv[0];
        }
    }

    protected async name_time(argv: string[]) {
        let date = new Date();
        this.nameString = date.getTime().toString();
    }

    protected async ccc() {
        this.mainFunc = this.onMainCCC;
    }

    protected async onMainCCC() {
        Fs.readdir(this.targetFolder, (err, file) => {
            if (err) {
                logger.err(err);
                return;
            }
            file = this.sortFile(file);
            let index = 0;
            for (let i = 0; i < file.length; ++i) {
                if (Path.extname(file[i]) === ".meta") {
                    continue;
                }
                if (Fs.statSync(file[i]).isDirectory()) {
                    continue;
                }
                let newnameHead = file[i].replace(/\/?[^\/]+\/?$/, `${this.nameString}_${this.getIndex(index, Math.ceil(file.length / 2))}`);
                let newname = newnameHead + Path.extname(file[i]);
                let oldMeta = file[i] + ".meta";
                let newnameMeta = newnameHead + Path.extname(file[i]) + ".meta";
                index++;
                Fs.rename(file[i], newname, (err) => {
                    if (err) {
                        logger.err(err);
                    }
                    else {
                        logger.wri(`将 ${Path.basename(file[i])} 重命名为 ${Path.basename(newname)}`);
                    }
                });
                if (!Fs.existsSync(oldMeta)) return;
                Fs.rename(oldMeta, newnameMeta, (err) => {
                    if (err) {
                        logger.err(err);
                    }
                });
            }
        });
    }

    protected async onMainDef() {
        Fs.readdir(this.targetFolder, (err, file) => {
            if (err) {
                logger.err(err);
                return;
            }
            file = this.sortFile(file);
            let index = 0;
            for (let i = 0; i < file.length; ++i) {
                if (Fs.statSync(file[i]).isDirectory()) {
                    continue;
                }
                let newname = file[i].replace(/\/?[^\/]+\/?$/, `${this.nameString}_${this.getIndex(index, file.length)}.${Path.extname(file[i])}`);
                index++;
                Fs.rename(file[i], newname, (err) => {
                    if (err) {
                        logger.err(err);
                    }
                    else {
                        logger.wri(`将 ${Path.basename(file[i])} 重命名为 ${Path.basename(newname)}`);
                    }
                })
            }
        });
    }

    protected async onMain() {
        await this.mainFunc();
    }

    protected getIndex(index: number, max: number) {
        let returner = index.toString();
        while (returner.length < max.toString().length) {
            returner = '0' + returner;
        }
        return returner;
    }

    protected sortFile(file: string[]) {
        return file.sort((a, b) => {
            return Fs.statSync(a).size - Fs.statSync(b).size;
        })
    }

}